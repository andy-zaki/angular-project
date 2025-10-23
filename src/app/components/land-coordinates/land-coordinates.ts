import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

interface LandCoordinate {
  latitude: string;
  longitude: string;
  area: string;
  address: string;
}

@Component({
  selector: 'app-land-coordinates',
  templateUrl: './land-coordinates.html',
  styleUrl: './land-coordinates.css',
  imports: [CommonModule, HeaderComponent]
})
export class LandCoordinatesComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  governmentNumber: string = '';
  coordinates: LandCoordinate = {
    latitude: '30.0444° N',
    longitude: '31.2357° E',
    area: '500.50 م²',
    address: 'صلاح الدين الايوبي - المديرية - الموقع الجغرافي'
  };

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.governmentNumber = params['govNumber'] || '';
    });
  }

  navigateToBuildingInquiry() {
    this.router.navigate(['/building-inquiry'], {
      queryParams: { govNumber: this.governmentNumber }
    });
  }

  navigateBack() {
    this.router.navigate(['/land-inquiry-id']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
