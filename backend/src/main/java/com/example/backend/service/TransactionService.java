package com.example.backend.service;

import com.example.backend.dto.TransactionRequest;
import com.example.backend.dto.TransactionResponse;
import com.example.backend.entity.Transaction;
import com.example.backend.entity.User;
import com.example.backend.repository.TransactionRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository,
                              UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public List<TransactionResponse> list(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return transactionRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(t -> new TransactionResponse(t.getId(), t.getAmount(), t.getType(), t.getDescription(), t.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public TransactionResponse create(String email, TransactionRequest req) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (req.getAmount() == null || req.getAmount() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Amount must be positive");
        }
        if (req.getType() == null || req.getType().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Type is required");
        }
        Transaction t = new Transaction();
        t.setUser(user);
        t.setAmount(req.getAmount());
        t.setType(req.getType());
        t.setDescription(req.getDescription());

        Transaction saved = transactionRepository.save(t);
        return new TransactionResponse(saved.getId(), saved.getAmount(), saved.getType(), saved.getDescription(), saved.getCreatedAt());
    }

    public TransactionResponse update(String email, @NonNull Long id, TransactionRequest req) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Transaction t = transactionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction not found"));

        if (!t.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }

        if (req.getAmount() != null) t.setAmount(req.getAmount());
        if (req.getType() != null) t.setType(req.getType());
        if (req.getDescription() != null) t.setDescription(req.getDescription());

        Transaction saved = transactionRepository.save(t);
        return new TransactionResponse(saved.getId(), saved.getAmount(), saved.getType(), saved.getDescription(), saved.getCreatedAt());
    }

    public void delete(String email, @NonNull Long id) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Transaction t = transactionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction not found"));

        if (!t.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }

        transactionRepository.deleteById(id);
    }
}
