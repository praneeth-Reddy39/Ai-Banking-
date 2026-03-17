package com.example.backend;

import com.example.backend.entity.User;
import com.example.backend.entity.Transaction;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.TransactionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner init(UserRepository userRepository, TransactionRepository txRepo, BCryptPasswordEncoder encoder) {
        return args -> {
            User user = userRepository.findByEmail("test@example.com").orElseGet(() -> {
                User u = new User();
                u.setName("Test User");
                u.setEmail("test@example.com");
                u.setPassword(encoder.encode("password123"));
                u.setBalance(52345.67);
                return userRepository.save(u);
            });
            if (txRepo.findByUserOrderByCreatedAtDesc(user).isEmpty()) {
                Transaction t1 = new Transaction();
                t1.setUser(user);
                t1.setAmount(1000.0);
                t1.setType("DEPOSIT");
                t1.setDescription("Initial deposit");
                txRepo.save(t1);

                Transaction t2 = new Transaction();
                t2.setUser(user);
                t2.setAmount(500.0);
                t2.setType("WITHDRAW");
                t2.setDescription("ATM withdrawal");
                txRepo.save(t2);
            }
        };
    }
}
