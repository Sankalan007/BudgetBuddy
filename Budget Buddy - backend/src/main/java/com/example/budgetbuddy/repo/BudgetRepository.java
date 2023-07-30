package com.example.budgetbuddy.repo;

import com.example.budgetbuddy.model.Budget;
import com.example.budgetbuddy.model.SpendCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Optional<Budget> findBudgetByCategory(String category);
    List<Budget> findByUserId(Long id);

    @Query("Select b.category, b.amount from Budget b WHERE userId = ?1")
    List<Object[]> findCategory(Long userId);

    default SpendCategory findCategories(Long userId){
        List<Object[]> data = findCategory(userId);
        Double Food = null, Transport = null, Entertainment = null, Shopping = null, Utilities = null, Housing = null, Other = null;
        for(int i = 0; i < data.size(); ++i){
            if("Food".equals(data.get(i)[0]))
                Food = (Double) data.get(i)[1];
            if("Transport".equals(data.get(i)[0]))
                Transport = (Double) data.get(i)[1];
            if("Entertainment".equals(data.get(i)[0]))
                Entertainment = (Double) data.get(i)[1];
            if("Shopping".equals(data.get(i)[0]))
                Shopping = (Double) data.get(i)[1];
            if("Utilities".equals(data.get(i)[0]))
                Utilities = (Double) data.get(i)[1];
            if("Housing".equals(data.get(i)[0]))
                Housing = (Double) data.get(i)[1];
            if("Other".equals(data.get(i)[0]))
                Other = (Double) data.get(i)[1];
        }
        return SpendCategory.builder()
                .food(Food)
                .transport(Transport)
                .entertainment(Entertainment)
                .shopping(Shopping)
                .utilities(Utilities)
                .housing(Housing)
                .other(Other)
                .build();
    }
}
