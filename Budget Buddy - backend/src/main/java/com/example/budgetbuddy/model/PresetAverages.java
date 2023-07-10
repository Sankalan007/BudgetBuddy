package com.example.budgetbuddy.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PresetAverages {
    private Double sevenDaysAverage;
    private Double monthlyAverage;
    private Double annualAverage;
}
