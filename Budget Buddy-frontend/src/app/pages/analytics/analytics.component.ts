import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  userDetails: any;
  dayOfMonthSpending!: number[];
  dayOfMonthSpendingLabels!: number[];
  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private sharedDataService: SharedDataService
  ) {}
  ngOnInit(): void {
    this.sharedDataService.userDetailsObservable.subscribe((res) => {
      this.userDetails = res;
    });
    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    this.getDayOfMonthSpending(
      this.userDetails[0]?.id,
      date
    );
  }

  ngAfterViewInit(): void {
    this.RenderDayOfMonthExpenseChart();
  }

  getDayOfMonthSpending(userId: number, date: String) {
    this.transactionService.getDayOfMonthSpending(userId, date).subscribe(
      (res: number[]) => {
        console.log(res);
        this.dayOfMonthSpending = res;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
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

  RenderDayOfMonthExpenseChart() {
    const ctx = document.getElementById('dayOfMonthSpend-chart');
    this.dayOfMonthSpendingLabels = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (let index = 1; index < this.dayOfMonthSpending?.length; index++) {
      this.dayOfMonthSpendingLabels.push(index);
    }
    
    console.log(this.dayOfMonthSpendingLabels);
    
    // const categoryLabels = Object.keys(this.dayOfMonthSpending);
    // const categoriesData = this.dayOfMonthSpending;
    // const data = categoriesArray.slice(1);

    const myChart = new Chart('dayOfMonthSpend-chart', {
      type: 'doughnut',
      data: {
        labels: this.dayOfMonthSpendingLabels,
        datasets: [
          {
            label: 'Spendings each day of this month',
            data: this.dayOfMonthSpending,
            backgroundColor: this.generateRandomColors(
              this.dayOfMonthSpending?.length
            ),
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });
  }
}
