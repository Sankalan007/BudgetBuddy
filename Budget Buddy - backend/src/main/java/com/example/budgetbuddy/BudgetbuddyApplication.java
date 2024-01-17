package com.example.budgetbuddy;

import com.example.budgetbuddy.service.TransactionService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class BudgetbuddyApplication {
	public static void main(String[] args) {
		SpringApplication.run(BudgetbuddyApplication.class, args);
	}

}
