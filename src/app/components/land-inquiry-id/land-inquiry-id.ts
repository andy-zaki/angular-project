import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-land-inquiry-id',
  templateUrl: './land-inquiry-id.html',
  styleUrl: './land-inquiry-id.css',
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class LandInquiryIdComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  governmentNumber: string = '';

  constructor() {
    // Get government number from route params if available
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.governmentNumber = id;
    }
  }

  navigateToLandCoordinates() {
    if (this.governmentNumber.trim()) {
      this.router.navigate(['/land-coordinates', this.governmentNumber]);
    }
  }

  navigateBack() {
    this.router.navigate(['/land-inquiry']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
