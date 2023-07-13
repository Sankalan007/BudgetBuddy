import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import PresetAverages from 'src/app/model/PresetAverages';
import PresetTransactions from 'src/app/model/PresetTransactions';
import SpendCategories  from 'src/app/model/SpendCategories';
import Transaction from 'src/app/model/Transaction';
import User from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  presetTransactions!: PresetTransactions;
  presetAverages!: PresetAverages;
  userDetails!: any;
  userDetailsSet = false;
  transactions!: Transaction[];
  categories: SpendCategories = {
    food: 0,
    transport: 0,
    entertainment: 0,
    shopping: 0,
    utilities: 0,
    housing: 0,
    other: 0,
  };
  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    // console.log(localStorage.getItem('token'));
    this.sharedDataService.userDetailsObservable.subscribe((res) => {
      this.userDetails = res;
    });

    this.getPresetTransactions();
    this.getPresetAverages();
    this.getFewTransactions();
    this.getMonthlyCategories();
  }

  ngAfterViewInit(): void {
    this.RenderChart();
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

  RenderChart() {
    const ctx = document.getElementById('PieChart');
    const categoryLabels = Object.keys(this.categories);
    const categoriesData = Object.values(this.categories);
    // const data = categoriesArray.slice(1);

    const myChart = new Chart('pie-chart', {
      type: 'doughnut',
      data: {
        labels: categoryLabels,
        datasets: [
          {
            label: 'monthly spend categories',
            data: categoriesData,
            backgroundColor: this.generateRandomColors(categoriesData.length),
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });
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

  getMonthlyCategories() {
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    this.transactionService
      .getMonthlyCategories(this.userDetails[0].id, date)
      .subscribe(
        (res: SpendCategories) => {
          this.categories = res;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
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
