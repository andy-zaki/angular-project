import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-school-map-roads',
  templateUrl: './school-map-roads.html',
  styleUrl: './school-map-roads.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolMapRoadsComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  roadsForm!: FormGroup;

  // Lookup data for dropdowns
  mainRoadTypes = [
    { code: '1', name: 'طريق سريع' },
    { code: '2', name: 'طريق رئيسي' },
    { code: '3', name: 'طريق فرعي' }
  ];

  movementDirections = [
    { code: '1', name: 'اتجاه واحد' },
    { code: '2', name: 'اتجاهين' }
  ];

  constructor() {
    this.roadsForm = this.fb.group({
      buildingCode: ['', Validators.required],
      centerCode: ['', Validators.required],
      branchCode: ['', Validators.required],
      mainRoadTypeCode: ['', Validators.required],
      roadWidth: ['', [Validators.required, Validators.min(0)]],
      movementDirectionCode: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.roadsForm.valid) {
      console.log('Roads Data:', this.roadsForm.value);
      // Handle form submission
      alert('تم حفظ البيانات بنجاح');
      this.roadsForm.reset();
    } else {
      this.markFormGroupTouched(this.roadsForm);
    }
  }

  onReset() {
    this.roadsForm.reset();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getMainRoadTypeName(code: string): string {
    return this.mainRoadTypes.find(t => t.code === code)?.name || '';
  }

  getMovementDirectionName(code: string): string {
    return this.movementDirections.find(d => d.code === code)?.name || '';
  }

  navigateBack() {
    this.router.navigate(['/school-map-inquiry']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
