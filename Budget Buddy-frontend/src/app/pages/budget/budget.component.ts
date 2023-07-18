import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import Budget from "src/app/model/Buget";
import CategorizedBudgets from "src/app/model/CategorizedBudgets";
import SpendCategories from "src/app/model/SpendCategories";
import User from "src/app/model/User";
import { BudgetService } from "src/app/services/budget/budget.service";
import { SharedDataService } from "src/app/services/sharedData/shared-data.service";
import { TransactionService } from "src/app/services/transaction/transaction.service";

@Component({
  selector: 'app-budgets',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  categoryDivision!: SpendCategories;
  userDetails!: any;
  budgets!: SpendCategories;
  newBudgets!: SpendCategories;
  categorizedBudgets!: CategorizedBudgets;
  constructor(
    private transactionService: TransactionService,
    private sharedDataService: SharedDataService,
    private budgetService: BudgetService
  ) {}
  ngOnInit(): void {
    this.sharedDataService.userDetailsObservable.subscribe((res) => {
      this.userDetails = res;
    });
    this.budgets = {
      food: 0,
      transport: 0,
      entertainment: 0,
      utilities: 0,
      shopping: 0,
      housing: 0,
      other: 0,
    };
    this.newBudgets = {
      food: 0,
      transport: 0,
      entertainment: 0,
      utilities: 0,
      shopping: 0,
      housing: 0,
      other: 0,
    };

    this.getMonthlyCategories();
    this.getAllBudgets();
    // this.categorizeBudgets(this.budgets);
  }

  getMonthlyCategories() {
    const userId = this.userDetails[0].id;
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    this.transactionService.getMonthlyCategoriesSpending(userId, date).subscribe(
      (res: SpendCategories) => {
        this.categoryDivision = res;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  getAllBudgets() {
    this.budgetService.getAllBudget(this.userDetails[0].id).subscribe(
      (res: SpendCategories) => {
        this.budgets = res;
        console.log(res);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addBudget(category: string, amount: number) {
    console.log('Inside addBudget');
    const userId = this.userDetails[0].id;
    const budget: Budget = {
      
      userId: userId,
      category: category,
      amount: amount,
    };

    this.budgetService.addNewBudget(budget).subscribe(
      (res) => {
        console.log(res);
        this.getAllBudgets();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
        console.log(res);
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
        //console.log(this.spendCategory.transport);

        //console.log((((this.budgetCategory.transport - this.spendCategory.transport)/this.budgetCategory.transport)*100).toFixed(2));
        return (((this.budgetCategory.transport - this.spendCategory.transport)/this.budgetCategory.transport)*100).toFixed(2);
        break;
      }
      case 'Entertainment': {
       // console.log(this.spendCategory.entertainment)
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
       // console.log(this.spendCategory.other);
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
      return "#d1d435";
    }
    else{
      return "#FF0000";
    }
  }


    return this.categorizedBudgets;
  }
}
