package com.example.budgetbuddy;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class BudgetbuddyApplicationTests {
	private Calculator c = new Calculator();
	@Test
	void contextLoads() {
	}

	@Test
	void testSum(){
		int expectedResult = 17;
		int actualResult = c.doSum(12, 3, 2);
		assertThat(actualResult).isEqualTo(expectedResult);
	}
	@Test
	void testProd(){
		int expectedResult = 6;
		int actualResult = c.doProduct(3, 2);
		assertThat(actualResult).isEqualTo(expectedResult);
	}

	@Test
	void testCompareNums(){
		Boolean actualResult = c.compareTwoNums(5, 5);
		assertThat(actualResult).isTrue();
	}

}
