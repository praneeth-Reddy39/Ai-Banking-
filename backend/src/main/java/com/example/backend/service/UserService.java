package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.entity.Account;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.AccountRepository;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.security.SecureRandom;
import java.util.Locale;
import java.util.Random;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
    private final Random random = new SecureRandom();

    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder,
                       AccountRepository accountRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.accountRepository = accountRepository;
    }

    // LOGIN
    public User login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }

        return user;
    }

    // GET USER BY EMAIL
    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    // REGISTER
    public User register(RegisterRequest req) {
        userRepository.findByEmail(req.getEmail()).ifPresent(u -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        });

        // Optional account details: auto-generate when missing or invalid
        String accountNumber = req.getAccountNumber();
        if (accountNumber == null || !accountNumber.matches("\\d{9,18}")) {
            accountNumber = generateUniqueAccountNumber();
        }
        String ifsc = req.getIfsc();
        if (ifsc == null || !ifsc.matches("^[A-Z]{4}0[A-Z0-9]{6}$")) {
            ifsc = generateIfsc(req.getBankName());
        }
        if (req.getMobile() == null || !req.getMobile().matches("^\\d{10}$")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid mobile number");
        }
        if (req.getPassword() == null || req.getPassword().length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Weak password");
        }

        User u = new User();
        u.setName(req.getName());
        u.setEmail(req.getEmail());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        u.setBankName(req.getBankName());
        u.setAccountNumber(accountNumber);
        u.setIfsc(ifsc);
        u.setMobile(req.getMobile());
        u.setBalance(0.0);

        User saved = userRepository.save(u);

        // Create initial Account record for this user
        Account a = new Account();
        a.setUser(saved);
        a.setBankName(req.getBankName() == null ? "AI Banking" : req.getBankName().trim());
        a.setAccountNumber(accountNumber);
        a.setIfsc(ifsc);
        a.setBalance(0.0);
        accountRepository.save(a);

        return saved;
    }

    private String generateUniqueAccountNumber() {
        while (true) {
            String acc = String.format("%012d", Math.abs(random.nextLong()) % 1000000000000L);
            if (accountRepository.findByAccountNumber(acc).isEmpty()) return acc;
        }
    }

    private String generateIfsc(String bankName) {
        String prefix = (bankName == null ? "BANK" : bankName).replaceAll("[^A-Za-z]", "").toUpperCase(Locale.ROOT);
        prefix = (prefix + "XXXX").substring(0, 4);
        String alnum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            sb.append(alnum.charAt(random.nextInt(alnum.length())));
        }
        return prefix + "0" + sb.toString();
    }
}
