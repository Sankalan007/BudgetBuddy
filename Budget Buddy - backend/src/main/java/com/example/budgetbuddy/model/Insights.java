package com.example.budgetbuddy.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Insights {
    private Integer leastEarnDay;
    private Integer leastEarnMonth;
    private InsightsCategories leastEarnCategory;
    private Integer leastSpendDay;
    private Integer leastSpendMonth;
    private InsightsCategories leastSpendCategory;
    private Integer mostEarnDay;
    private Integer mostEarnMonth;
    private InsightsCategories mostEarnCategory;
    private Integer mostSpendDay;
    private Integer mostSpendMonth;
    private InsightsCategories mostSpendCategory;

}
