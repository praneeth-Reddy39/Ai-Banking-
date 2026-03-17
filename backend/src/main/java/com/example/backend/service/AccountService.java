package com.example.backend.service;

import com.example.backend.dto.AccountCreateRequest;
import com.example.backend.dto.AccountResponse;
import com.example.backend.entity.Account;
import com.example.backend.entity.User;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final Random random = new SecureRandom();

    public AccountService(AccountRepository accountRepository,
                          UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    public List<AccountResponse> list(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return accountRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(a -> new AccountResponse(a.getId(), a.getBankName(), a.getAccountNumber(), a.getIfsc(), a.getBalance(), a.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public AccountResponse create(String email, AccountCreateRequest req) {
        if (req.getBankName() == null || req.getBankName().trim().length() < 2) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid bank name");
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        String accountNumber = generateUniqueAccountNumber();
        String ifsc = generateIfsc(req.getBankName());

        Account a = new Account();
        a.setUser(user);
        a.setBankName(req.getBankName().trim());
        a.setAccountNumber(accountNumber);
        a.setIfsc(ifsc);
        a.setBalance(0.0);

        Account saved = accountRepository.save(a);
        return new AccountResponse(saved.getId(), saved.getBankName(), saved.getAccountNumber(), saved.getIfsc(), saved.getBalance(), saved.getCreatedAt());
    }

    private String generateUniqueAccountNumber() {
        while (true) {
            String acc = String.format("%012d", Math.abs(random.nextLong()) % 1000000000000L);
            if (accountRepository.findByAccountNumber(acc).isEmpty()) return acc;
        }
    }

    private String generateIfsc(String bankName) {
        String prefix = bankName.replaceAll("[^A-Za-z]", "").toUpperCase(Locale.ROOT);
        prefix = (prefix + "XXXX").substring(0, 4);
        StringBuilder sb = new StringBuilder();
        String alnum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (int i = 0; i < 6; i++) {
            sb.append(alnum.charAt(random.nextInt(alnum.length())));
        }
        return prefix + "0" + sb.toString();
    }
}
