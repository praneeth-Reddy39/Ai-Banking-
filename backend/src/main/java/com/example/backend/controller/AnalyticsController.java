package com.example.backend.controller;

import com.example.backend.dto.TransactionAnalyticsResponse;
import com.example.backend.service.AnalyticsService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
 
@CrossOrigin("*")
@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
 
    private final AnalyticsService analyticsService;
 
    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }
 
    @GetMapping("/transactions")
    public ResponseEntity<TransactionAnalyticsResponse> transactions(Authentication authentication) {
        return ResponseEntity.ok(analyticsService.analyze(authentication.getName()));
    }
}
