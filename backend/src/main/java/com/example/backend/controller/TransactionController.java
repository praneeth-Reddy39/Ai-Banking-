package com.example.backend.controller;

import com.example.backend.dto.TransactionRequest;
import com.example.backend.dto.TransactionResponse;
import com.example.backend.service.TransactionService;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public List<TransactionResponse> list(Authentication authentication) {
        String email = authentication.getName();
        return transactionService.list(email);
    }

    @PostMapping
    public TransactionResponse create(Authentication authentication,
                                      @RequestBody TransactionRequest request) {
        String email = authentication.getName();
        return transactionService.create(email, request);
    }

    @PutMapping("/{id}")
    public TransactionResponse update(Authentication authentication,
                                      @PathVariable @NonNull Long id,
                                      @RequestBody TransactionRequest request) {
        String email = authentication.getName();
        return transactionService.update(email, id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(Authentication authentication, @PathVariable @NonNull Long id) {
        String email = authentication.getName();
        transactionService.delete(email, id);
    }
}
