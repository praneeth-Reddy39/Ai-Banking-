package com.example.backend.dto;

public class AccountCreateRequest {
    private String bankName;

    public AccountCreateRequest() {}

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }
}
