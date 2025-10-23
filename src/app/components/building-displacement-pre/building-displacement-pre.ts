import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-building-displacement-pre',
  templateUrl: './building-displacement-pre.html',
  styleUrl: './building-displacement-pre.css',
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class BuildingDisplacementPreComponent {
  private router = inject(Router);

  formData = {
    governmentNumber: '',
    propertyOwner: '',
    totalArea: '',
    reason: '',
    proposalDate: ''
  };

  submitForm() {
    if (this.formData.governmentNumber.trim()) {
      this.router.navigate(['/displacement-council-approval'], {
        queryParams: { govNumber: this.formData.governmentNumber }
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
