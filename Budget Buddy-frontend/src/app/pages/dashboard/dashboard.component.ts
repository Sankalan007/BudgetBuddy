import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Chart } from 'chart.js';
import EarnCategories from 'src/app/model/EarnCategories';

import PresetAverages from 'src/app/model/PresetAverages';
import PresetTransactions from 'src/app/model/PresetTransactions';
import SpendCategories from 'src/app/model/SpendCategories';
import Transaction from 'src/app/model/Transaction';
import User from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  dayOfMonthData: any;
  dayOfMonthOptions: any;
  dayOfMonthSpending!: number[];
  dayOfMonthSpendingLabels!: number[];

  categoriesData: any;
  categoriesOptions: any;
  categories: any;
  categoriesLabels!: any;

  monthlyCategoriesSpendingsData: any;
  monthlyCategoriesSpendingsOptions: any;
  monthlyCategoriesSpendings!: SpendCategories;
  monthlyCategoriesSpendingsLabels!: string[];

  monthlyCategoriesEarningsData: any;
  monthlyCategoriesEarningsOptions: any;
  monthlyCategoriesEarnings!: EarnCategories;
  monthlyCategoriesEarningsLabels!: string[];

  presetTransactions!: PresetTransactions;
  presetAverages!: PresetAverages;
  userDetails!: any;
  userDetailsSet = false;
  transactions!: Transaction[];

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.sharedDataService.userDetailsObservable.subscribe((res) => {
      this.userDetails = res;
    });
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    this.getPresetTransactions();
    this.getPresetAverages();
    this.getFewTransactions();
    this.getMonthlyCategoriesSpending(this.userDetails[0].id, date);
    this.getMonthlyCategoriesEarning(this.userDetails[0].id, date);

  }

  ngAfterViewInit(): void {
    if (this.monthlyCategoriesSpendings) {
      this.renderMonthlyCategoriesSpendingChart();
    }
    if (this.monthlyCategoriesEarnings) {
      this.renderMonthlyCategoriesEarningChart();
    }
  }

  generateRandomColors(numColors: number) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.2)`;
      colors.push(color);
    }
    return colors;
  }

  formatTime(time: string) {
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }
    return `${hour}:${minutes} ${suffix}`;
  }

  getMonthlyCategoriesSpending(userId: number, date: string) {
    this.transactionService
      .getMonthlyCategoriesSpending(userId, date)
      .subscribe(
        (res: SpendCategories) => {
          // console.log(res);
          this.monthlyCategoriesSpendings = res;
          this.renderMonthlyCategoriesSpendingChart();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  renderMonthlyCategoriesSpendingChart() {
    this.monthlyCategoriesSpendingsData = {
      labels: [
        'Food',
        'Transport',
        'Entertainment',
        'Shopping',
        'Utilities',
        'Housing',
        'Other',
      ],
      datasets: [
        {
          label: 'Monthly categories spending',
          data: Object.values(this.monthlyCategoriesSpendings),
          backgroundColor: this.generateRandomColors(7),
          hoverBackgroundColor: this.generateRandomColors(7),
        },
      ],
    };

    this.monthlyCategoriesSpendingsOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#008080',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#008080',
            font: {
              weight: 500,
            },
          },
          grid: {
            color: '#808080',
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: '#008080',
          },
          grid: {
            color: '#808080',
            drawBorder: false,
          },
        },
      },
    };
  }

  getMonthlyCategoriesEarning(userId: number, date: string) {
    this.transactionService.getMonthlyCategoriesEarning(userId, date).subscribe(
      (res: EarnCategories) => {
        // console.log(res);
        this.monthlyCategoriesEarnings = res;
        this.renderMonthlyCategoriesEarningChart();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  renderMonthlyCategoriesEarningChart() {
    this.monthlyCategoriesEarningsData = {
      labels: [
        'Salary',
        'Business',
        'Entertainment',
        'Shopping',
        'Utilities',
        'Housing',
        'Other',
      ],
      datasets: [
        {
          label: 'Monthly categories earning',
          data: Object.values(this.monthlyCategoriesEarnings),
          backgroundColor: this.generateRandomColors(7),
          hoverBackgroundColor: this.generateRandomColors(7),
        },
      ],
    };

    this.monthlyCategoriesEarningsOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#008080',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#008080',
            font: {
              weight: 500,
            },
          },
          grid: {
            color: '#000000',
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: '#008080',
          },
          grid: {
            color: '#000000',
            drawBorder: false,
          },
        },
      },
    };
  }
  getPresetTransactions() {
    const userId = this.userDetails[0].id;
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    if (userId != null || userId != undefined) {
      this.transactionService.getPresetTransactions(userId, date).subscribe(
        (res: PresetTransactions) => {
          this.presetTransactions = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  getPresetAverages() {
    const userId = this.userDetails[0].id;
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    if (userId != null || userId != undefined) {
      this.transactionService.getPresetAverages(userId, date).subscribe(
        (res: PresetAverages) => {
          this.presetAverages = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  getFewTransactions() {
    this.transactionService
      .findAllTransactionsByCreatedDesc(this.userDetails[0].id)
      .subscribe(
        (res) => {
          this.transactions = res.slice(0, 3);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
}
