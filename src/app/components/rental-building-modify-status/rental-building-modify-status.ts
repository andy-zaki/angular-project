import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-rental-building-modify-status',
  templateUrl: './rental-building-modify-status.html',
  styleUrl: './rental-building-modify-status.css',
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class RentalBuildingModifyStatusComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  buildingId: number = 0;
  modifyData = {
    status: 'مؤجرة',
    tenant: '',
    rentalStartDate: '',
    rentalEndDate: '',
    annualRent: '',
    notes: ''
  };

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.buildingId = params['buildingId'] || 0;
    });
  }

  submitModification() {
    console.log('Building status modified:', this.modifyData);
    this.router.navigate(['/rental-building-details'], {
      queryParams: { buildingId: this.buildingId }
    });
  }

  navigateBack() {
    this.router.navigate(['/rental-building-details'], {
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
