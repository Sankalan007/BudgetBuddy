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
  updateGoalsForm!: FormGroup;
  showGoalsForm: boolean = false;
  goals: Goals[];
  totalGoals: number;
  userDetails: any;
  spendCategory: any;

  desLength: number;

  showingDes: boolean[];

  isFieldDisabled: boolean = false;
  showUpdateGoalsForm: boolean = false;

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
      saving: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.updateGoalsForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      target: ['', [Validators.required, Validators.min(0.01)]],
      saving: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.getGoals(this.userDetails[0].id);
    console.log(this.goals);
  }

  toggleDescription(i: number) {
    this.showingDes[i] = !this.showingDes[i];
    console.log(this.showingDes[i]);
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

  toggleUpdateGoalForm() {
    this.showUpdateGoalsForm = !this.showUpdateGoalsForm;
  }

  onSubmit(goal: any) {
    this.toggleGoalForm();
    console.log(goal);
    goal.userId = this.userDetails[0].id;
    if (this.goalsForm.valid) {
      this.goalsService.addGoals(goal).subscribe(
        (res: Goals) => {
          console.log(goal);
          this.goalsService.getGoalsByUserId(this.userDetails[0].id).subscribe(
            (getRes: Goals[]) => {
              console.log(getRes);
              this.goals = getRes;
              console.log(getRes.length);
              this.showingDes = Array.from(
                { length: getRes.length },
                () => false
              );
              console.log(this.showingDes);

              this.totalGoals = this.goals.length;
            },
            (error: HttpErrorResponse) => {
              console.log(error);
            }
          );
          console.log(this.goals);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
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

  onUpdateGoal(goal: Goals) {

    this.toggleUpdateGoalForm();
    const updatedGoal = {
      id: this.myGoal.id,
      title: this.myGoal.title,
      description: goal.description,
      target: this.myGoal.target,
      saving: goal.saving,
      startDate: this.myGoal.startDate,
      endDate: goal.endDate,
    };
    console.log(updatedGoal);
    
    this.goalsService.updateGoals(this.myGoal.id, updatedGoal).subscribe(
      (res) => {
        console.log(res);

        this.getGoals(this.userDetails[0]?.id);

        this.totalGoals = this.goals.length;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  myGoal: Goals;
  indexToUpdate: number;

  updateGoal(goal: Goals, index: number) {
    this.toggleUpdateGoalForm();
    this.indexToUpdate = index;
    this.updateGoalsForm.setValue({
      title: this.goals[index].title,
      description: '',
      target: 0,
      saving: 0,
      startDate: '',
      endDate: '',
    });

    this.myGoal = goal;
  }

  disableEnableInput(bool: boolean) {
    if (bool === true)
      this.updateGoalsForm.get('customer_limit_input').enable();
    else this.updateGoalsForm.get('customer_limit_input').disable();
  }
}
