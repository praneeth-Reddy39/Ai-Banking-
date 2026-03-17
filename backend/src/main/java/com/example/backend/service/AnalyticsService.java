package com.example.backend.service;

import com.example.backend.dto.Anomaly;
import com.example.backend.dto.TransactionAnalyticsResponse;
import com.example.backend.entity.Transaction;
import com.example.backend.entity.User;
import com.example.backend.repository.TransactionRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public AnalyticsService(TransactionRepository transactionRepository,
                            UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public TransactionAnalyticsResponse analyze(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        List<Transaction> txs = transactionRepository.findByUserOrderByCreatedAtDesc(user);
        if (txs.isEmpty()) {
            return new TransactionAnalyticsResponse(0, 0, 0, 0, 0, 0, Collections.emptyList(), Collections.emptyList());
        }

        int totalCount = txs.size();
        double totalAmount = txs.stream().mapToDouble(t -> Optional.ofNullable(t.getAmount()).orElse(0.0)).sum();
        int deposits = (int) txs.stream().filter(t -> "DEPOSIT".equalsIgnoreCase(t.getType())).count();
        int withdraws = totalCount - deposits;

        List<Double> amounts = txs.stream().map(t -> Optional.ofNullable(t.getAmount()).orElse(0.0)).collect(Collectors.toList());
        double avg = amounts.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
        double variance = amounts.stream().mapToDouble(a -> (a - avg) * (a - avg)).sum() / amounts.size();
        double std = Math.sqrt(variance);

        Map<String, Integer> keywordFreq = new HashMap<>();
        for (Transaction t : txs) {
            String desc = Optional.ofNullable(t.getDescription()).orElse("");
            for (String w : desc.toLowerCase().split("\\s+")) {
                if (w.isBlank()) continue;
                keywordFreq.put(w, keywordFreq.getOrDefault(w, 0) + 1);
            }
        }
        List<String> topKeywords = keywordFreq.entrySet().stream()
                .sorted((a, b) -> Integer.compare(b.getValue(), a.getValue()))
                .limit(5)
                .map(e -> e.getKey() + " (" + e.getValue() + ")")
                .collect(Collectors.toList());

        List<Anomaly> anomalies = new ArrayList<>();
        double upper = avg + 2 * std;
        double lower = Math.max(0, avg - 2 * std);
        for (Transaction t : txs) {
            double amt = Optional.ofNullable(t.getAmount()).orElse(0.0);
            String reason = null;
            if (amt > upper) reason = "Amount above expected range";
            else if (amt < lower && "WITHDRAW".equalsIgnoreCase(t.getType())) reason = "Unusually small withdrawal";
            if (reason != null) {
                anomalies.add(new Anomaly(t.getId(), amt, t.getType(), t.getDescription(), t.getCreatedAt(), reason));
            }
        }

        return new TransactionAnalyticsResponse(totalCount, totalAmount, deposits, withdraws, avg, std, topKeywords, anomalies);
    }
}
