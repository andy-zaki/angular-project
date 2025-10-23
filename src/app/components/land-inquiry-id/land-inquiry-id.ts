import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  
  governmentNumber: string = '';

  navigateToLandCoordinates() {
    if (this.governmentNumber.trim()) {
      this.router.navigate(['/land-coordinates'], {
        queryParams: { govNumber: this.governmentNumber }
      });
    }
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
