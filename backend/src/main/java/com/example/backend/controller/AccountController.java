package com.example.backend.controller;

import com.example.backend.dto.AccountCreateRequest;
import com.example.backend.dto.AccountResponse;
import com.example.backend.service.AccountService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public List<AccountResponse> list(Authentication authentication) {
        return accountService.list(authentication.getName());
    }

    @PostMapping
    public AccountResponse create(Authentication authentication, @RequestBody AccountCreateRequest request) {
        return accountService.create(authentication.getName(), request);
    }
}
