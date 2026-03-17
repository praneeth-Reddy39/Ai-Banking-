package com.example.backend.dto;

import java.util.List;

public class TransactionAnalyticsResponse {
    private int totalCount;
    private double totalAmount;
    private int depositsCount;
    private int withdrawalsCount;
    private double avgAmount;
    private double stdAmount;
    private List<String> topKeywords;
    private List<Anomaly> anomalies;

    public TransactionAnalyticsResponse(int totalCount, double totalAmount, int depositsCount, int withdrawalsCount,
                                        double avgAmount, double stdAmount, List<String> topKeywords, List<Anomaly> anomalies) {
        this.totalCount = totalCount;
        this.totalAmount = totalAmount;
        this.depositsCount = depositsCount;
        this.withdrawalsCount = withdrawalsCount;
        this.avgAmount = avgAmount;
        this.stdAmount = stdAmount;
        this.topKeywords = topKeywords;
        this.anomalies = anomalies;
    }

    public int getTotalCount() { return totalCount; }
    public double getTotalAmount() { return totalAmount; }
    public int getDepositsCount() { return depositsCount; }
    public int getWithdrawalsCount() { return withdrawalsCount; }
    public double getAvgAmount() { return avgAmount; }
    public double getStdAmount() { return stdAmount; }
    public List<String> getTopKeywords() { return topKeywords; }
    public List<Anomaly> getAnomalies() { return anomalies; }
}
