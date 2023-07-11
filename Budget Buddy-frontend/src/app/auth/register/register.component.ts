import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
// import { ToastrService } from 'ngx-toastr';
// import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage!: String;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      userName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: ['', [Validators.required, this.checkTerms.bind(this)]],
    });
  }

  checkTerms(control: FormControl): { [s: string]: boolean } | null {
    const value = control.value;
    if (!value) {
      return { required: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          console.log('Registration successful!');
          console.log(response);
          this.router.navigate(['/login']);
          this.toastr.success('Please log In', 'Registration successful', {
            positionClass: 'toast-bottom-right',
          });
        },
        (error) => {
          this.errorMessage = 'Username or Email already exists!';
          console.log('Registration failed!');
          console.log(error);
          this.toastr.error('WARNING: Username or Email already exists!');
        }
      );
    } else {
      this.toastr.warning(
        'Please fill all the fields accordingly',
        'Invalid form'
      );
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
