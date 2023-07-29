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
    const token = localStorage.getItem('token');
    return this.http.get<Transaction[]>(`${this.baseUrl}/all/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  findAllTransactionsByCreatedDesc(userId: number): Observable<Transaction[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/all/created-desc/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  addNewTransaction(transaction: Transaction): Observable<Transaction> {
    const token = localStorage.getItem('token');
    return this.http.post<Transaction>(`${this.baseUrl}/add`, transaction, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateTransaction(
    transaction: Transaction,
    transactionId: number
  ): Observable<Transaction> {
    const token = localStorage.getItem('token');
    return this.http.put<Transaction>(
      `${this.baseUrl}/update/${transactionId}`,
      transaction, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  deleteTransaction(transactionId: number): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.delete<void>(`${this.baseUrl}/delete/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getPresetTransactions(
    userId: number,
    date: string
  ): Observable<PresetTransactions> {
    const token = localStorage.getItem('token');
    return this.http.get<PresetTransactions>(
      `${this.baseUrl}/preset-transactions/${userId}/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getPresetAverages(userId: number, date: string): Observable<PresetAverages> {
    const token = localStorage.getItem('token');
    return this.http.get<PresetAverages>(
      `${this.baseUrl}/preset-averages/${userId}/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getTransactionsBetween(
    userId: number,
    from: String,
    to: String
  ): Observable<Transaction[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/transactions-between/${from}/${to}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getTransactionsBetweenDesc(
    userId: number,
    from: String,
    to: String
  ): Observable<Transaction[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/transactions-between-desc/${from}/${to}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getMonthlyCategoriesSpending(
    userId: number,
    date: string
  ): Observable<SpendCategories> {
    const token = localStorage.getItem('token');
    return this.http.get<SpendCategories>(
      `${this.baseUrl}/category/month/${userId}/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getMonthlyCategoriesEarning(
    userId: number,
    date: string
  ): Observable<EarnCategories> {
    const token = localStorage.getItem('token');
    return this.http.get<EarnCategories>(
      `${this.baseUrl}/earnCategory/month/${userId}/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getDailyTransaction(userId: number, date: String): Observable<Transaction[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/current-day/${date}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getMonthlyTransaction(
    userId: number,
    date: String
  ): Observable<Transaction[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/current-month/${date}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getAnnualTransaction(
    userId: number,
    date: String
  ): Observable<Transaction[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/current-year/${date}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getDailyTransactionDesc(
    userId: number,
    date: String
  ): Observable<Transaction[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/current-day-desc/${date}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getMonthlyTransactionDesc(
    userId: number,
    date: String
  ): Observable<Transaction[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/current-month-desc/${date}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getAnnualTransactionDesc(
    userId: number,
    date: String
  ): Observable<Transaction[]> {
    const token = localStorage.getItem('token');
    return this.http.get<Transaction[]>(
      `${this.baseUrl}/filter/current-year-desc/${date}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getDayOfMonthSpending(userId: number, date: String): Observable<number[]> {
    const token = localStorage.getItem('token');
    return this.http.get<number[]>(
      `${this.baseUrl}/dayOfMonthSpending/${userId}/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  getMonthOfYearSpending(userId: number, date: String): Observable<number[]> {
    const token = localStorage.getItem('token');
    return this.http.get<number[]>(
      `${this.baseUrl}/monthOfYearSpending/${userId}/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  getDayOfLastSevenDaysSpending(
    userId: number,
    date: String
  ): Observable<number[]> {
    const token = localStorage.getItem('token');
    return this.http.get<number[]>(
      `${this.baseUrl}/dayOfLastSevenDays/${userId}/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  getDayOfMonthEarning(userId: number, date: String): Observable<number[]> {
    const token = localStorage.getItem('token');
    return this.http.get<number[]>(
      `${this.baseUrl}/dayOfMonthEarning/${userId}/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  getMonthOfYearEarning(userId: number, date: String): Observable<number[]> {
    const token = localStorage.getItem('token');
    return this.http.get<number[]>(
      `${this.baseUrl}/monthOfYearEarning/${userId}/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  getDayOfLastSevenDaysEarning(
    userId: number,
    date: String
  ): Observable<number[]> {
    const token = localStorage.getItem('token');
    return this.http.get<number[]>(
      `${this.baseUrl}/dayOfLastSevenDaysEarn/${userId}/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  getInsights(userId: number, date: String): Observable<Insights> {
    const token = localStorage.getItem('token');
    return this.http.get<Insights>(
      `${this.baseUrl}/insights/${userId}/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
