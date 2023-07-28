package com.example.budgetbuddy.repo;

import com.example.budgetbuddy.repo.TransactionRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class TransactionRepoTest {

    @Autowired
    private TransactionRepo transactionRepo;

    @ParameterizedTest
    @CsvSource({
            "1, 2023-07-28, 2023-07-28, 0.0",
            "2, 2023-07-28, 2023-07-28, 0.0"
    })
    void foodAmount(Long userId, String startDate, String endDate, Double expectedResult) {
        Double actualResult = transactionRepo.foodAmount(userId, startDate, endDate);
        assertThat(actualResult).isEqualTo(expectedResult);
    }
}
