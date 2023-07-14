import { Injectable } from '@angular/core';
import {  NewtransactionComponent } from 'src/app/pages/newtransaction/newtransaction.component';
import SpendCategories from 'src/app/model/SpendCategories';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Budget  from 'src/app/model/Buget'

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) {}

  // // userDetails: any = this.transactionComponent.userDetails
                                                                 
  private baseUrl = 'http://localhost:8080/api/v1/budget';

  // addNewTransaction(buget: Buget): Observable<Buget> {
  //   return this.http.post<Buget>(`${this.baseUrl}/add`, buget);
  // }

  // spendCategory:SpendCategories[] = [];
  
  addNewBudget(spendCategory: Budget): Observable<SpendCategories> {
    return this.http.post<SpendCategories>(`${this.baseUrl}/add`, spendCategory);
  }


  getAllBudget(userId: number): Observable<SpendCategories> {
    return this.http.get<SpendCategories>(`${this.baseUrl}/all/${userId}`);
  }


}
