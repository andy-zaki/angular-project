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
    { code: '1', name: 'الفترات الدراسية' },
    { code: '2', name: 'حدود الموقع العام' },
    { code: '3', name: 'الملاعب' },
    { code: '4', name: 'البوبات' },
    { code: '5', name: 'الملاحق' },
    { code: '6', name: 'المساحات' },
    { code: '7', name: 'شبكات الحريق' },
    { code: '8', name: 'المناسيب' },
    { code: '9', name: 'التغذية بالمياه' },
    { code: '10', name: 'الغاز الطبيعي' },
    { code: '11', name: 'الصرف الصحي' },
    { code: '12', name: 'التوصيلات الكهربائية' },
    { code: '13', name: 'التجهيزات الصحية' },
    { code: '14', name: 'الفراغات' }
  ];

  negativeEnvironments = [
    { code: '1', name: 'الفترات الدراسية' },
    { code: '2', name: 'حدود الموقع العام' },
    { code: '3', name: 'الملاعب' },
    { code: '4', name: 'البوبات' },
    { code: '5', name: 'الملاحق' },
    { code: '6', name: 'المساحات' },
    { code: '7', name: 'شبكات الحريق' },
    { code: '8', name: 'المناسيب' },
    { code: '9', name: 'التغذية بالمياه' },
    { code: '10', name: 'الغاز الطبيعي' },
    { code: '11', name: 'الصرف الصحي' },
    { code: '12', name: 'التوصيلات الكهربائية' },
    { code: '13', name: 'التجهيزات الصحية' },
    { code: '14', name: 'الفراغات' }
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
