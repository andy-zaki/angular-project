import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';
import { RentalBuildingModifyStatusComponent } from '../rental-building-modify-status/rental-building-modify-status';

@Component({
  selector: 'app-rental-building-details',
  templateUrl: './rental-building-details.html',
  styleUrl: './rental-building-details.css',
  imports: [CommonModule, HeaderComponent, RentalBuildingModifyStatusComponent]
})
export class RentalBuildingDetailsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  buildingId: number = 0;
  showModifyPopup = signal(false);
  
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
    this.showModifyPopup.set(true);
  }

  closeModifyPopup() {
    this.showModifyPopup.set(false);
  }

  handleModifySubmit(data: any) {
    console.log('Status modified:', data);
    // Update building details with the new data
    this.buildingDetails.status = data.status;
    this.buildingDetails.tenant = data.tenant;
    this.buildingDetails.rentalStartDate = data.rentalStartDate;
    this.buildingDetails.rentalEndDate = data.rentalEndDate;
    this.buildingDetails.annualRent = data.annualRent;
  }

  navigateBack() {
    this.router.navigate(['/rental-building-location'], {
      queryParams: { buildingId: this.buildingId }
    });
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
