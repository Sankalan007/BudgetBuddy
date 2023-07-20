package com.example.budgetbuddy.controller;


import com.example.budgetbuddy.model.Goals;
import com.example.budgetbuddy.repo.GoalsRepository;
import com.example.budgetbuddy.service.GoalsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/goals")
@RequiredArgsConstructor
public class GoalsController {
    private final GoalsService goalsService;
    private final GoalsRepository goalsRepository;

    @GetMapping("/findById/{id}")
    public ResponseEntity<Optional<Goals>> getGoals(@PathVariable("id") Long id){
        Optional<Goals> goalsOptional = goalsService.getGoals(id);
        return new ResponseEntity<>(goalsOptional, HttpStatus.OK);
    }

    @GetMapping("/findByUserId/{id}")
    public ResponseEntity<List<Goals>> getGoalsById(@PathVariable("id") Long id){
        List<Goals> goals = goalsService.findGoalByUserId(id);
        return new ResponseEntity<>(goals, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Goals> setGoals(@RequestBody Goals goals){
        Goals goals1 = goalsService.addGoals(goals);
        return new ResponseEntity<>(goals1, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Goals> updateGoals(@PathVariable("id") Long id, @RequestBody Goals goals){
        Goals existingGoals = goalsService.findGoalById(id);
        if (existingGoals == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        existingGoals.setSaving(existingGoals.getSaving());
        existingGoals.setTitle(existingGoals.getTitle());
        existingGoals.setDescription(existingGoals.getDescription());
        existingGoals.setTarget(existingGoals.getTarget());
        existingGoals.setStartDate(existingGoals.getStartDate());
        existingGoals.setEndDate(existingGoals.getEndDate());
        existingGoals.setUserId(existingGoals.getUserId());

        Goals goals1 = goalsService.updateGoals(existingGoals);
        return new ResponseEntity<>(goals1, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteGoals(@PathVariable("id") Long id){
        goalsRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
