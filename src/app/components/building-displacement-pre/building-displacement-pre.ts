import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-building-displacement-pre',
  templateUrl: './building-displacement-pre.html',
  styleUrl: './building-displacement-pre.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingDisplacementPreComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  protected displacementForm: FormGroup;
  protected submitStatus = signal<'idle' | 'success' | 'error'>('idle');

  constructor() {
    this.displacementForm = this.fb.group({
      // Basic Information
      branchCode: ['', Validators.required],
      rentedBuildingCode: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(0)]],
      areaBeforeOrganization: ['', [Validators.required, Validators.min(0)]],
      areaAfterOrganization: ['', [Validators.required, Validators.min(0)]],
      usageStatus: ['', Validators.required],

      // Estimated Price - Area Consultant Report
      consultantReportDate: [''],
      consultantLandPricePerMeter: ['', Validators.min(0)],
      consultantBuildingPrice: ['', Validators.min(0)],
      consultantTotal: ['', Validators.min(0)],

      // Estimated Price - Comparative Contracts
      comparativeContractId: [''],
      realEstateRegistryNumber: [''],
      comparativeContractDate: [''],
      comparativeLandPricePerMeter: ['', Validators.min(0)],

      // Estimated Price - Practice Record
      practiceRecordDate: [''],
      practiceLandPricePerMeter: ['', Validators.min(0)],
      displacementRequester: [''],

      // Preliminary Compensation
      compensationValue: ['', Validators.min(0)],
      checkNumber: [''],
      compensationDate: ['']
    });
  }

  protected navigateBack(): void {
    this.router.navigate(['/building-displacement-menu']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected onSubmit(): void {
    if (this.displacementForm.valid) {
      console.log('Form Data:', this.displacementForm.value);
      this.submitStatus.set('success');
      setTimeout(() => {
        this.submitStatus.set('idle');
        this.router.navigate(['/displacement-council-approval']);
      }, 2000);
    } else {
      this.submitStatus.set('error');
      this.markFormGroupTouched(this.displacementForm);
      setTimeout(() => this.submitStatus.set('idle'), 3000);
    }
  }

  protected onReset(): void {
    this.displacementForm.reset();
    this.submitStatus.set('idle');
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
