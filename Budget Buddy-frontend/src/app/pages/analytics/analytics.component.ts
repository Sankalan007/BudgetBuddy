import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  dayOfMonthData: any;
  dayOfMonthOptions: any;
  dayOfMonthSpending!: number[];
  dayOfMonthSpendingLabels!: string[];

  monthOfYearData: any;
  monthOfYearOptions: any;
  monthOfYearSpending!: number[];
  monthOfYearSpendingLabels!: string[];


  userDetails: any;

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

    this.getDayOfMonthSpending(this.userDetails[0]?.id, date);
    this.getMonthOfYearSpending(this.userDetails[0]?.id, date);
  }

  ngAfterViewInit(): void {
    if (this.dayOfMonthSpending) {
      this.renderDayOfMonthSpedingChart();
    }
    if (this.monthOfYearSpending) {
      this.renderMonthOfYearSpedingChart();
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

  getDayOfMonthSpending(userId: number, date: string) {
    this.transactionService.getDayOfMonthSpending(userId, date).subscribe(
      (res: number[]) => {
        console.log(res);
        this.dayOfMonthSpending = res;
        this.renderDayOfMonthSpedingChart();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  renderDayOfMonthSpedingChart() {
    this.dayOfMonthSpendingLabels = Array.from({ length: this.dayOfMonthSpending.length }, (_, index) => `Day ${index + 1}`);

    this.dayOfMonthData = {
      labels: this.dayOfMonthSpendingLabels,
      datasets: [
        {
          data: this.dayOfMonthSpending,
          backgroundColor: this.generateRandomColors(
            this.dayOfMonthSpending.length
          ),
          hoverBackgroundColor: this.generateRandomColors(
            this.dayOfMonthSpending.length
          ),
        },
      ],
    };

    this.dayOfMonthOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: '#008080',
          },
        },
      },
    };
  }


  getMonthOfYearSpending(userId: number, date: string) {
    this.transactionService.getMonthOfYearSpending(userId, date).subscribe(
      (res: number[]) => {
        console.log(res);
        this.monthOfYearSpending = res;
        this.renderMonthOfYearSpedingChart();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  renderMonthOfYearSpedingChart() {
    this.monthOfYearSpendingLabels = Array.from({ length: this.monthOfYearSpending.length }, (_, index) => `Day ${index + 1}`);

    this.monthOfYearData = {
      labels: this.monthOfYearSpendingLabels,
      datasets: [
        {
          data: this.monthOfYearSpending,
          backgroundColor: this.generateRandomColors(
            this.monthOfYearSpending.length
          ),
          hoverBackgroundColor: this.generateRandomColors(
            this.monthOfYearSpending.length
          ),
        },
      ],
    };

    this.monthOfYearOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: '#008080',
          },
        },
      },
    };
  }

  
}
