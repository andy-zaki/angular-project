import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-rental-building-details',
  templateUrl: './rental-building-details.html',
  styleUrl: './rental-building-details.css',
  imports: [CommonModule, HeaderComponent]
})
export class RentalBuildingDetailsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  buildingId: number = 0;
  buildingDetails = {
    name: 'مدرسة الرازي',
    status: 'مؤجرة',
    tenant: 'وزارة التعليم',
    rentalStartDate: '2020-01-15',
    rentalEndDate: '2025-01-14',
    annualRent: '500000 ريال'
  };

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.buildingId = params['buildingId'] || 0;
    });
  }

  editStatus() {
    this.router.navigate(['/rental-building-modify-status'], {
      queryParams: { buildingId: this.buildingId }
    });
  }

  navigateBack() {
    this.router.navigate(['/rental-building-location'], {
      queryParams: { buildingId: this.buildingId }
    });
  }
}
