import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import SpendCategories from 'src/app/model/SpendCategories';
import Transaction from 'src/app/model/Transaction';
import User from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BudgetService } from 'src/app/services/budget/budget.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newtransaction',
  templateUrl: './newtransaction.component.html',
  styleUrls: ['./newtransaction.component.css'],
})
export class NewtransactionComponent implements OnInit {
  transactionForm!: FormGroup;
  userDetails!: any;
  userId: number;
  date: string;
  budget: SpendCategories;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private budgetService: BudgetService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.sharedDataService.userDetailsObservable.subscribe((res) => {
      this.userDetails = res;
      this.userId = this.userDetails[0]?.id;
    });
    const today = new Date();
    this.date = new Date(today.getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      description: [''],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      transactionDate: ['', Validators.required],
      transactionTime: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit(transaction: Transaction) {
    // this.transactionForm = this.fb.group({
    //   type: [''],
    //   description: [''],
    //   amount: [''],
    //   transactionDate: [''],
    //   transactionTime: [''],
    //   category: [''],
    // });
    this.budgetService.getAllBudget(this.userId).subscribe(
      (resBudget: SpendCategories) => {
        this.budget = resBudget;
        this.transactionService
          .getMonthlyCategoriesSpending(this.userId, this.date)
          .subscribe((resTransaction) => {
            transaction.userId = this.userDetails[0].id;
              if (transaction.description === '')
                transaction.description = 'default message';
              console.log(transaction);
              this.transactionService.addNewTransaction(transaction).subscribe(
                (res) => {
                  this.transactionService
                    .findAllTransactions(this.userDetails[0].id)
                    .subscribe(
                      (transactions) => {
                        this.sharedDataService.setTransaction(transactions);
                      },
                      (error) => {
                        alert(error.message);
                      }
                    );
                },
                (error: HttpErrorResponse) => {
                  console.log(error.message);
                }
              );
              this.router.navigate(['/transactions']);
            if(transaction.type === 'spend'){
              if (
                resBudget[transaction.category] >=
                resTransaction[transaction.category] + transaction.amount
              ) {
                
              } else {
                console.log('limit reached');
                this.toastr.error('You are going over your spending limit', `Please update your ${transaction.category} budget`);
              }
            }
          });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

    
  }
}
