import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-displacement-final-compensation',
  templateUrl: './displacement-final-compensation.html',
  styleUrl: './displacement-final-compensation.css',
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class DisplacementFinalCompensationComponent {
  private router = inject(Router);

  compensationData = {
    propertyValue: '',
    compensationAmount: '',
    paymentDate: '',
    paymentMethod: '',
    status: 'قيد المراجعة'
  };

  submitCompensation() {
    console.log('Compensation submitted:', this.compensationData);
    this.router.navigate(['/educational-building']);
  }

  navigateBack() {
    this.router.navigate(['/building-displacement-post']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
