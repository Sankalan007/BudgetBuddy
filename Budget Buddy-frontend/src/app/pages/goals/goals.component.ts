import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Goals from 'src/app/model/Goals';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
})
export class GoalsComponent implements OnInit {
  goalsForm!: FormGroup;
  showGoalsForm: boolean = false;
  goals: Goals[];
  totalGoals: number;
  userDetails: any;
  spendCategory: any;

  desLength: number;

  showingDes: boolean[];

  constructor(
    private fb: FormBuilder,
    private goalsService: GoalsService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.userDetailsObservable.subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
    this.goalsForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      target: ['', [Validators.required, Validators.min(0.01)]],
      savings: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.getGoals(this.userDetails[0].id);
    
    
  }

  toggleDescription(i: number) {
    this.showingDes[i] = !this.showingDes[i];
    console.log( this.showingDes[i]);
  }

  getGoals(userId: number) {
    this.goalsService.getGoalsByUserId(userId).subscribe(
      (res: Goals[]) => {
        console.log(res);
        this.goals = res;
        console.log(res.length);
        this.showingDes = Array.from({ length: res.length }, () => false);
        console.log(this.showingDes);
        

        this.totalGoals = this.goals.length;
        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  toggleGoalForm() {
    this.showGoalsForm = !this.showGoalsForm;
  }
  onSubmit(goals: any) {
    console.log(goals);
  }

  updateProgressBar(target: number, saving: number): any {
    // console.log(saving);

    return (100 - ((target - saving) / target) * 100).toFixed(2);
  }

  getColor(target: number, savings: number) {
    let progress: number = this.updateProgressBar(target, savings);
    if (progress > 66) {
      return '#FFFF';
    } else if (progress > 33 && progress < 66) {
      return '#D1D435';
    } else {
      return '#FF0000';
    }
  }
}
