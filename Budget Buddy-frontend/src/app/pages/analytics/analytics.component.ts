import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ISmoothScrollOption,
  SmoothScrollService,
} from '@boatzako/ngx-smooth-scroll';
import EarnCategories from 'src/app/model/EarnCategories';
import Insights from 'src/app/model/Insights';
import SpendCategories from 'src/app/model/SpendCategories';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import AOS from 'aos';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  @ViewChild('goToInsights') goToInsights: ElementRef;
  @ViewChild('allInsights') allInsights: ElementRef;

  @ViewChild('content', { static: false }) content!: ElementRef;
  @ViewChild('page1', { static: false }) page1!: ElementRef;
  @ViewChild('page2', { static: false }) page2!: ElementRef;
  @ViewChild('page3', { static: false }) page3!: ElementRef;

  monthList: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  insights!: Insights;

  monthlyCategoriesSpendingsData: any;
  monthlyCategoriesSpendingsOptions: any;
  monthlyCategoriesSpendings!: SpendCategories;
  monthlyCategoriesSpendingsLabels!: string[];

  monthlyCategoriesEarningsData: any;
  monthlyCategoriesEarningsOptions: any;
  monthlyCategoriesEarnings!: EarnCategories;
  monthlyCategoriesEarningsLabels!: string[];

  monthlySpendingsAndEarningsData: any;
  monthlySpendingsAndEarningsOptions: any;
  monthlySpendingsAndEarningsLabels!: string[];

  annualSpendingsAndEarningsData: any;
  annualSpendingsAndEarningsOptions: any;
  annualSpendingsAndEarningsLabels!: string[];

  dayOfMonthSpendingData: any;
  dayOfMonthSpendingOptions: any;
  dayOfMonthSpending!: number[];
  dayOfMonthSpendingLabels!: string[];

  monthOfYearSpendingData: any;
  monthOfYearSpendingOptions: any;
  monthOfYearSpending!: number[];
  monthOfYearSpendingLabels!: string[];

  dayOfLastSevenDaysSpendingData: any;
  dayOfLastSevenDaysSpendingOptions: any;
  dayOfLastSevenDaysSpending!: number[];
  dayOfLastSevenDaysSpendingLabels!: string[];

  dayOfMonthEarningData: any;
  dayOfMonthEarningOptions: any;
  dayOfMonthEarning!: number[];
  dayOfMonthEarningLabels!: string[];

  monthOfYearEarningData: any;
  monthOfYearEarningOptions: any;
  monthOfYearEarning!: number[];
  monthOfYearEarningLabels!: string[];

  dayOfLastSevenDaysEarningData: any;
  dayOfLastSevenDaysEarningOptions: any;
  dayOfLastSevenDaysEarning!: number[];
  dayOfLastSevenDaysEarningLabels!: string[];

  userDetails: any;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private smooth: SmoothScrollService
  ) {}

  ngOnInit(): void {
    this.smooth.smoothScrollToAnchor();
    AOS.init();

    this.sharedDataService.userDetailsObservable.subscribe((res) => {
      this.userDetails = res;
    });

    const today = new Date();
    const date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    this.getInsights(this.userDetails[0]?.id, date);
    this.getMonthlyCategoriesSpending(this.userDetails[0]?.id, date);
    this.getMonthlyCategoriesEarning(this.userDetails[0]?.id, date);
    this.getDayOfMonthSpending(this.userDetails[0]?.id, date);
    this.getMonthOfYearSpending(this.userDetails[0]?.id, date);
    this.getDayOfLastSevenDaysSpending(this.userDetails[0]?.id, date);
    this.getDayOfMonthEarning(this.userDetails[0].id, date);
    this.getMonthOfYearEarning(this.userDetails[0]?.id, date);
    this.getDayOfLastSevenDaysEarning(this.userDetails[0]?.id, date);
  }

  ngAfterViewInit(): void {
    if (this.monthlyCategoriesSpendings) {
      this.renderMonthlyCategoriesSpendingChart();
    }
    if (this.monthlyCategoriesEarnings) {
      this.renderMonthlyCategoriesEarningChart();
    }
    if (this.dayOfMonthEarning && this.dayOfMonthSpending) {
      this.renderMonthlySpendingsAndEarningsChart();
    }
    if (this.monthOfYearEarning && this.monthOfYearSpending) {
      this.renderAnnualSpendingsAndEarningsChart();
    }
    if (this.dayOfMonthSpending) {
      this.renderDayOfMonthSpendingChart();
    }
    if (this.monthOfYearSpending) {
      this.renderMonthOfYearSpendingChart();
    }
    if (this.dayOfLastSevenDaysSpending) {
      this.renderDayOfLastSevenDaysSpendingChart();
    }
    if (this.dayOfMonthEarning) {
      this.renderDayOfMonthEarningChart();
    }
    if (this.monthOfYearEarning) {
      this.renderMonthOfYearEarningChart();
    }
    if (this.dayOfLastSevenDaysEarning) {
      this.renderDayOfLastSevenDaysEarningChart();
    }
  }

  formatMonth(month: number): string {
    return this.monthList[month - 1];
  }

  goTop() {
    this.smooth.smoothScrollToTop({ duration: 1000, easing: 'linear' });
  }

  moveToInsights() {
    let opt: ISmoothScrollOption = { duration: 1000, easing: 'linear' };
    this.smooth.smoothScroll(2000, opt, this.goToInsights.nativeElement);
    this.smooth.smoothScroll(2000, opt, this.allInsights.nativeElement);
  }

  generatePDF() {
    const doc = new jsPDF('p');
    const page1 = this.page1.nativeElement;
    const page2 = this.page2.nativeElement;
    const page3 = this.page3.nativeElement;

    const wholePage = this.content.nativeElement;
    const divToHide = wholePage.querySelector('.buttons');

    if (divToHide) {
      divToHide.style.display = 'none';
    }

    const fullHeightPage1 = page1.scrollHeight;
    const fullHeightPage2 = page2.scrollHeight;
    const fullHeightPage3 = page3.scrollHeight;

    Promise.all([
      html2canvas(page1, { height: fullHeightPage1 }),
      html2canvas(page2, { height: fullHeightPage2 }),
      html2canvas(page3, { height: fullHeightPage3 }),
    ]).then(([canvas1, canvas2, canvas3]) => {
      const imgData1 = canvas1.toDataURL('image/png');
      const imgData2 = canvas2.toDataURL('image/png');
      const imgData3 = canvas3.toDataURL('image/png');

      const imgProps1 = doc.getImageProperties(imgData1);
      const imgProps2 = doc.getImageProperties(imgData2);
      const imgProps3 = doc.getImageProperties(imgData3);

      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight1 = (imgProps1.height * pdfWidth) / imgProps1.width;
      const pdfHeight2 = (imgProps2.height * pdfWidth) / imgProps2.width;
      const pdfHeight3 = (imgProps3.height * pdfWidth) / imgProps3.width;

      doc.addImage(imgData1, 'PNG', 0, 0, pdfWidth, pdfHeight1);

      doc.addPage();
      doc.addImage(imgData2, 'PNG', 0, 0, pdfWidth, pdfHeight2);

      doc.addPage();
      doc.addImage(imgData3, 'PNG', 0, 0, pdfWidth, pdfHeight3);

      doc.save('demo.pdf');
    });
    if (divToHide) {
      divToHide.style.display = 'flex';
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

  getInsights(userId: number, date: string) {
    this.transactionService.getInsights(userId, date).subscribe(
      (res: Insights) => {
        this.insights = res;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
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

  renderMonthlySpendingsAndEarningsChart() {
    this.monthlySpendingsAndEarningsLabels = Array.from(
      { length: this.dayOfMonthSpending.length },
      (_, index) => `Day ${index + 1}`
    );

    this.monthlySpendingsAndEarningsData = {
      labels: this.monthlySpendingsAndEarningsLabels,
      datasets: [
        {
          label: 'Earnings',
          data: this.dayOfMonthEarning,
          fill: false,
          borderColor: '#008080',
          tension: 0.4,
        },
        {
          label: 'Spendings',
          data: this.dayOfMonthSpending,
          fill: false,
          borderColor: '#000000',
          tension: 0.4,
        },
      ],
    };

    this.monthlySpendingsAndEarningsOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
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
            color: '#808080',
          },
          grid: {
            color: '#C0C0C0',
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: '#808080',
          },
          grid: {
            color: '#C0C0C0',
            drawBorder: false,
          },
        },
      },
    };
  }

  renderAnnualSpendingsAndEarningsChart() {
    this.annualSpendingsAndEarningsLabels = Array.from(
      { length: this.monthOfYearSpending.length },
      (_, index) => this.formatMonth(index)
    );

    this.annualSpendingsAndEarningsData = {
      labels: this.annualSpendingsAndEarningsLabels,
      datasets: [
        {
          label: 'Earnings',
          data: this.monthOfYearEarning,
          fill: false,
          borderColor: '#008080',
          tension: 0.4,
        },
        {
          label: 'Spendings',
          data: this.monthOfYearSpending,
          fill: false,
          borderColor: '#000000',
          tension: 0.4,
        },
      ],
    };

    this.annualSpendingsAndEarningsOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
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
            color: '#808080',
          },
          grid: {
            color: '#C0C0C0',
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: '#808080',
          },
          grid: {
            color: '#C0C0C0',
            drawBorder: false,
          },
        },
      },
    };
  }

  getDayOfMonthSpending(userId: number, date: string) {
    this.transactionService.getDayOfMonthSpending(userId, date).subscribe(
      (res: number[]) => {
        // console.log(res);
        this.dayOfMonthSpending = res;
        this.renderDayOfMonthSpendingChart();
        this.renderMonthlySpendingsAndEarningsChart();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  renderDayOfMonthSpendingChart() {
    this.dayOfMonthSpendingLabels = Array.from(
      { length: this.dayOfMonthSpending.length },
      (_, index) => `Day ${index + 1}`
    );

    this.dayOfMonthSpendingData = {
      labels: this.dayOfMonthSpendingLabels,
      datasets: [
        {
          label: 'Spending in each day of month',
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

    this.dayOfMonthSpendingOptions = {
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
        // console.log(res);
        this.monthOfYearSpending = res;
        this.renderMonthOfYearSpendingChart();
        this.renderAnnualSpendingsAndEarningsChart();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  renderMonthOfYearSpendingChart() {
    this.monthOfYearSpendingLabels = Array.from(
      { length: this.monthOfYearSpending.length },
      (_, index) => this.formatMonth(index + 1)
    );

    this.monthOfYearSpendingData = {
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

    this.monthOfYearSpendingOptions = {
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

  getDayOfLastSevenDaysSpending(userId: number, date: string) {
    this.transactionService
      .getDayOfLastSevenDaysSpending(userId, date)
      .subscribe(
        (res: number[]) => {
          // console.log(res);
          this.dayOfLastSevenDaysSpending = res;
          this.renderDayOfLastSevenDaysSpendingChart();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  renderDayOfLastSevenDaysSpendingChart() {
    this.dayOfLastSevenDaysSpendingLabels = Array.from(
      { length: this.dayOfLastSevenDaysSpending.length },
      (_, index) => `Day ${index + 1}`
    );

    this.dayOfLastSevenDaysSpendingData = {
      labels: this.dayOfLastSevenDaysSpendingLabels,
      datasets: [
        {
          data: this.dayOfLastSevenDaysSpending,
          backgroundColor: this.generateRandomColors(
            this.dayOfLastSevenDaysSpending.length
          ),
          hoverBackgroundColor: this.generateRandomColors(
            this.dayOfLastSevenDaysSpending.length
          ),
        },
      ],
    };

    this.dayOfLastSevenDaysSpendingOptions = {
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

  getDayOfMonthEarning(userId: number, date: string) {
    this.transactionService.getDayOfMonthEarning(userId, date).subscribe(
      (res: number[]) => {
        // console.log(res);
        this.dayOfMonthEarning = res;
        this.renderDayOfMonthEarningChart();
        this.renderMonthlySpendingsAndEarningsChart();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  renderDayOfMonthEarningChart() {
    this.dayOfMonthEarningLabels = Array.from(
      { length: this.dayOfMonthEarning.length },
      (_, index) => `Day ${index + 1}`
    );

    this.dayOfMonthEarningData = {
      labels: this.dayOfMonthEarningLabels,
      datasets: [
        {
          label: 'Earning in each day of month',
          data: this.dayOfMonthEarning,
          backgroundColor: this.generateRandomColors(
            this.dayOfMonthEarning.length
          ),
          hoverBackgroundColor: this.generateRandomColors(
            this.dayOfMonthEarning.length
          ),
        },
      ],
    };

    this.dayOfMonthEarningOptions = {
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

  getMonthOfYearEarning(userId: number, date: string) {
    this.transactionService.getMonthOfYearEarning(userId, date).subscribe(
      (res: number[]) => {
        // console.log(res);
        this.monthOfYearEarning = res;
        this.renderMonthOfYearEarningChart();
        this.renderAnnualSpendingsAndEarningsChart();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  renderMonthOfYearEarningChart() {
    this.monthOfYearEarningLabels = Array.from(
      { length: this.monthOfYearEarning.length },
      (_, index) => this.formatMonth(index + 1)
    );

    this.monthOfYearEarningData = {
      labels: this.monthOfYearEarningLabels,
      datasets: [
        {
          data: this.monthOfYearEarning,
          backgroundColor: this.generateRandomColors(
            this.monthOfYearEarning.length
          ),
          hoverBackgroundColor: this.generateRandomColors(
            this.monthOfYearEarning.length
          ),
        },
      ],
    };

    this.monthOfYearEarningOptions = {
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

  getDayOfLastSevenDaysEarning(userId: number, date: string) {
    this.transactionService
      .getDayOfLastSevenDaysEarning(userId, date)
      .subscribe(
        (res: number[]) => {
          // console.log(res);
          this.dayOfLastSevenDaysEarning = res;
          this.renderDayOfLastSevenDaysEarningChart();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  renderDayOfLastSevenDaysEarningChart() {
    this.dayOfLastSevenDaysEarningLabels = Array.from(
      { length: this.dayOfLastSevenDaysEarning.length },
      (_, index) => `Day ${index + 1}`
    );

    this.dayOfLastSevenDaysEarningData = {
      labels: this.dayOfLastSevenDaysEarningLabels,
      datasets: [
        {
          data: this.dayOfLastSevenDaysEarning,
          backgroundColor: this.generateRandomColors(
            this.dayOfLastSevenDaysEarning.length
          ),
          hoverBackgroundColor: this.generateRandomColors(
            this.dayOfLastSevenDaysEarning.length
          ),
        },
      ],
    };

    this.dayOfLastSevenDaysEarningOptions = {
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
