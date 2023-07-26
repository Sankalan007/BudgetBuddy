import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Goals from 'src/app/model/Goals';
import { GoalsService } from 'src/app/services/goals/goals.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import Swal from 'sweetalert2';

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
    private sharedDataService: SharedDataService,
    private toastr: ToastrService
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
    // console.log(this.goals);
  }

  toggleDescription(i: number) {
    this.showingDes[i] = !this.showingDes[i];
    // console.log(this.showingDes[i]);
  }

  getGoals(userId: number) {
    this.goalsService.getGoalsByUserId(userId).subscribe(
      (res: Goals[]) => {
        // console.log(res);
        this.goals = res;
        // console.log(res.length);
        this.showingDes = Array.from({ length: res.length }, () => false);
        // console.log(this.showingDes);

        this.totalGoals = this.goals.length;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  deleteGoals(goal: Goals) {
    this.goalsService.deleteGoals(goal.id).subscribe(
      (res) => {
        // console.log(res);
        this.getGoals(this.userDetails[0].id);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  deleteAllGoals() {
    // console.log("Bhai chal rha hai");
    this.goalsService.deleteAllGoals(this.userDetails[0].id).subscribe(
      (res) => {
        // console.log(res);
        this.getGoals(this.userDetails[0].id);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  toggleGoalForm() {
    if (!this.showUpdateGoalsForm) {
      this.showGoalsForm = !this.showGoalsForm;
    }
  }

  toggleUpdateGoalForm() {
    if (!this.showGoalsForm) {
      this.showUpdateGoalsForm = !this.showUpdateGoalsForm;
    }
  }

  onSubmit(goal: any) {
    this.toggleGoalForm();
    // console.log(goal);
    if (goal.target > goal.saving) {
      goal.userId = this.userDetails[0].id;
      if (this.goalsForm.valid) {
        this.goalsService.addGoals(goal).subscribe(
          (res: Goals) => {
            this.toastr.success(
              'Your goal has been added',
              'Goal addition successful'
            );
            // console.log(goal);
            this.goalsService
              .getGoalsByUserId(this.userDetails[0].id)
              .subscribe(
                (getRes: Goals[]) => {
                  // console.log(getRes);
                  this.goals = getRes;
                  // console.log(getRes.length);
                  this.showingDes = Array.from(
                    { length: getRes.length },
                    () => false
                  );
                  // console.log(this.showingDes);

                  this.totalGoals = this.goals.length;
                },
                (error: HttpErrorResponse) => {
                  console.log(error);
                }
              );
            // console.log(this.goals);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
      }
    } else {
      this.toastr.error(
        'Your saving is not lower than your target',
        'Check your inputs'
      );
    }

    this.goalsForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      target: ['', [Validators.required, Validators.min(0.01)]],
      saving: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  updateProgressBar(target: number, saving: number, endDate: string): any {
    // console.log(saving);
    const currentDate = new Date();
    const TimeLimit = new Date(endDate);
    if (currentDate > TimeLimit) {
      return 100.0001;
    }
    return (100 - ((target - saving) / target) * 100).toFixed(2);
  }

  getColor(target: number, savings: number, endDate: string) {
    let progress: number = this.updateProgressBar(target, savings, endDate);
    if (progress > 66 && progress < 100) {
      return '#FFFF';
    } else if (progress > 33 && progress < 66) {
      return '#D1D435';
    } else if (progress == 100) {
      return '#7ded17';
    } else {
      return '#FF0000';
    }
  }

  onUpdateGoal(goal: Goals) {
    this.toggleUpdateGoalForm();

    const updatedGoal = {
      id: this.myGoal.id,
      userId: this.userDetails[0]?.id,
      title: this.myGoal.title,
      description: goal.description,
      target: goal.target,
      saving: goal.saving,
      startDate: this.myGoal.startDate,
      endDate: goal.endDate,
    };
    console.log(updatedGoal);

    if (updatedGoal.target >= updatedGoal.saving) {
      this.goalsService.updateGoals(this.myGoal.id, updatedGoal).subscribe(
        (res) => {
          this.toastr.success(
            'Your goal has been updated',
            'Update successful'
          );
          // console.log(res);

          this.getGoals(this.userDetails[0]?.id);

          this.totalGoals = this.goals.length;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
      this.updateGoalsForm = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        target: ['', [Validators.required, Validators.min(0.01)]],
        saving: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      });
    } else {
      this.toastr.error(
        'Your saving is not lower than your target',
        'Check your inputs'
      );
    }
  }

  myGoal: Goals;
  indexToUpdate: number;

  deleteConfirmation(goal: Goals) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteGoals(goal);
        Swal.fire('Deleted!', 'Your goal has been deleted.', 'success');
      }
    });
  }

  deleteAllConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAllGoals();
        Swal.fire('Deleted!', 'Your goal has been deleted.', 'success');
      }
    });
  }

  updateGoal(goal: Goals, index: number) {
    this.toggleUpdateGoalForm();

    this.indexToUpdate = index;
    this.updateGoalsForm.setValue({
      title: this.goals[index].title,
      description: this.goals[index].description,
      target: this.goals[index].target,
      saving: this.goals[index].saving,
      startDate: this.goals[index].startDate,
      endDate: this.goals[index].endDate,
    });

    this.myGoal = goal;
  }

  disableEnableInput(bool: boolean) {
    if (bool === true)
      this.updateGoalsForm.get('customer_limit_input').enable();
    else this.updateGoalsForm.get('customer_limit_input').disable();
  }
  colorSwitch: boolean = true;
  getBoxColor(i: number) {
    console.log(this.colorSwitch);
    if (i % 2 == 0) {
      // this.colorSwitch = false;
      return '#2E8A99';
    } else {
      // this.colorSwitch = true;
      //return "#577D86"
      return '#678983';
    }
  }
}
