package com.example.backend.dto;

import java.time.LocalDateTime;

public class AccountResponse {
    private Long id;
    private String bankName;
    private String accountNumber;
    private String ifsc;
    private Double balance;
    private LocalDateTime createdAt;

    public AccountResponse(Long id, String bankName, String accountNumber, String ifsc, Double balance, LocalDateTime createdAt) {
        this.id = id;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.ifsc = ifsc;
        this.balance = balance;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public String getBankName() { return bankName; }
    public String getAccountNumber() { return accountNumber; }
    public String getIfsc() { return ifsc; }
    public Double getBalance() { return balance; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
