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
    private Double Food;
    private Double Transport;
    private Double Entertainment;
    private Double Shopping;
    private Double Utilities;
    private Double Housing;
    private Double Other;

}
