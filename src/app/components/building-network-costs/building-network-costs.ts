import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-building-network-costs',
  templateUrl: './building-network-costs.html',
  styleUrl: './building-network-costs.css',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingNetworkCostsComponent {
  private router = inject(Router);

  protected formData = {
    governmentNumber: '',
    networkType: '',
    costAmount: '',
    description: ''
  };

  protected networkTypes = [
    'كهرباء',
    'مياه',
    'صرف صحي',
    'غاز',
    'اتصالات',
    'طرق'
  ];

  protected goBack(): void {
    this.router.navigate(['/building-displacement-menu']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected submitForm(): void {
    if (this.validateForm()) {
      alert('تم حفظ بيانات تكاليف الشبكات بنجاح');
      this.goBack();
    }
  }

  private validateForm(): boolean {
    if (!this.formData.governmentNumber) {
      alert('الرجاء إدخال رقم المحضر الحكومي');
      return false;
    }
    if (!this.formData.networkType) {
      alert('الرجاء اختيار نوع الشبكة');
      return false;
    }
    if (!this.formData.costAmount) {
      alert('الرجاء إدخال التكلفة');
      return false;
    }
    return true;
  }
}
