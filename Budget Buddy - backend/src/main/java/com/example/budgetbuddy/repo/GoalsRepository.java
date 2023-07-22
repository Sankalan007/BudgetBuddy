package com.example.budgetbuddy.repo;

import com.example.budgetbuddy.model.Goals;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalsRepository extends JpaRepository<Goals, Long> {

    List<Goals> findByUserId(Long id);
    void deleteByUserId(Long id);
}
