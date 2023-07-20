package com.example.budgetbuddy.service;


import com.example.budgetbuddy.model.Budget;
import com.example.budgetbuddy.model.Goals;
import com.example.budgetbuddy.repo.GoalsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GoalsService {
    @Autowired
    private final GoalsRepository goalsRepository;

    public Optional<Goals> getGoals(Long id){
        return goalsRepository.findById(id);
    }


    public List<Goals> findGoalByUserId(Long id){
        return goalsRepository.findByUserId(id);
    }
    public Goals findGoalById(Long id){
        Optional<Goals> budgetOptional = goalsRepository.findById(id);
        return budgetOptional.orElse(null);
    }

    public Goals addGoals(Goals goals){
        return goalsRepository.save(goals);

    }

    public Goals updateGoals(Goals goals){
        return goalsRepository.save(goals);
    }

    public void deleteGoals(Long id){
        goalsRepository.deleteById(id);
    }

}
