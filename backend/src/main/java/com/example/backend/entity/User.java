package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private Double balance = 0.0;
    
    private String bankName;
    private String accountNumber;
    private String ifsc;
    private String mobile;

    public User() {}

    public Long getId() { return id; }

    public String getName() { return name; }

    public String getEmail() { return email; }

    public String getPassword() { return password; }

    public Double getBalance() { return balance; }
    
    public String getBankName() { return bankName; }
    public String getAccountNumber() { return accountNumber; }
    public String getIfsc() { return ifsc; }
    public String getMobile() { return mobile; }

    public void setName(String name) { this.name = name; }

    public void setEmail(String email) { this.email = email; }

    public void setPassword(String password) { this.password = password; }

    public void setBalance(Double balance) { this.balance = balance; }
    
    public void setBankName(String bankName) { this.bankName = bankName; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    public void setIfsc(String ifsc) { this.ifsc = ifsc; }
    public void setMobile(String mobile) { this.mobile = mobile; }
}
