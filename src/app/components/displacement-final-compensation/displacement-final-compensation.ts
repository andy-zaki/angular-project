import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { DisplacementApiService } from '../../services/displacement-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-displacement-final-compensation',
  templateUrl: './displacement-final-compensation.html',
  styleUrl: './displacement-final-compensation.css',
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class DisplacementFinalCompensationComponent {
  private router = inject(Router);
  private displacementService = inject(DisplacementApiService);
  private errorHandler = inject(ErrorHandlerService);

  compensationData = {
    propertyValue: '',
    compensationAmount: '',
    paymentDate: '',
    paymentMethod: '',
    status: 'قيد المراجعة'
  };

  submitCompensation() {
    const compensationRecord = {
      recordNumber: 'COMP-' + Date.now(),
      propertyNumber: 'PROP-' + Date.now(),
      landCode: 'غير محدد',
      ownerName: 'غير محدد',
      displacementType: 'final_compensation',
      propertyValue: parseFloat(this.compensationData.propertyValue) || 0,
      compensationAmount: parseFloat(this.compensationData.compensationAmount) || 0,
      paymentDate: this.compensationData.paymentDate || new Date().toISOString().split('T')[0],
      paymentMethod: this.compensationData.paymentMethod || 'غير محدد',
      status: this.compensationData.status,
      notes: 'تعويض نهائي'
    };
    
    this.displacementService.createDisplacement(compensationRecord as any).subscribe({
      next: (saved: any) => {
        console.log('Compensation saved:', saved);
        alert('✅ تم حفظ بيانات التعويض النهائي بنجاح');
        this.router.navigate(['/educational-building']);
      },
      error: (error: any) => {
        console.error('Error saving compensation:', error);
        const errorMessage = this.errorHandler.getUserFriendlyMessage(
          error,
          'حفظ التعويض النهائي'
        );
        alert(errorMessage);
      }
    });
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
