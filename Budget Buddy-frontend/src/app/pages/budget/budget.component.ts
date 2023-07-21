import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';
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
    private transactionServices: TransactionService,
    private toast: ToastrService
  ) {}
  userDetails!: any;
  userId!: number;
  ngOnInit(): void {
    this.sharedDataService.userDetailsObservable.subscribe((res) => {
      this.userDetails = res;
      // console.log(this.userDetails);
      this.userId = this.userDetails[0]?.id;
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

  foodBudget!: number;
  transportBudget!: number;
  utilitiesBudget!: number;
  shoppingBudget!: number;
  entertainmentBudget!: number;
  housingBudget!: number;
  otherBudget!: number;
  updatedFoodBudget!: number;
  updatedTransportBudget!: number;
  updatedUtilitiesBudget!: number;
  updatedShoppingBudget!: number;
  updatedEntertainmentBudget!: number;
  updatedHousingBudget!: number;
  updatedOtherBudget!: number;

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
        this.isFoodGreater = false;
        this.isFoodUpdateShowing = !this.isFoodUpdateShowing;
        break;
      }
      case 'Transport': {
        this.isTransportGreater = false;

        this.isTransportUpdateShowing = !this.isTransportUpdateShowing;
        break;
      }
      case 'Entertainment': {
        this.isEntertainmentGreater = false;
        this.isEntertainmentUpdateShowing = !this.isEntertainmentUpdateShowing;
        break;
      }
      case 'Shopping': {
        this.isShoppingGreater = false;

        this.isShoppingUpdateShowing = !this.isShoppingUpdateShowing;
        break;
      }
      case 'Utilities': {
        this.isUtilitiesGreater = false;

        this.isUtilitiesUpdateShowing = !this.isUtilitiesUpdateShowing;
        break;
      }
      case 'Housing': {
        this.isHousingGreater = false;

        this.isHousingUpdateShowing = !this.isHousingUpdateShowing;
        break;
      }
      case 'Other': {
        this.isOtherGreater = false;

        this.isOtherUpdateShowing = !this.isOtherUpdateShowing;
        break;
      }
      default: {
        break;
      }
    }
  }

  setBudget(category: string, amount: Number, fieldId: string) {
    if (amount < this.getBudgetAmount(category) || amount == null) {
      this.addRed(fieldId, category);
      // const inputElement = document.getElementById(fieldId) as HTMLInputElement;
      // inputElement.classList.remove('animate-shake');

      return;
    }

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

  getBudgetAmount(category: String) {
    switch (category) {
      case 'Food': {
        return this.spendCategory.food;
        break;
      }
      case 'Transport': {
        return this.spendCategory.transport;

        break;
      }
      case 'Entertainment': {
        return this.spendCategory.entertainment;
        break;
      }
      case 'Shopping': {
        return this.spendCategory.shopping;
        break;
      }
      case 'Utilities': {
        return this.spendCategory.utilities;
        break;
      }
      case 'Housing': {
        return this.spendCategory.housing;
        break;
      }
      case 'Other': {
        return this.spendCategory.other;
        break;
      }
      default: {
        return '';

        break;
      }
    }
  }

  isFoodGreater: boolean = false;
  isTransportGreater: boolean = false;
  isEntertainmentGreater: boolean = false;
  isShoppingGreater: boolean = false;
  isHousingGreater: boolean = false;
  isUtilitiesGreater: boolean = false;
  isOtherGreater: boolean = false;

  updateBudget(category: string, amount: Number, fieldId: string) {
    const inputElement = document.getElementById(fieldId) as HTMLInputElement;
    inputElement.classList.remove('animate-shake');
    if (amount < this.getBudgetAmount(category) || amount == null) {
      this.addRed(fieldId, category);
      return;
    }

    this.doToggle(category);

    let budget = {
      userId: this.userId,
      category: category,
      amount: amount,
    };
    this.budgetService.addNewBudget(budget).subscribe(
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
      .getMonthlyCategoriesSpending(this.userId, date)
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
        if (this.budgetCategory.food == null) {
          return 0;
        }
        return (
          ((this.budgetCategory.food - this.spendCategory.food) /
            this.budgetCategory.food) *
          100
        ).toFixed(2);
        break;
      }
      case 'Transport': {
        if (this.budgetCategory.transport == null) {
          return 0;
        }

        return (
          ((this.budgetCategory.transport - this.spendCategory.transport) /
            this.budgetCategory.transport) *
          100
        ).toFixed(2);

        break;
      }
      case 'Entertainment': {
        if (this.budgetCategory.entertainment == null) {
          return 0;
        }

        return (
          ((this.budgetCategory.entertainment -
            this.spendCategory.entertainment) /
            this.budgetCategory.entertainment) *
          100
        ).toFixed(2);
        break;
      }
      case 'Shopping': {
        if (this.budgetCategory.shopping == null) {
          return 0;
        }
        return (
          ((this.budgetCategory.shopping - this.spendCategory.shopping) /
            this.budgetCategory.shopping) *
          100
        ).toFixed(2);
        break;
      }
      case 'Utilities': {
        if (this.budgetCategory.utilities == null) {
          return 0;
        }
        return (
          ((this.budgetCategory.utilities - this.spendCategory.utilities) /
            this.budgetCategory.utilities) *
          100
        ).toFixed(2);
        break;
      }
      case 'Housing': {
        if (this.budgetCategory.housing == null) {
          return 0;
        }
        return (
          ((this.budgetCategory.housing - this.spendCategory.housing) /
            this.budgetCategory.housing) *
          100
        ).toFixed(2);
        break;
      }
      case 'Other': {
        if (this.budgetCategory.other == null) {
          return 0;
        }
        // console.log(this.spendCategory.other);
        return (
          ((this.budgetCategory.other - this.spendCategory.other) /
            this.budgetCategory.other) *
          100
        ).toFixed(2);
        break;
      }
      default: {
        break;
      }
    }
  }

  getColor(category: String) {
    let progress: number = this.updateProgressBar(category);
    if (progress > 66) {
      return '#FFFF';
    } else if (progress > 33 && progress < 66) {
      return '#D1D435';
    } else {
      return '#FF0000';
    }
  }
  deleteBudget(category: String) {
    switch (category) {
      case 'Food': {
        this.budgetCategory.food = null;
        break;
      }
      case 'Transport': {
        this.budgetCategory.transport = null;
        break;
      }
      case 'Entertainment': {
        this.budgetCategory.entertainment = null;
        break;
      }
      case 'Shopping': {
        this.budgetCategory.shopping = null;
        break;
      }
      case 'Utilities': {
        this.budgetCategory.utilities = null;
        break;
      }
      case 'Housing': {
        this.budgetCategory.housing = null;
        break;
      }
      case 'Other': {
        this.budgetCategory.other = null;
        break;
      }
      default: {
        break;
      }
    }
  }

  addRed(id: string, category: string) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement.classList.add('shadow-alert', 'animate-shake');

    switch (category) {
      case 'Food': {
        this.isFoodGreater = true;
        this.toast.warning(
          `Set budget of ${category} is lower than the spent value`,
          'Change your budget'
        );
        break;
      }
      case 'Transport': {
        this.isTransportGreater = true;
        this.toast.warning(
          `Set budget of ${category} is lower than the spent value`,
          'Change your budget'
        );
        break;
      }
      case 'Entertainment': {
        this.isEntertainmentGreater = true;
        this.toast.warning(
          `Set budget of ${category} is lower than the spent value`,
          'Change your budget'
        );
        break;
      }
      case 'Shopping': {
        this.isShoppingGreater = true;
        this.toast.warning(
          `Set budget of ${category} is lower than the spent value`,
          'Change your budget'
        );
        break;
      }
      case 'Utilities': {
        this.isUtilitiesGreater = true;
        this.toast.warning(
          `Set budget of ${category} is lower than the spent value`,
          'Change your budget'
        );
        break;
      }
      case 'Housing': {
        this.isHousingGreater = true;
        this.toast.warning(
          `Set budget of ${category} is lower than the spent value`,
          'Change your budget'
        );
        break;
      }
      case 'Other': {
        this.isOtherGreater = true;
        this.toast.warning(
          `Set budget of ${category} is lower than the spent value`,
          'Change your budget'
        );
        break;
      }
      default: {
        break;
      }
    }
  }
}
