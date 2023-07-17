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
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  // foodBudget!: number;

  budgetCategory: SpendCategories = {
    food: null,
    transport: null,
    utilities: null,
    shopping: null,
    entertainment: null,
    housing: null,
    other: null,
  };

  spendCategory: SpendCategories = {
    food: null,
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
    private http: HttpClient,
    private transactionServices: TransactionService
  ) {}
  userDetails!: any;
  userId!: number;
  ngOnInit(): void {
    this.sharedDataService.userDetailsObservable.subscribe((res) => {
      this.userDetails = res;
      // console.log(this.userDetails);
      this.userId = this.userDetails[0].id;
    });
    this.budgetService.getAllBudget(this.userDetails[0].id).subscribe(
      (cat) => {
        // this.newBudget = res;
        this.budgetCategory = cat;
      },
      (error: HttpErrorResponse) => {
        // console.log(error);
      }
    );
    this.getCategories();
  }
  // userId: any = this.userDetails[0].id;

  baseUrl: string = 'http://localhost:8080/api/v1/budget';
  budgetAmount!: number;

  // // console.log(this.userDetails[0].id);

  foodBudget: number = 0;
  transportBudget: number = 0;
  utilitiesBudget: number = 0;
  shoppingBudget: number = 0;
  entertainmentBudget: number = 0;
  housingBudget: number = 0;
  otherBudget: number = 0;

  updatedFoodBudget: number = 0;
  updatedTransportBudget: number = 0;
  updatedUtilitiesBudget: number = 0;
  updatedShoppingBudget: number = 0;
  updatedEntertainmentBudget: number = 0;
  updatedHousingBudget: number = 0;
  updatedOtherBudget: number = 0;

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
        this.isFoodUpdateShowing = !this.isFoodUpdateShowing;
        break;
      }
      case 'Transport': {
        this.isTransportUpdateShowing = !this.isTransportUpdateShowing;
        break;
      }
      case 'Entertainment': {
        this.isEntertainmentUpdateShowing = !this.isEntertainmentUpdateShowing;
        break;
      }
      case 'Shopping': {
        this.isShoppingUpdateShowing = !this.isShoppingUpdateShowing;
        break;
      }
      case 'Utilities': {
        this.isUtilitiesUpdateShowing = !this.isUtilitiesUpdateShowing;
        break;
      }
      case 'Housing': {
        this.isHousingUpdateShowing = !this.isHousingUpdateShowing;
        break;
      }
      case 'Other': {
        this.isOtherUpdateShowing = !this.isOtherUpdateShowing;
        break;
      }
      default: {
        break;
      }
    }
  }

  setBudget(category: String, amount: Number) {
    //  this.doToggle(category);

    let budget = {
      userId: this.userId,
      category: category,
      amount: amount,
    };

    // console.log(budget);
    this.budgetService.addNewBudget(budget).subscribe(
      (res) => {
        // console.log(res);
        this.budgetService.getAllBudget(this.userId).subscribe(
          (cat) => {
            // console.log(res);
            // this.newBudget = res;
            this.budgetCategory = cat;
          },
          (error: HttpErrorResponse) => {
            // console.log(error);
          }
        );
      },
      (error: HttpErrorResponse) => {
        // console.log(error);
      }
    );
  }

  updateBudget(category: String, amount: Number) {
    this.doToggle(category);

    // console.log('Clicked');

    //this.spendCategory.food = null

    let budget = {
      userId: this.userId,
      category: category,
      amount: amount,
    };
    this.budgetService.updateThisBudget(this.userId, budget).subscribe(
      (res) => {
        // console.log(res);
        this.budgetService.getAllBudget(this.userId).subscribe(
          (cat) => {
            // console.log(cat);
            // this.newBudget = res;
            this.budgetCategory = cat;
          },
          (error: HttpErrorResponse) => {
            // console.log(error);
          }
        );
      },
      (error: HttpErrorResponse) => {
        // console.log(error);
      }
    );
  }

  isFoodUpdateShowing: boolean = false;
  isEntertainmentUpdateShowing: boolean = false;
  isTransportUpdateShowing: boolean = false;
  isShoppingUpdateShowing: boolean = false;
  isUtilitiesUpdateShowing: boolean = false;
  isHousingUpdateShowing: boolean = false;
  isOtherUpdateShowing: boolean = false;

  getCategories() {
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    this.transactionServices
      .getMonthlyCategories(this.userId, date)
      .subscribe((res) => {
        // console.log(res);
        this.spendCategory = res;
      });
  }

  updateProgressBar(category: String): any {
    // // console.log(this.spendCategory);
    // // console.log(this.budgetCategory);
    
    switch (category) {
      case 'Food': {
        return (((this.budgetCategory.food - this.spendCategory.food)/this.budgetCategory.food)*100).toFixed(2);
        break;
      }
      case 'Transport': {
        return (((this.budgetCategory.transport - this.spendCategory.transport)/this.budgetCategory.transport)*100).toFixed(2);
        break;
      }
      case 'Entertainment': {
        return (((this.budgetCategory.entertainment - this.spendCategory.entertainment)/this.budgetCategory.entertainment)*100).toFixed(2);
        break;
      }
      case 'Shopping': {
        return (((this.budgetCategory.shopping - this.spendCategory.shopping)/this.budgetCategory.shopping)*100).toFixed(2);
        break;
      }
      case 'Utilities': {
        return (((this.budgetCategory.utilities - this.spendCategory.utilities)/this.budgetCategory.utilities)*100).toFixed(2);
        break;
      }
      case 'Housing': {
        return (((this.budgetCategory.housing - this.spendCategory.housing)/this.budgetCategory.housing)*100).toFixed(2);
        break;
      }
      case 'Other': {
        return (((this.budgetCategory.other - this.spendCategory.other)/this.budgetCategory.other)*100).toFixed(2);
        break;
      }
      default: {
        break;
      }
    }
  }

  getColor(category:String){
    let progress: number = this.updateProgressBar(category);
    
    if(progress>66 ){
      return "#FFFF";
    }
    else if(progress>33 && progress <66){
      return "#FFFF00";
    }
    else{
      return "#FF0000";
    }
  }

  deleteBudget(category:String){
    switch (category) {
      case 'Food': {
        this.budgetCategory.food=null;
        break;
      }
      case 'Transport': {
        this.budgetCategory.transport=null;
        break;
      }
      case 'Entertainment': {
        this.budgetCategory.entertainment=null;
        break;
      }
      case 'Shopping': {
        this.budgetCategory.shopping=null;
        break;
      }
      case 'Utilities': {
        this.budgetCategory.utilities=null;
        break;
      }
      case 'Housing': {
        this.budgetCategory.housing=null;
        break;
      }
      case 'Other': {
        this.budgetCategory.other=null;
        break;
      }
      default: {
        break;
      }
    }
  }
}
