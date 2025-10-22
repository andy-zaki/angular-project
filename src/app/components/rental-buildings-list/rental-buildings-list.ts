import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-rental-buildings-list',
  templateUrl: './rental-buildings-list.html',
  styleUrl: './rental-buildings-list.css',
  imports: [CommonModule, HeaderComponent]
})
export class RentalBuildingsListComponent {
  private router = inject(Router);

  buildings = [
    { id: 1, name: 'مدرسة الرازي', status: 'مؤجرة', tenant: 'وزارة التعليم' },
    { id: 2, name: 'مدرسة ابن سينا', status: 'مؤجرة', tenant: 'وزارة الصحة' },
    { id: 3, name: 'مدرسة الفارابي', status: 'شاغرة', tenant: '-' }
  ];

  selectBuilding(buildingId: number) {
    this.router.navigate(['/rental-building-location'], {
      queryParams: { buildingId }
    });
  }

  navigateBack() {
    this.router.navigate(['/rental-buildings-status']);
  }
}
