import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { DisplacementApiService } from '../../services/displacement-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-building-temporary-fulfillment',
  templateUrl: './building-temporary-fulfillment.html',
  styleUrl: './building-temporary-fulfillment.css',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingTemporaryFulfillmentComponent {
  private router = inject(Router);
  private displacementService = inject(DisplacementApiService);
  private errorHandler = inject(ErrorHandlerService);

  protected formData = {
    governmentNumber: '',
    propertyValue: '',
    fulfillmentAmount: '',
    fulfillmentDate: '',
    notes: ''
  };

  protected goBack(): void {
    this.router.navigate(['/building-displacement-menu']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected submitForm(): void {
    if (this.validateForm()) {
      const fulfillmentRecord = {
        recordNumber: this.formData.governmentNumber,
        propertyNumber: 'PROP-' + Date.now(),
        landCode: 'غير محدد',
        ownerName: 'غير محدد',
        displacementType: 'temporary_fulfillment',
        propertyValue: parseFloat(this.formData.propertyValue) || 0,
        compensationAmount: parseFloat(this.formData.fulfillmentAmount) || 0,
        paymentDate: this.formData.fulfillmentDate,
        paymentMethod: 'غير محدد',
        status: 'قيد المراجعة',
        notes: this.formData.notes || 'استيفاء مؤقت'
      };
      
      this.displacementService.createDisplacement(fulfillmentRecord as any).subscribe({
        next: (saved: any) => {
          console.log('Fulfillment saved:', saved);
          alert('✅ تم حفظ بيانات الاستيفاء المؤقت بنجاح');
          this.goBack();
        },
        error: (error: any) => {
          console.error('Error saving fulfillment:', error);
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'حفظ الاستيفاء المؤقت'
          );
          alert(errorMessage);
        }
      });
    }
  }

  private validateForm(): boolean {
    if (!this.formData.governmentNumber) {
      alert('الرجاء إدخال رقم المحضر الحكومي');
      return false;
    }
    if (!this.formData.propertyValue) {
      alert('الرجاء إدخال قيمة العقار');
      return false;
    }
    if (!this.formData.fulfillmentAmount) {
      alert('الرجاء إدخال مبلغ الاستيفاء');
      return false;
    }
    if (!this.formData.fulfillmentDate) {
      alert('الرجاء إدخال تاريخ الاستيفاء');
      return false;
    }
    return true;
  }
}
