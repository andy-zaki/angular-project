import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-rental-building-location',
  templateUrl: './rental-building-location.html',
  styleUrl: './rental-building-location.css',
  imports: [CommonModule, HeaderComponent]
})
export class RentalBuildingLocationComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  buildingId: number = 0;
  locationData = {
    address: 'صلاح الدين الايوبي - المديرية',
    latitude: '30.0444° N',
    longitude: '31.2357° E',
    area: '5000 م²'
  };

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.buildingId = params['buildingId'] || 0;
    });
  }

  viewDetails() {
    this.router.navigate(['/rental-building-details'], {
      queryParams: { buildingId: this.buildingId }
    });
  }

  navigateBack() {
    this.router.navigate(['/rental-buildings-list']);
  }
}
