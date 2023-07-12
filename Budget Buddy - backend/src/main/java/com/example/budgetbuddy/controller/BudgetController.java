package com.example.budgetbuddy.controller;

import com.example.budgetbuddy.model.Budget;
import com.example.budgetbuddy.model.SpendCategory;
import com.example.budgetbuddy.service.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/budget")
@RequiredArgsConstructor
public class BudgetController {
    private final BudgetService budgetService;
    @GetMapping("/all/{id}")
    public ResponseEntity<SpendCategory> findAll(@PathVariable("id") Long userId){
        SpendCategory budgets = budgetService.getAllBudgetsByUserId(userId);
        return new ResponseEntity<>(budgets, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Budget> addBudget(@RequestBody Budget budget){
        Budget newBudget = budgetService.addBudget(budget);
        return new ResponseEntity<>(newBudget, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Budget> updateBudget(@PathVariable("id") Long id, @RequestBody Budget budget){
        Budget existingBudget = budgetService.findBudgetById(id);
        if (existingBudget == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        existingBudget.setUserId(budget.getUserId());
        existingBudget.setCategory(budget.getCategory());
        existingBudget.setAmount(budget.getAmount());
        Budget updatedBudget = budgetService.updateBudget(existingBudget);
        return new ResponseEntity<>(updatedBudget, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBudget(@PathVariable("id") Long id){
        budgetService.deleteBudget(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
