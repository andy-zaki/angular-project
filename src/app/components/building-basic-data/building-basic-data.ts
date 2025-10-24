import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

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
      console.log('Building basic data submitted:', this.buildingForm.value);
      alert('تم حفظ البيانات بنجاح!');
      this.buildingForm.reset();
    } else {
      this.markFormGroupTouched(this.buildingForm);
      alert('الرجاء ملء جميع الحقول المطلوبة');
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
