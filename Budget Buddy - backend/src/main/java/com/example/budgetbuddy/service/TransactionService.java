package com.example.budgetbuddy.service;

import com.example.budgetbuddy.model.*;
import com.example.budgetbuddy.repo.TransactionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepo transactionRepository;

    public List<Transaction> findAllTransactionsByUserId(Long id) {
        return transactionRepository.findByUserId(id);
    }

    public Transaction findTransactionById(Long id) {
        Optional<Transaction> transactionOptional = transactionRepository.findById(id);
        return transactionOptional.orElse(null);
    }

    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    public List<Transaction> findAllTransactionsByUserIdCreatedDesc(Long id) {
        return transactionRepository.findByUserIdCreatedDesc(id);
    }

    public PresetTransactions getPresetTransactions(Long userId, String date) {
        return transactionRepository.getPresetTransactions(userId, date);
    }

    public List<Transaction> getTransactionsBetweenDates(Long userId, String from, String to) {
        return transactionRepository.findAllByUserIdAndTransactionDateBetween(userId, from, to);
    }

    public List<Transaction> getTransactionsBetweenDatesDesc(Long userId, String from, String to) {
        return transactionRepository.findAllByUserIdAndTransactionDateBetweenDesc(userId, from, to);
    }

    public List<Transaction> getTransactionsOfCurrentDay(Long userId, String date) {
        return transactionRepository.findAllByUserIdFromCurrentDay(userId, date);
    }

    public List<Transaction> getTransactionsOfCurrentMonth(Long userId, String date) {
        return transactionRepository.findAllByUserIdFromCurrentMonth(userId, date);
    }

    public List<Transaction> getTransactionsOfCurrentYear(Long userId, String date) {
        return transactionRepository.findAllByUserIdFromCurrentYear(userId, date);
    }

    public List<Transaction> getTransactionsOfCurrentDayDesc(Long userId, String date) {
        return transactionRepository.findAllByUserIdFromCurrentDayDesc(userId, date);
    }

    public List<Transaction> getTransactionsOfCurrentMonthDesc(Long userId, String date) {
        return transactionRepository.findAllByUserIdFromCurrentMonthDesc(userId, date);
    }

    public List<Transaction> getTransactionsOfCurrentYearDesc(Long userId, String date) {
        return transactionRepository.findAllByUserIdFromCurrentYearDesc(userId, date);
    }

    public PresetAverages getPresetAverages(Long userId, String date) {
        return transactionRepository.getPresetAverages(userId, date);
    }

    public SpendCategory getAmountByCategory(Long userId, String date) {
        return transactionRepository.findMonthlySpendCategorySumByUserId(userId, date);
    }

    public EarnCategory getEarnAmountByCategory(Long userId, String date) {
        return transactionRepository.findMonthlyEarnCategorySumByUserId(userId, date);
    }

    public List<Double> getDayOfMonthSpending(Long userId, String Date) {
        return transactionRepository.getDayOfMonthSpending(userId, Date);
    }

    public List<Double> getMonthOfYearSpending(Long userId, String Date) {
        return transactionRepository.getMonthOfYearSpending(userId, Date);
    }

    public List<Double> getDayOfLastSevenDays(Long userId, String Date) {
        return transactionRepository.getDayOfLastSevenDaysSpending(userId, Date);
    }

    public List<Double> getDayOfMonthEarning(Long userId, String Date) {
        return transactionRepository.getDayOfMonthEarning(userId, Date);
    }

    public List<Double> getMonthOfYearEarning(Long userId, String Date) {
        return transactionRepository.getMonthOfYearEarning(userId, Date);
    }

    public List<Double> getDayOfLastSevenDaysEarning(Long userId, String Date) {
        return transactionRepository.getDayOfLastSevenDaysEarning(userId, Date);
    }

    public Insights getTransactionInsights(Long userId, String date) {
        return transactionRepository.getTransactionsInsights(userId, date);
    }
}
