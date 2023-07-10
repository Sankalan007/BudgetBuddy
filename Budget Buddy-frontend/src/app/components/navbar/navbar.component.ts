import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
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
