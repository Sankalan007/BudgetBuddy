import { Component, OnInit } from '@angular/core';
import SpendCategories from 'src/app/model/SpendCategories';
import { NewtransactionComponent } from 'src/app/pages/newtransaction/newtransaction.component';
import { BudgetService } from 'src/app/services/budget/budget.service';
import { Observable } from 'rxjs';
import { TransactionsComponent } from '../transactions/transactions.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import Budget from 'src/app/model/Buget';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  // foodBudget!: number;

  spendCategory: SpendCategories = {
    food: 100,
    transport: null,
    utilities: null,
    shopping: null,
    entertainment: null,
    housing: null,
    other: null,
  };
  constructor(
    private budgetService: BudgetService,
    private sharedDataService: SharedDataService,
    private http: HttpClient
  ) {}
  userDetails!: any;
  userId!: number;
  ngOnInit(): void {
    this.sharedDataService.userDetailsObservable.subscribe((res) => {
      this.userDetails = res;
      console.log(this.userDetails);
      this.userId = this.userDetails[0].id;
    });
    this.budgetService.getAllBudget(this.userDetails[0].id).subscribe(
      (cat) => {
        // this.newBudget = res;
        this.spendCategory = cat;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  // userId: any = this.userDetails[0].id;

  baseUrl: string = 'http://localhost:8080/api/v1/budget';
  budgetAmount!: number;

  // console.log(this.userDetails[0].id);

  foodBudget: number = 0;
  transportBudget: number = 0;
  utilitiesBudget: number = 0;
  shoppingBudget: number = 0;
  entertainmentBudget: number = 0;
  housingBudget: number = 0;
  otherBudget: number = 0;

  

  // newBudget: SpendCategories = {
  //   food: this.foodBudget,
  //   transport: this.transportBudget,
  //   utilities: this.utilitiesBudget,
  //   shopping: this.shoppingBudget,
  //   entertainment: this.entertainmentBudget,
  //   housing: this.housingBudget,
  //   other: this.otherBudget,
  // }

  doToggle(category: String) {
    switch (category) {
      case 'Food': {
        this.isFoodShowing = !this.isFoodShowing;
        break;
      }
      case 'Transport': {
        this.isTransportShowing = !this.isTransportShowing;
        break;
      }
      case 'Entertainment': {
        this.isEntertainmentShowing = !this.isEntertainmentShowing;
        break;
      }
      case 'Shopping': {
        this.isShoppingShowing = !this.isShoppingShowing;
        break;
      }
      case 'Utilities': {
        this.isUtilitiesShowing = !this.isUtilitiesShowing;
        break;
      }
      case 'Housing': {
        this.isHousingShowing = !this.isHousingShowing;
        break;
      }
      case 'Other': {
        this.isOtherShowing = !this.isOtherShowing;
        break;
      }
      default: {
        break;
      }
    }
  }

  setBudget(category: String, amount: Number) {
    this.doToggle(category);

    let budget = {
      userId: this.userId,
      category: category,
      amount: amount,
    };

    console.log(budget);
    this.budgetService.addNewBudget(budget).subscribe(
      (res) => {
        console.log(res);
        this.budgetService.getAllBudget(this.userId).subscribe(
          (cat) => {
            console.log(res);
            // this.newBudget = res;
            this.spendCategory = cat;
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  isFoodShowing: boolean = true;
  isEntertainmentShowing: boolean = true;
  isTransportShowing: boolean = true;
  isShoppingShowing: boolean = true;
  isUtilitiesShowing: boolean = true;
  isHousingShowing: boolean = true;
  isOtherShowing: boolean = true;
}
