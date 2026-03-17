package com.example.backend.dto;

import java.time.LocalDateTime;

public class TransactionResponse {
    private Long id;
    private Double amount;
    private String type;
    private String description;
    private LocalDateTime createdAt;

    public TransactionResponse(Long id, Double amount, String type, String description, LocalDateTime createdAt) {
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public Double getAmount() { return amount; }
    public String getType() { return type; }
    public String getDescription() { return description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
