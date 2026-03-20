package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.service.AiService;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final UserService userService;
    private final AiService aiService;

    public DashboardController(UserService userService,
                               AiService aiService) {
        this.userService = userService;
        this.aiService = aiService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> dashboard(Authentication authentication) {

        String email = authentication.getName();
        User user = userService.getUser(email);

        // Temporary monthly spending (later calculate from transactions)
        Double monthlySpending = 2000.0;

        Map<String, Object> response = new HashMap<>();
        response.put("name", user.getName());
        response.put("balance", user.getBalance());
        response.put("aiMessage",
                aiService.generateInsight(user.getBalance(), monthlySpending));

        return ResponseEntity.ok(response);
    }
}