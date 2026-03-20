package com.example.backend.controller;

import com.example.backend.dto.TransactionRequest;
import com.example.backend.dto.TransactionResponse;
import com.example.backend.service.TransactionService;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponse>> list(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(transactionService.list(email));
    }

    @PostMapping
    public ResponseEntity<TransactionResponse> create(Authentication authentication, @RequestBody TransactionRequest request) {
        String email = authentication.getName();
        return ResponseEntity.ok(transactionService.create(email, request));
    }

    @PutMapping("/{id}")
    public TransactionResponse update(Authentication authentication,
                                      @PathVariable @NonNull Long id,
                                      @RequestBody TransactionRequest request) {
        String email = authentication.getName();
        return transactionService.update(email, id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Authentication authentication, @PathVariable @NonNull Long id) {
        String email = authentication.getName();
        transactionService.delete(email, id);
        return ResponseEntity.noContent().build();
    }
}
