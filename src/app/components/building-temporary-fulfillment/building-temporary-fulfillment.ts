import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

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
      alert('تم حفظ بيانات الاستيفاء المؤقت بنجاح');
      this.goBack();
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
