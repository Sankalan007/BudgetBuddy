import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import EarnCategories from 'src/app/model/EarnCategories';
import Insights from 'src/app/model/Insights';
import PresetAverages from 'src/app/model/PresetAverages';
import PresetTransactions from 'src/app/model/PresetTransactions';
import SpendCategories from 'src/app/model/SpendCategories';
import Transaction from 'src/app/model/Transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'http://localhost:8080/api/v1/transaction';

  constructor(private http: HttpClient) {}

  findAllTransactions(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/all/${userId}`);
  }
  findAllTransactionsByCreatedDesc(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/all/created-desc/${userId}`
    );
  }

  addNewTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/add`, transaction);
  }

  updateTransaction(
    transaction: Transaction,
    transactionId: number
  ): Observable<Transaction> {
    return this.http.put<Transaction>(
      `${this.baseUrl}/update/${transactionId}`,
      transaction
    );
  }

  deleteTransaction(transactionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${transactionId}`);
  }

  getPresetTransactions(
    userId: number,
    date: string
  ): Observable<PresetTransactions> {
    return this.http.get<PresetTransactions>(
      `${this.baseUrl}/preset-transactions/${userId}/${date}`
    );
  }

  getPresetAverages(userId: number, date: string): Observable<PresetAverages> {
    return this.http.get<PresetAverages>(
      `${this.baseUrl}/preset-averages/${userId}/${date}`
    );
  }

  getTransactionsBetween(
    userId: number,
    from: String,
    to: String
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/transactions-between/${from}/${to}/${userId}`
    );
  }

  getTransactionsBetweenDesc(
    userId: number,
    from: String,
    to: String
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/transactions-between-desc/${from}/${to}/${userId}`
    );
  }

  getMonthlyCategoriesSpending(
    userId: number,
    date: string
  ): Observable<SpendCategories> {
    return this.http.get<SpendCategories>(
      `${this.baseUrl}/category/month/${userId}/${date}`
    );
  }

  getMonthlyCategoriesEarning(
    userId: number,
    date: string
  ): Observable<EarnCategories> {
    return this.http.get<EarnCategories>(
      `${this.baseUrl}/earnCategory/month/${userId}/${date}`
    );
  }

  getDailyTransaction(userId: number, date: String): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/current-day/${date}/${userId}`
    );
  }

  getMonthlyTransaction(
    userId: number,
    date: String
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/current-month/${date}/${userId}`
    );
  }

  getAnnualTransaction(
    userId: number,
    date: String
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/current-year/${date}/${userId}`
    );
  }

  getDailyTransactionDesc(
    userId: number,
    date: String
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/current-day-desc/${date}/${userId}`
    );
  }

  getMonthlyTransactionDesc(
    userId: number,
    date: String
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/current-month-desc/${date}/${userId}`
    );
  }

  getAnnualTransactionDesc(
    userId: number,
    date: String
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/current-year-desc/${date}/${userId}`
    );
  }

  getDayOfMonthSpending(userId: number, date: String): Observable<number[]>{
    return this.http.get<number[]>(`${this.baseUrl}/dayOfMonthSpending/${userId}/${date}`);
  }
  getMonthOfYearSpending(userId: number, date: String): Observable<number[]>{
    return this.http.get<number[]>(`${this.baseUrl}/monthOfYearSpending/${userId}/${date}`);
  }
  getDayOfLastSevenDaysSpending(userId: number, date: String): Observable<number[]>{
    return this.http.get<number[]>(`${this.baseUrl}/dayOfLastSevenDays/${userId}/${date}`);
  }
  getDayOfMonthEarning(userId: number, date: String): Observable<number[]>{
    return this.http.get<number[]>(`${this.baseUrl}/dayOfMonthEarning/${userId}/${date}`);
  }
  getMonthOfYearEarning(userId: number, date: String): Observable<number[]>{
    return this.http.get<number[]>(`${this.baseUrl}/monthOfYearEarning/${userId}/${date}`);
  }
  getDayOfLastSevenDaysEarning(userId: number, date: String): Observable<number[]>{
    return this.http.get<number[]>(`${this.baseUrl}/dayOfLastSevenDaysEarn/${userId}/${date}`);
  }
  getInsights(userId: number, date: String): Observable<Insights>{
    return this.http.get<Insights>(`${this.baseUrl}/insights/${userId}/${date}`);
  }
}
