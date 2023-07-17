import { Injectable } from '@angular/core';
import { NewtransactionComponent } from 'src/app/pages/newtransaction/newtransaction.component';
import SpendCategories from 'src/app/model/SpendCategories';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Budget from 'src/app/model/Buget';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(private http: HttpClient) {}

  // // userDetails: any = this.transactionComponent.userDetails

  private baseUrl = 'http://localhost:8080/api/v1/budget';

  // addNewTransaction(buget: Buget): Observable<Buget> {
  //   return this.http.post<Buget>(`${this.baseUrl}/add`, buget);
  // }

  // spendCategory:SpendCategories[] = [];

  addNewBudget(budget: Budget): Observable<String> {
    return this.http.post<String>(`${this.baseUrl}/add`, budget);
  }

  getAllBudget(userId: number): Observable<SpendCategories> {
    return this.http.get<SpendCategories>(`${this.baseUrl}/all/${userId}`);
  }

  updateThisBudget(id: number, budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.baseUrl}/update/${id}`, budget);
  }
}
