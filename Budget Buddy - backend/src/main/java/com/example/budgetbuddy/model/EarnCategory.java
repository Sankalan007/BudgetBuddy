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
    private Double Salary;
    private Double Business;
    private Double Rental;
    private Double Investment;
    private Double Gifts;
    private Double Freelance;
    private Double OtherIncomes;
}
