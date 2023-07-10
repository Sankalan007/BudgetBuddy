package com.example.budgetbuddy.controller;

import com.example.budgetbuddy.model.*;
import com.example.budgetbuddy.service.TransactionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/transaction")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;
    @Transactional
    @GetMapping("/all/{id}")
    public ResponseEntity<List<Transaction>> getAllTransactionsByUserId(@PathVariable("id") Long id){
        List<Transaction> transactions = transactionService.findAllTransactionsByUserId(id);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
    @Transactional
    @GetMapping("/all/created-desc/{id}")
    public ResponseEntity<List<Transaction>> getAllTransactionsByUserIdCreatedDesc(@PathVariable("id") Long id){
        List<Transaction> transactions = transactionService.findAllTransactionsByUserIdCreatedDesc(id);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
    @GetMapping("/preset-transactions/{userId}/{date}")
    public ResponseEntity<PresetTransactions> getPresetTransactions(@PathVariable Long userId, @PathVariable String date) {
        PresetTransactions presetTransactions = transactionService.getPresetTransactions(userId, date);
        return new ResponseEntity<>(presetTransactions, HttpStatus.OK);
    }

    @GetMapping("/preset-averages/{userId}/{date}")
    public ResponseEntity<PresetAverages> getPresetAverages(@PathVariable Long userId, @PathVariable String date) {
        PresetAverages presetaverages = transactionService.getPresetAverages(userId, date);
        return new ResponseEntity<>(presetaverages, HttpStatus.OK);
    }

    @Transactional
    @GetMapping("/filter/transactions-between/{from}/{to}/{userId}")
    public ResponseEntity<List<Transaction>> getAllTransactionsBetweenDates(@PathVariable("userId") Long userId, @PathVariable("from") String from, @PathVariable("to") String to){
        List<Transaction> transactions = transactionService.getTransactionsBetweenDates(userId, from, to);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
    @Transactional
    @GetMapping("/filter/transactions-between-desc/{from}/{to}/{userId}")
    public ResponseEntity<List<Transaction>> getAllTransactionsBetweenDatesDesc(@PathVariable("userId") Long userId, @PathVariable("from") String from, @PathVariable("to") String to){
        List<Transaction> transactions = transactionService.getTransactionsBetweenDatesDesc(userId, from, to);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @Transactional
    @GetMapping("/filter/current-day/{date}/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionsOfCurrentDay(@PathVariable("userId") Long userId, @PathVariable("date") String date ){
        List<Transaction> transactions = transactionService.getTransactionsOfCurrentDay(userId, date);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
    @Transactional
    @GetMapping("/filter/current-month/{date}/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionsOfCurrentMonth(@PathVariable("userId") Long userId, @PathVariable("date") String date ){
        List<Transaction> transactions = transactionService.getTransactionsOfCurrentMonth(userId, date);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @Transactional
    @GetMapping("/filter/current-year/{date}/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionsOfCurrentYear(@PathVariable("userId") Long userId, @PathVariable("date") String date ){
        List<Transaction> transactions = transactionService.getTransactionsOfCurrentYear(userId, date);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
    @Transactional
    @GetMapping("/filter/current-day-desc/{date}/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionsOfCurrentDayDesc(@PathVariable("userId") Long userId, @PathVariable("date") String date ){
        List<Transaction> transactions = transactionService.getTransactionsOfCurrentDayDesc(userId, date);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
    @Transactional
    @GetMapping("/filter/current-month-desc/{date}/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionsOfCurrentMonthDesc(@PathVariable("userId") Long userId, @PathVariable("date") String date ){
        List<Transaction> transactions = transactionService.getTransactionsOfCurrentMonthDesc(userId, date);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @Transactional
    @GetMapping("/filter/current-year-desc/{date}/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionsOfCurrentYearDesc(@PathVariable("userId") Long userId, @PathVariable("date") String date ){
        List<Transaction> transactions = transactionService.getTransactionsOfCurrentYearDesc(userId, date);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/category/month/{userId}/{date}")
    public ResponseEntity<SpendCategory> getAmountByCategory(@PathVariable("userId") Long userId, @PathVariable("date") String date){
        SpendCategory spendCategory = transactionService.getAmountByCategory(userId, date);
        return new ResponseEntity<>(spendCategory, HttpStatus.OK);
    }


    @PostMapping("/add")
    public ResponseEntity<Transaction> addNewTransaction(@RequestBody Transaction transaction){
        Transaction newTransaction = transactionService.addTransaction(transaction);
        return new ResponseEntity<>(newTransaction, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable("id") Long id, @RequestBody Transaction transaction){
        Transaction existingTransaction = transactionService.findTransactionById(id);
        if (existingTransaction == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        existingTransaction.setUserId(transaction.getUserId());
        existingTransaction.setType(transaction.getType());
        existingTransaction.setDescription(transaction.getDescription());
        existingTransaction.setAmount(transaction.getAmount());
        existingTransaction.setTransactionDate(transaction.getTransactionDate());
        existingTransaction.setTransactionTime(transaction.getTransactionTime());
        existingTransaction.setCategory(transaction.getCategory());

        Transaction updatedBudget = transactionService.updateTransaction(existingTransaction);
        return new ResponseEntity<>(updatedBudget, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable("id") Long id){
        transactionService.deleteTransaction(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
