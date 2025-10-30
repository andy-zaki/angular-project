import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { DisplacementApiService } from '../../services/displacement-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

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
  private displacementService = inject(DisplacementApiService);
  private errorHandler = inject(ErrorHandlerService);

  protected displacementForm: FormGroup;
  protected submitStatus = signal<'idle' | 'success' | 'error'>('idle');
  protected showCouncilApprovalModal = signal<boolean>(false);
  protected councilApprovalForm: FormGroup;

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

    this.councilApprovalForm = this.fb.group({
      schoolNumber: ['', Validators.required],
      schoolName: ['', Validators.required],
      approval: ['', Validators.required],
      approvalNumber: ['', Validators.required],
      approvalDate: ['', Validators.required]
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
      const formData = this.displacementForm.value;
      
      // Create displacement record object matching backend DisplacementRecord model
      const displacementData = {
        referenceNumber: `DISP-PRE-${Date.now()}`,
        buildingCode: formData.rentedBuildingCode,
        displacementType: 'قبل التنظيم',
        status: 'قيد المعالجة',
        requestDate: new Date().toISOString(),
        reason: `مساحة: ${formData.area}م² - قبل التنظيم: ${formData.areaBeforeOrganization}م² - بعد التنظيم: ${formData.areaAfterOrganization}م²`,
        notes: `موقف الاستخدام: ${formData.usageStatus}\nسعر الاستشاري: ${formData.consultantLandPricePerMeter || 'غير محدد'}\nقيمة التعويض: ${formData.compensationValue || 'غير محدد'}`
      };
      
      // Save to database via API
      this.displacementService.createDisplacement(displacementData as any).subscribe({
        next: (savedDisplacement) => {
          console.log('Displacement saved successfully:', savedDisplacement);
          this.submitStatus.set('success');
          alert('✅ تم حفظ بيانات النزع بنجاح');
          setTimeout(() => {
            this.submitStatus.set('idle');
            this.router.navigate(['/displacement-council-approval']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error saving displacement:', error);
          this.submitStatus.set('error');
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'حفظ بيانات النزع'
          );
          alert(errorMessage);
          setTimeout(() => this.submitStatus.set('idle'), 3000);
        }
      });
    } else {
      this.submitStatus.set('error');
      this.markFormGroupTouched(this.displacementForm);
      alert('⚠️ الرجاء ملء جميع الحقول المطلوبة');
      setTimeout(() => this.submitStatus.set('idle'), 3000);
    }
  }

  protected onReset(): void {
    this.displacementForm.reset();
    this.submitStatus.set('idle');
  }

  protected openCouncilApprovalModal(): void {
    this.showCouncilApprovalModal.set(true);
  }

  protected closeCouncilApprovalModal(): void {
    this.showCouncilApprovalModal.set(false);
    this.councilApprovalForm.reset();
  }

  protected submitCouncilApproval(): void {
    if (this.councilApprovalForm.valid) {
      console.log('Council Approval Data:', this.councilApprovalForm.value);
      this.closeCouncilApprovalModal();
      this.submitStatus.set('success');
      setTimeout(() => this.submitStatus.set('idle'), 2000);
    } else {
      this.markFormGroupTouched(this.councilApprovalForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
