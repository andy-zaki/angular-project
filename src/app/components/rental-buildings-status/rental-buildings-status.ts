import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-rental-buildings-status',
  templateUrl: './rental-buildings-status.html',
  styleUrl: './rental-buildings-status.css',
  imports: [CommonModule, HeaderComponent]
})
export class RentalBuildingsStatusComponent {
  private router = inject(Router);

  // Status counters using signals
  closedCount = signal(12);  // مغلق
  workingCount = signal(28); // تعمل
  totalCount = computed(() => this.closedCount() + this.workingCount()); // الاجمالي

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  navigateBack() {
    this.router.navigate(['/applications-menu']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
