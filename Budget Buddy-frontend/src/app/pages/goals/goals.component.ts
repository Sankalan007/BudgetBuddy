import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  goalsForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.goalsForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      target: ['', [Validators.required, Validators.min(0.01)]],
      savings: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }
  onSubmit(goals: any){
    console.log(goals);
  }

}
