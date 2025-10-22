import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-displacement-council-approval',
  templateUrl: './displacement-council-approval.html',
  styleUrl: './displacement-council-approval.css',
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class DisplacementCouncilApprovalComponent {
  private router = inject(Router);

  approvalData = {
    status: 'قيد المراجعة',
    approvalDate: '',
    councilDecision: '',
    notes: ''
  };

  submitApproval() {
    this.router.navigate(['/educational-building']);
  }

  navigateBack() {
    this.router.navigate(['/building-displacement-pre']);
  }
}
