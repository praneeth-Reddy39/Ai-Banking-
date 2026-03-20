package com.example.backend.controller;

import com.example.backend.dto.AccountCreateRequest;
import com.example.backend.dto.AccountResponse;
import com.example.backend.service.AccountService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public ResponseEntity<List<AccountResponse>> list(Authentication authentication) {
        return ResponseEntity.ok(accountService.list(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<AccountResponse> create(Authentication authentication, @RequestBody AccountCreateRequest request) {
        return ResponseEntity.ok(accountService.create(authentication.getName(), request));
    }
}
