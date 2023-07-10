package com.example.budgetbuddy.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PresetTransactions {
    private Double dailyEarn;
    private Double dailySpend;
    private Double monthlyEarn;
    private Double monthlySpend;
    private Double annualEarn;
    private Double annualSpend;

}
