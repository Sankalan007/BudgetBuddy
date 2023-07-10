import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isAuthRoute();
  }

  lightTheme: boolean = true;
  toggleLightTheme(lightTheme: any) {
    this.lightTheme = lightTheme;
  }
  isAuthRoute() {
    console.log(this.router.url === '/login' || this.router.url === '/register');
    return this.router.url === '/login' || this.router.url === '/register';
  }
  sidebarOpen: boolean = true;
  toggleSidebar(sidebarOpen: any) {
    this.sidebarOpen = sidebarOpen;
  }
  
}
