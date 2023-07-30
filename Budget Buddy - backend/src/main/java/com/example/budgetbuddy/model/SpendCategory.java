package com.example.budgetbuddy.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpendCategory {
    private Double food;
    private Double transport;
    private Double entertainment;
    private Double shopping;
    private Double utilities;
    private Double housing;
    private Double other;
}
