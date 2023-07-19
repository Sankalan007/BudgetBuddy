package com.example.budgetbuddy.repo;

import com.example.budgetbuddy.model.Goals;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalsRepository extends JpaRepository<Goals, Long> {
}
