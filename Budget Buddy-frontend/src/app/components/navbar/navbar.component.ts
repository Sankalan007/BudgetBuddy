import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit{
  userDetails!: any;
  constructor(private authService: AuthService, private router: Router, private sharedDataService: SharedDataService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.sharedDataService.userDetailsObservable.subscribe((userDetails) => {
      this.userDetails = userDetails;
    })
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logout();
    this.sharedDataService.setUserDetails('');
    // this.sharedDataService.setUserRole('');
    this.toastr.info('You are logged out', 'Log out successful');
    this.router.navigate(['/']);
  }

  getRole() {
    return this.authService.getRole();
  }
  @Input() sidebarOpen: boolean = true;
  @Input() lightTheme: boolean = true;

  baseHover: boolean = false;
  toggleBaseHover() {
    this.baseHover = !this.baseHover;
  }
  aimsHover: boolean = false;
  toggleAimsHover() {
    this.aimsHover = !this.aimsHover;
  }
}
