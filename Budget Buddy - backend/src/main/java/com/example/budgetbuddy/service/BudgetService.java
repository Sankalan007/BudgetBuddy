package com.example.budgetbuddy.service;

import com.example.budgetbuddy.model.Budget;
import com.example.budgetbuddy.model.SpendCategory;
import com.example.budgetbuddy.repo.BudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetService {
    private final BudgetRepository budgetRepository;
    public Optional<Budget> getBudgetByCategory(String category){
        return budgetRepository.findBudgetByCategory(category);
    }
    public Budget findBudgetById(Long id){
        Optional<Budget> budgetOptional = budgetRepository.findById(id);
        return budgetOptional.orElse(null);
    }
    public SpendCategory getAllBudgetsByUserId(Long id){
        return budgetRepository.findCategories(id);
    }
    public Budget addBudget(Budget budget){
        return budgetRepository.save(budget);
    }

    public Budget updateBudget(Budget budget){

        return budgetRepository.save(budget);
    }
    public void deleteBudget(Long id){
        budgetRepository.deleteById(id);
    }
}
