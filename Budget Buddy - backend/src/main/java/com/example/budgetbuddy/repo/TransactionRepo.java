package com.example.budgetbuddy.repo;

import com.example.budgetbuddy.model.PresetAverages;
import com.example.budgetbuddy.model.PresetTransactions;
import com.example.budgetbuddy.model.SpendCategory;
import com.example.budgetbuddy.model.Transaction;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public interface TransactionRepo extends JpaRepository<Transaction, Long> {
    // find all transactions of a user
    List<Transaction> findByUserId(Long id);

    // find all transactions of a user by descending creation time
    @Query("SELECT t FROM Transaction t WHERE t.userId = ?1 ORDER BY transactionDate DESC, transactionTime DESC")
    List<Transaction> findByUserIdCreatedDesc(Long id);

    // find all transactions of a user between two fixed dates
    @Query("SELECT t FROM Transaction t WHERE t.userId = ?1 AND t.transactionDate BETWEEN ?2 AND ?3 ORDER BY t.transactionDate ASC, t.transactionTime ASC")
    List<Transaction> findAllByUserIdAndTransactionDateBetween(Long userId, String startDate, String endDate);

    // find all transactions of a user between two fixed dates in descending order
    @Query("SELECT t FROM Transaction t WHERE t.userId = ?1 AND t.transactionDate BETWEEN ?2 AND ?3 ORDER BY t.transactionDate DESC, t.transactionTime DESC")
    List<Transaction> findAllByUserIdAndTransactionDateBetweenDesc(Long userId, String startDate, String endDate);

    // find all transactions of a user from the current day
    default List<Transaction> findAllByUserIdFromCurrentDay(Long userId, String Date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate startDate = date.minusDays(0);
        return findAllByUserIdAndTransactionDateBetween(userId, startDate.toString(), date.toString());
    }

    // find all transactions of a user from the current month
    default List<Transaction> findAllByUserIdFromCurrentMonth(Long userId, String Date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate monthStartDate = LocalDate.of(date.getYear(), date.getMonth(), 1);
        return findAllByUserIdAndTransactionDateBetween(userId, monthStartDate.toString(), date.toString());
    }

    // find all transactions of a user from the current year
    default List<Transaction> findAllByUserIdFromCurrentYear(Long userId, String Date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate yearStartDate = LocalDate.of(date.getYear(), 1, 1);
        return findAllByUserIdAndTransactionDateBetween(userId, yearStartDate.toString(), date.toString());
    }

    default List<Transaction> findAllByUserIdFromCurrentDayDesc(Long userId, String Date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate startDate = date.minusDays(0);
        return findAllByUserIdAndTransactionDateBetweenDesc(userId, startDate.toString(), date.toString());
    }

    // find all transactions of a user from the current month
    default List<Transaction> findAllByUserIdFromCurrentMonthDesc(Long userId, String Date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate monthStartDate = LocalDate.of(date.getYear(), date.getMonth(), 1);
        return findAllByUserIdAndTransactionDateBetweenDesc(userId, monthStartDate.toString(), date.toString());
    }

    // find all transactions of a user from the current year
    default List<Transaction> findAllByUserIdFromCurrentYearDesc(Long userId, String Date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate yearStartDate = LocalDate.of(date.getYear(), 1, 1);
        return findAllByUserIdAndTransactionDateBetweenDesc(userId, yearStartDate.toString(), date.toString());
    }

    // find daily, monthly, annual expenditure
    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.userId = ?1 AND t.type = 'earn' AND t.transactionDate = ?2")
    Double sumEarnByDay(Long userId, String date);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.userId = ?1 AND t.type = 'spend' AND t.transactionDate = ?2")
    Double sumSpendByDay(Long userId, String date);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.userId = ?1 AND t.type = 'earn' AND t.transactionDate LIKE ?2%")
    Double sumEarnByMonth(Long userId, String month);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.userId = ?1 AND t.type = 'spend' AND t.transactionDate LIKE ?2%")
    Double sumSpendByMonth(Long userId, String month);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.userId = ?1 AND t.type = 'earn' AND t.transactionDate LIKE ?2%")
    Double sumEarnByYear(Long userId, String year);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.userId = ?1 AND t.type = 'spend' AND t.transactionDate LIKE ?2%")
    Double sumSpendByYear(Long userId, String year);


    default PresetTransactions getPresetTransactions(Long userId, String date) {
        return PresetTransactions.builder()
                .dailyEarn(sumEarnByDay(userId, date))
                .dailySpend(sumSpendByDay(userId, date))
                .monthlyEarn(sumEarnByMonth(userId, date.substring(0, 7)))
                .monthlySpend(sumSpendByMonth(userId, date.substring(0, 7)))
                .annualEarn(sumEarnByYear(userId, date.substring(0, 4)))
                .annualSpend(sumSpendByYear(userId, date.substring(0, 4)))
                .build();
    }

    // find daily, monthly, annual expenditure average
    @Query("SELECT COALESCE(SUM(t.amount), 0) from Transaction t WHERE t.userId = ?1 AND t.type = 'earn' AND t.transactionDate BETWEEN ?2 AND ?3")
    Double earnBetweenDates(Long userId, String startDate, String endDate);

    @Query("SELECT COALESCE(SUM(t.amount), 0) from Transaction t WHERE t.userId = ?1 AND t.type = 'spend' AND t.transactionDate BETWEEN ?2 AND ?3")
    Double spendBetweenDates(Long userId, String startDate, String endDate);

    default PresetAverages getPresetAverages(Long userId, String Date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate currentDate = LocalDate.now();
        LocalDate last7DaysStartDate = currentDate.minusDays(6);
        LocalDate monthStartDate = LocalDate.of(date.getYear(), date.getMonth(), 1);
        LocalDate yearStartDate = LocalDate.of(date.getYear(), 1, 1);

        Double sevenDaysEarn = earnBetweenDates(userId, last7DaysStartDate.toString(), currentDate.toString());
        Double sevenDaysSpend = spendBetweenDates(userId, last7DaysStartDate.toString(), currentDate.toString());
        Double sevenDaysAverage = (sevenDaysEarn - sevenDaysSpend) / 7;

        Double monthEarn = earnBetweenDates(userId, monthStartDate.toString(), currentDate.toString());
        Double monthSpend = spendBetweenDates(userId, monthStartDate.toString(), currentDate.toString());
        Integer noOfDaysPassedInMonth = currentDate.getDayOfMonth();
        Double monthlyAverage = (monthEarn - monthSpend) / noOfDaysPassedInMonth;

        Double yearEarn = earnBetweenDates(userId, yearStartDate.toString(), currentDate.toString());
        Double yearSpend = spendBetweenDates(userId, yearStartDate.toString(), currentDate.toString());
        Integer noOfDaysPassedInYear = currentDate.getDayOfYear();
        Double annualAverage = (yearEarn - yearSpend) / noOfDaysPassedInYear;

        return PresetAverages.builder()
                .sevenDaysAverage(sevenDaysAverage)
                .monthlyAverage(monthlyAverage)
                .annualAverage(annualAverage)
                .build();
    }

    // find monthly spend between categories
    @Query("SELECT COALESCE(SUM(amount), 0) FROM Transaction WHERE userId = ?1 AND category = 'Food' AND transactionDate BETWEEN ?2 AND ?3")
    Double foodAmount(Long userId, String from, String to);

    @Query("SELECT COALESCE(SUM(amount), 0) FROM Transaction WHERE userId = ?1 AND category = 'Transport' AND transactionDate BETWEEN ?2 AND ?3")
    Double transportAmount(Long userId, String from, String to);

    @Query("SELECT COALESCE(SUM(amount), 0) FROM Transaction WHERE userId = ?1 AND category = 'Entertainment' AND transactionDate BETWEEN ?2 AND ?3")
    Double entertainmentAmount(Long userId, String from, String to);

    @Query("SELECT COALESCE(SUM(amount), 0) FROM Transaction WHERE userId = ?1 AND category = 'Shopping' AND transactionDate BETWEEN ?2 AND ?3")
    Double shoppingAmount(Long userId, String from, String to);

    @Query("SELECT COALESCE(SUM(amount), 0) FROM Transaction WHERE userId = ?1 AND category = 'Utilities' AND transactionDate BETWEEN ?2 AND ?3")
    Double utilitiesAmount(Long userId, String from, String to);

    @Query("SELECT COALESCE(SUM(amount), 0) FROM Transaction WHERE userId = ?1 AND category = 'Housing' AND transactionDate BETWEEN ?2 AND ?3")
    Double housingAmount(Long userId, String from, String to);

    @Query("SELECT COALESCE(SUM(amount), 0) FROM Transaction WHERE userId = ?1 AND category = 'Other Spendings' AND transactionDate BETWEEN ?2 AND ?3")
    Double otherAmount(Long userId, String from, String to);

    default List<Double> getDayOfMonthSpending(Long userId, String Date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<Double> dayOfMonthSpending = new ArrayList<>();
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate monthStartDate = LocalDate.of(date.getYear(), date.getMonth(), 1);
        for(int i = 1; i <= date.getDayOfMonth(); ++i){
            LocalDate specificDate = LocalDate.of(date.getYear(), date.getMonth(), i);
            Double spendOnDay = spendBetweenDates(userId, specificDate.toString(), specificDate.toString());
            dayOfMonthSpending.add(spendOnDay);
        }
        return dayOfMonthSpending;
    }

    default List<Double> getMonthOfYearSpending(Long userId, String Date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<Double> monthOfYearSpending = new ArrayList<>();
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate yearStartDate = LocalDate.of(date.getYear(), 1, 1);
        for(int i = 1; i <= date.getMonthValue(); ++i){
            LocalDate specificMonthStartDate = LocalDate.of(date.getYear(), i, 1);
            LocalDate specificMonthEndDate = LocalDate.of(date.getYear(), i, specificMonthStartDate.lengthOfMonth());
            Double spendOnMonth = spendBetweenDates(userId, specificMonthStartDate.toString(), specificMonthEndDate.toString());
            monthOfYearSpending.add(spendOnMonth);
        }
        return monthOfYearSpending;
    }

    default List<Double> getDayOfLastSevenDaysSpending(Long userId, String Date){
        List<Double> dayOfLastSevenDays = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(("yyyy-MM-dd"));
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate last7DaysStartDate = date.minusDays(6);

        int toIncrement = 7;

        while(toIncrement > 0){
            LocalDate specificDate = last7DaysStartDate;
            Double spendOnDay = spendBetweenDates(userId, specificDate.toString(), specificDate.toString());
            dayOfLastSevenDays.add(spendOnDay);
            last7DaysStartDate = last7DaysStartDate.plusDays(1);
            toIncrement--;
        }

        return dayOfLastSevenDays;
    }

    default List<Double> getDayOfMonthEarning(Long userId, String Date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<Double> dayOfMonthEarning = new ArrayList<>();
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate monthStartDate = LocalDate.of(date.getYear(), date.getMonth(), 1);
        for(int i = 1; i <= date.getDayOfMonth(); ++i){
            LocalDate specificDate = LocalDate.of(date.getYear(), date.getMonth(), i);
            Double earnOnDay = earnBetweenDates(userId, specificDate.toString(), specificDate.toString());
            dayOfMonthEarning.add(earnOnDay);
        }
        return dayOfMonthEarning;
    }

    default List<Double> getMonthOfYearEarning(Long userId, String Date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<Double> monthOfYearEarning = new ArrayList<>();
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate yearStartDate = LocalDate.of(date.getYear(), 1, 1);
        for(int i = 1; i <= date.getMonthValue(); ++i){
            LocalDate specificMonthStartDate = LocalDate.of(date.getYear(), i, 1);
            LocalDate specificMonthEndDate = LocalDate.of(date.getYear(), i, specificMonthStartDate.lengthOfMonth());
            Double earnOnMonth = earnBetweenDates(userId, specificMonthStartDate.toString(), specificMonthEndDate.toString());
            monthOfYearEarning.add(earnOnMonth);
        }
        return monthOfYearEarning;
    }

    default List<Double> getDayOfLastSevenDaysEarning(Long userId, String Date){
        List<Double> dayOfLastSevenDays = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(("yyyy-MM-dd"));
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate last7DaysStartDate = date.minusDays(6);

        int toIncrement = 7;

        while(toIncrement > 0){
            LocalDate specificDate = last7DaysStartDate;
            Double earnOnDay = earnBetweenDates(userId, specificDate.toString(), specificDate.toString());
            dayOfLastSevenDays.add(earnOnDay);
            last7DaysStartDate = last7DaysStartDate.plusDays(1);
            toIncrement--;
        }

        return dayOfLastSevenDays;
    }



    default SpendCategory findMonthlySpendCategorySumByUserId(Long userId, String Date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(Date, formatter);
        LocalDate monthStartDate = LocalDate.of(date.getYear(), date.getMonth(), 1);

        return SpendCategory.builder()
                .Food(foodAmount(userId, monthStartDate.toString(), date.toString()))
                .Transport(transportAmount(userId, monthStartDate.toString(), date.toString()))
                .Entertainment(entertainmentAmount(userId, monthStartDate.toString(), date.toString()))
                .Shopping(shoppingAmount(userId, monthStartDate.toString(), date.toString()))
                .Utilities(utilitiesAmount(userId, monthStartDate.toString(), date.toString()))
                .Housing(housingAmount(userId, monthStartDate.toString(), date.toString()))
                .Other(otherAmount(userId, monthStartDate.toString(), date.toString()))
                .build();
    }


}

