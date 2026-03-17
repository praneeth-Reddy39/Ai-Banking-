package com.example.backend.dto;

import java.time.LocalDateTime;

public class Anomaly {
    private Long id;
    private Double amount;
    private String type;
    private String description;
    private LocalDateTime createdAt;
    private String reason;

    public Anomaly(Long id, Double amount, String type, String description, LocalDateTime createdAt, String reason) {
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.createdAt = createdAt;
        this.reason = reason;
    }

    public Long getId() { return id; }
    public Double getAmount() { return amount; }
    public String getType() { return type; }
    public String getDescription() { return description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getReason() { return reason; }
}
