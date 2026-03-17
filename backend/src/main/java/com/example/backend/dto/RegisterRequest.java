package com.example.backend.dto;

public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String bankName;
    private String accountNumber;
    private String ifsc;
    private String mobile;

    public RegisterRequest() {}

    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getBankName() { return bankName; }
    public String getAccountNumber() { return accountNumber; }
    public String getIfsc() { return ifsc; }
    public String getMobile() { return mobile; }

    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setBankName(String bankName) { this.bankName = bankName; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    public void setIfsc(String ifsc) { this.ifsc = ifsc; }
    public void setMobile(String mobile) { this.mobile = mobile; }
}
