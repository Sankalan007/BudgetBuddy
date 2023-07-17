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
    private String leastEarnCategory;
    private Integer leastSpendDay;
    private Integer leastSpendMonth;
    private String leastSpendCategory;
    private Integer mostEarnDay;
    private Integer mostEarnMonth;
    private String mostEarnCategory;
    private Integer mostSpendDay;
    private Integer mostSpendMonth;
    private String mostSpendCategory;

}
