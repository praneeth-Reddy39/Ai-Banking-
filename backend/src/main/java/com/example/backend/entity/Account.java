package com.example.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String bankName;

    @Column(unique = true, nullable = false)
    private String accountNumber;

    @Column(nullable = false)
    private String ifsc;

    private Double balance = 0.0;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Account() {}

    public Long getId() { return id; }
    public User getUser() { return user; }
    public String getBankName() { return bankName; }
    public String getAccountNumber() { return accountNumber; }
    public String getIfsc() { return ifsc; }
    public Double getBalance() { return balance; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setUser(User user) { this.user = user; }
    public void setBankName(String bankName) { this.bankName = bankName; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    public void setIfsc(String ifsc) { this.ifsc = ifsc; }
    public void setBalance(Double balance) { this.balance = balance; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
