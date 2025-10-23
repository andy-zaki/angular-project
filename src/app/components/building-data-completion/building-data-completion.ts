import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-building-data-completion',
  templateUrl: './building-data-completion.html',
  styleUrl: './building-data-completion.css',
  imports: [CommonModule, HeaderComponent]
})
export class BuildingDataCompletionComponent {
  private router = inject(Router);

  options = [
    { id: 1, title: 'تسجيل البيانات الأساسية للمبنى التعليمي', icon: '📋', route: '/building-basic-data' },
    { id: 2, title: 'تسجيل بيانات الملاحق للمبنى', icon: '🏗️', route: '/building-annexes-data' }
  ];

  navigateToOption(route: string) {
    this.router.navigate([route]);
  }

  navigateBack() {
    this.router.navigate(['/educational-building']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
