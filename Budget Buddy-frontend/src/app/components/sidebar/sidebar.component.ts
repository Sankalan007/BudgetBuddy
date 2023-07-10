import { Component, EventEmitter, Output } from '@angular/core';
import { sidebarData } from './sidebarData';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() sidebarToggled = new EventEmitter<boolean>();
  @Output() lightThemeToggled = new EventEmitter<boolean>(); // Renamed event emitter

  sidebarOpen: boolean = true;
  lightTheme = true;

  toggleSidebarOpen() {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarToggled.emit(this.sidebarOpen);
  }

  toggleTheme() {
    this.lightTheme = !this.lightTheme;
    if (this.lightTheme) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
    this.lightThemeToggled.emit(this.lightTheme); // Emit the lightTheme value
  }

  data = sidebarData;
}
