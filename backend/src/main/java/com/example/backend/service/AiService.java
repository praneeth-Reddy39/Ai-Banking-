package com.example.backend.service;

import org.springframework.stereotype.Service;

@Service
public class AiService {

    public String generateInsight(Double balance, Double monthlySpending) {

        if (balance == null) {
            return "No balance information available.";
        }

        StringBuilder insight = new StringBuilder();

        // 1️⃣ Balance Analysis
        if (balance < 1000) {
            insight.append("⚠ Low balance alert! Consider reducing expenses.\n");
        } else if (balance > 100000) {
            insight.append("💎 You are eligible for Premium Banking benefits.\n");
        } else {
            insight.append("✅ Your account balance is stable.\n");
        }

        // 2️⃣ Spending Analysis
        if (monthlySpending != null) {
            if (monthlySpending > balance * 0.7) {
                insight.append("⚠ High spending detected this month.\n");
            } else {
                insight.append("📊 Spending pattern is under control.\n");
            }
        }

        // 3️⃣ Financial Health Score
        int score = calculateHealthScore(balance, monthlySpending);
        insight.append("📈 Financial Health Score: ").append(score).append("/100\n");

        // 4️⃣ AI Recommendation
        if (score < 40) {
            insight.append("💡 Recommendation: Build emergency savings.");
        } else if (score > 80) {
            insight.append("🚀 Great financial management! Consider investments.");
        } else {
            insight.append("👍 Keep maintaining your current strategy.");
        }

        return insight.toString();
    }

    private int calculateHealthScore(Double balance, Double monthlySpending) {

        int score = 50; // base score

        if (balance != null) {
            if (balance > 50000) score += 20;
            else if (balance < 1000) score -= 20;
        }

        if (monthlySpending != null && balance != null) {
            if (monthlySpending > balance * 0.7) score -= 20;
            else score += 10;
        }

        if (score > 100) score = 100;
        if (score < 0) score = 0;

        return score;
    }
}