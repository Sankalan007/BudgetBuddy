import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { SmoothScrollService } from '@boatzako/ngx-smooth-scroll';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor(private router: Router, private authService: AuthService, private smooth: SmoothScrollService) {}

  ngOnInit(): void {
    // this.isAuthRoute();
    this.smooth.smoothScrollToAnchor();
    this.isAuthenticated();
    AOS.init();
  }

  lightTheme: boolean = true;
  toggleLightTheme(lightTheme: any) {
    this.lightTheme = lightTheme;
  }
  isAuthRoute() {
    // console.log(this.router.url === '/login' || this.router.url === '/register');
    return this.router.url === '/login' || this.router.url === '/register';
  }
  isAuthenticated(){
    // console.log(this.authService.isAuthenticated);
    return this.authService.isAuthenticated();
  }
  sidebarOpen: boolean = true;
  toggleSidebar(sidebarOpen: any) {
    this.sidebarOpen = sidebarOpen;
  }

  goTop(){
    this.smooth.smoothScrollToTop({ duration: 1000, easing: 'linear' });
  }
  
  
}
