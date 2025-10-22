import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-building-inquiry',
  templateUrl: './building-inquiry.html',
  styleUrl: './building-inquiry.css',
  imports: [CommonModule, HeaderComponent]
})
export class BuildingInquiryComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  governmentNumber: string = '';
  buildingData = {
    name: 'مدرسة الحسن بن الهيثم',
    type: 'مدرسة ابتدائية',
    area: '5000 م²',
    location: 'صلاح الدين الايوبي',
    rentalStatus: 'مؤجرة',
    schoolPeriod: 'فترتين',
    totalRooms: 24
  };

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.governmentNumber = params['govNumber'] || '';
    });
  }

  navigateBack() {
    this.router.navigate(['/land-coordinates'], {
      queryParams: { govNumber: this.governmentNumber }
    });
  }

  navigateToEducationalBuilding() {
    this.router.navigate(['/educational-building']);
  }
}
