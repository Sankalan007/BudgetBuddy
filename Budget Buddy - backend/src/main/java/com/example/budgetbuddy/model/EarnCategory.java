package com.example.budgetbuddy.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EarnCategory {
    private Double salary;
    private Double business;
    private Double rental;
    private Double investment;
    private Double gifts;
    private Double freelance;
    private Double otherIncomes;
}
