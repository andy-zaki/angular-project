import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { BuildingApiService } from '../../services/building-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-building-basic-data',
  templateUrl: './building-basic-data.html',
  styleUrl: './building-basic-data.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingBasicDataComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private buildingService = inject(BuildingApiService);
  private errorHandler = inject(ErrorHandlerService);

  buildingForm: FormGroup;

  positiveEnvironments = [
    { code: '1', name: 'حديقة عامة' },
    { code: '2', name: 'مكتبة عامة' },
    { code: '3', name: 'مركز رياضي' },
    { code: '4', name: 'مسجد' },
    { code: '5', name: 'مركز صحي' }
  ];

  negativeEnvironments = [
    { code: '1', name: 'طريق سريع' },
    { code: '2', name: 'منطقة صناعية' },
    { code: '3', name: 'مقلب قمامة' },
    { code: '4', name: 'محطة وقود' },
    { code: '5', name: 'ورشة صناعية' }
  ];

  constructor() {
    this.buildingForm = this.fb.group({
      buildingNumber: ['', [Validators.required]],
      usageStatus: ['', [Validators.required]],
      addressNumber: ['', [Validators.required]],
      street: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      landOwnership: ['', [Validators.required]],
      buildingOwnership: ['', [Validators.required]],
      fenceCode: ['', [Validators.required]],
      fenceHeight: ['', [Validators.required]],
      fenceCondition: ['', [Validators.required]],
      northSide: ['', [Validators.required]],
      southSide: ['', [Validators.required]],
      eastSide: ['', [Validators.required]],
      westSide: ['', [Validators.required]],
      northEast: ['', [Validators.required]],
      southEast: ['', [Validators.required]],
      northWest: ['', [Validators.required]],
      southWest: ['', [Validators.required]],
      buildingMaterial: ['', [Validators.required]],
      coordinateX: ['', [Validators.required]],
      coordinateY: ['', [Validators.required]],
      coordinateZ: ['', [Validators.required]],
      positiveEnvironment: ['', [Validators.required]],
      negativeEnvironment: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.buildingForm.valid) {
      const formData = this.buildingForm.value;
      
      // Create a building record first
      const buildingData = {
        buildingNumber: formData.buildingNumber,
        schoolName: 'مبنى تعليمي - ' + formData.buildingNumber,
        usageStatus: formData.usageStatus,
        buildingOwnership: formData.buildingOwnership,
        governorate: 'غير محدد',
        regionalCenter: 'غير محدد',
        educationalAdministration: 'غير محدد',
        district: 'غير محدد',
        neighborhood: formData.street || 'غير محدد'
      };
      
      // Save to database
      this.buildingService.createBuilding(buildingData as any).subscribe({
        next: (saved: any) => {
          console.log('Building basic data saved:', saved);
          alert('✅ تم حفظ البيانات الأساسية للمبنى بنجاح!');
          this.buildingForm.reset();
        },
        error: (error: any) => {
          console.error('Error saving building data:', error);
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'حفظ البيانات الأساسية للمبنى'
          );
          alert(errorMessage);
        }
      });
    } else {
      this.markFormGroupTouched(this.buildingForm);
      alert('⚠️ الرجاء ملء جميع الحقول المطلوبة');
    }
  }

  onReset() {
    this.buildingForm.reset();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  navigateBack() {
    this.router.navigate(['/building-data-completion']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
