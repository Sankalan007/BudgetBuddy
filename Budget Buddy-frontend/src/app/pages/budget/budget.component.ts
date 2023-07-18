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
    console.log(budget);

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

  categorizeBudgets(budgets: Budget[]): CategorizedBudgets {
    budgets.forEach((budget) => {
      switch (budget.category) {
        case 'Food':
          this.categorizedBudgets.Food = budget.amount;
          break;
        case 'Transport':
          this.categorizedBudgets.Transport = budget.amount;
          break;
        case 'Entertainment':
          this.categorizedBudgets.Entertainment = budget.amount;
          break;
        case 'Shopping':
          this.categorizedBudgets.Shopping = budget.amount;
          break;
        case 'Utilities':
          this.categorizedBudgets.Utilities = budget.amount;
          break;
        case 'Housing':
          this.categorizedBudgets.Housing = budget.amount;
          break;
        default:
          this.categorizedBudgets.Other = budget.amount;
          break;
      }
    });

    return this.categorizedBudgets;
  }
}
