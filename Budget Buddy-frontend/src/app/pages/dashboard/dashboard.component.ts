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
// import { Chart } from 'chart.js';

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

    this.getPresetTransactions();
    this.getPresetAverages();
    this.getFewTransactions();
    this.getMonthlyCategories();
  }

  ngAfterViewInit(): void {
    if(this.categories){
      this.renderCategoriesChart();
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
          this.renderCategoriesChart();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  renderCategoriesChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    // this.dayOfMonthSpendingLabels = Array.from({ length: this.dayOfMonthSpending.length }, (_, index) => `Day ${index + 1}`);

    this.categoriesData = {
      labels: this.categoriesLabels,
      datasets: [
        {
          data: this.categories,
          backgroundColor: this.generateRandomColors(
            7
          ),
          hoverBackgroundColor: this.generateRandomColors(
            7
          ),
        },
      ],
    };

    this.dayOfMonthOptions = {
      maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }

            }
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
