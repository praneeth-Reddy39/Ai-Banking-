package com.example.backend.dto;

public class TransactionRequest {
    private Double amount;
    private String type;
    private String description;

    public TransactionRequest() {}

    public Double getAmount() { return amount; }
    public String getType() { return type; }
    public String getDescription() { return description; }

    public void setAmount(Double amount) { this.amount = amount; }
    public void setType(String type) { this.type = type; }
    public void setDescription(String description) { this.description = description; }
}
