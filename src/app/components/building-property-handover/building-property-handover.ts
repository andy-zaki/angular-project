import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-building-property-handover',
  templateUrl: './building-property-handover.html',
  styleUrl: './building-property-handover.css',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingPropertyHandoverComponent {
  private router = inject(Router);

  protected formData = {
    governmentNumber: '',
    handoverDate: '',
    handoverMethod: '',
    receivedBy: '',
    notes: ''
  };

  protected handoverMethods = [
    'تسليم مباشر',
    'تسليم بوساطة محضر',
    'تسليم برسالة رسمية',
    'تسليم إلكتروني'
  ];

  protected goBack(): void {
    this.router.navigate(['/building-displacement-menu']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected submitForm(): void {
    if (this.validateForm()) {
      alert('تم تقديم طلب تسليم العقار بنجاح');
      this.goBack();
    }
  }

  private validateForm(): boolean {
    if (!this.formData.governmentNumber) {
      alert('الرجاء إدخال رقم المحضر الحكومي');
      return false;
    }
    if (!this.formData.handoverDate) {
      alert('الرجاء إدخال تاريخ التسليم');
      return false;
    }
    if (!this.formData.handoverMethod) {
      alert('الرجاء اختيار طريقة التسليم');
      return false;
    }
    if (!this.formData.receivedBy) {
      alert('الرجاء إدخال اسم المستلم');
      return false;
    }
    return true;
  }
}
