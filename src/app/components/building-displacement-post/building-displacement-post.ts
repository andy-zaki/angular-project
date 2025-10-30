import { Component, inject, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { DisplacementApiService } from '../../services/displacement-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-building-displacement-post',
  templateUrl: './building-displacement-post.html',
  styleUrl: './building-displacement-post.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingDisplacementPostComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private displacementDatabaseService = inject(DisplacementApiService);
  private errorHandler = inject(ErrorHandlerService);

  // School data - will be loaded from database service
  protected schoolNumber = signal<string>('12345');
  protected schoolName = signal<string>('مدرسة النور الابتدائية');

  protected displacementPostForm: FormGroup;
  protected submitStatus = signal<'idle' | 'success' | 'error'>('idle');
  
  // Final Compensation Modal
  protected showFinalCompensationModal = signal<boolean>(false);
  protected finalCompensationForm: FormGroup;
  protected finalCompensationList = signal<Array<{checkNumber: string, value: number, date: string}>>([]);

  // Display Lists Modal
  protected showDisplayListsModal = signal<boolean>(false);
  protected displayListsForm: FormGroup;
  protected displayListsList = signal<Array<any>>([]);

  // Conformity Certificates Modal
  protected showConformityCertificatesModal = signal<boolean>(false);
  protected conformityCertificatesForm: FormGroup;
  protected conformityCertificatesList = signal<Array<any>>([]);

  // Real Estate Unit Modal
  protected showRealEstateUnitModal = signal<boolean>(false);
  protected realEstateUnitForm: FormGroup;
  protected realEstateUnitList = signal<Array<any>>([]);

  // Sale Forms Modal
  protected showSaleFormsModal = signal<boolean>(false);
  protected saleFormsForm: FormGroup;
  protected saleFormsList = signal<Array<any>>([]);

  // Minister Decision Modal
  protected showMinisterDecisionModal = signal<boolean>(false);
  protected ministerDecisionForm: FormGroup;
  protected ministerDecisionList = signal<Array<any>>([]);

  protected options = [
    { id: 1, title: 'التعويض النهائي', icon: '💰' },
    { id: 2, title: 'كشوف العرض', icon: '📊' },
    { id: 3, title: 'شهادات المطابقة', icon: '📜' },
    { id: 4, title: 'قرار الوزير المختص', icon: '📋' },
    { id: 5, title: 'صحيفة وحدة صحية', icon: '🏠' },
    { id: 6, title: 'استمارات البيع', icon: '📝' }
  ];

  constructor() {
    this.displacementPostForm = this.fb.group({
      // Basic Information
      branchCode: ['', Validators.required],
      rentedBuildingCode: ['', Validators.required],

      // Cabinet Decision
      cabinetDecisionNumber: ['', Validators.required],
      cabinetDecisionDate: ['', Validators.required],

      // Official Gazette Publication
      publicationCount: ['', [Validators.required, Validators.min(0)]],
      publicationDate: ['', Validators.required],
      educationProject: ['', Validators.required],

      // Display Lists
      ownersCount: ['', [Validators.required, Validators.min(0)]],
      pricePerMeter: ['', [Validators.required, Validators.min(0)]],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],

      // Sale Forms
      formsCount: ['', [Validators.required, Validators.min(0)]]
    });

    this.finalCompensationForm = this.fb.group({
      checkNumber: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required]
    });

    this.displayListsForm = this.fb.group({
      schoolNumber: [this.schoolNumber()],
      schoolName: [this.schoolName()],
      displacementDecisionNumber: ['', Validators.required],
      serialId: ['', Validators.required],
      ownerName: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(0)]]
    });

    this.conformityCertificatesForm = this.fb.group({
      schoolNumber: [this.schoolNumber()],
      schoolName: [this.schoolName()],
      formType: ['', Validators.required],
      certificateNumber: ['', Validators.required],
      ownerName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      date: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(0)]],
      value: ['', [Validators.required, Validators.min(0)]]
    });

    this.realEstateUnitForm = this.fb.group({
      schoolNumber: [this.schoolNumber()],
      schoolName: [this.schoolName()],
      unitNumber: ['', Validators.required],
      basinNumber: ['', Validators.required],
      basinName: ['', Validators.required],
      ownershipReason: ['', Validators.required],
      date: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(0)]]
    });

    this.saleFormsForm = this.fb.group({
      schoolNumber: [this.schoolNumber()],
      schoolName: [this.schoolName()],
      formType: ['', Validators.required],
      formNumber: ['', Validators.required],
      ownerName: ['', Validators.required],
      registeredNumber: ['', Validators.required],
      date: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(0)]],
      value: ['', [Validators.required, Validators.min(0)]]
    });

    this.ministerDecisionForm = this.fb.group({
      schoolNumber: [this.schoolNumber()],
      schoolName: [this.schoolName()],
      decisionNumber: ['', Validators.required],
      decisionDate: ['', Validators.required],
      registeredNumber: ['', Validators.required],
      registrationDate: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(0)]],
      publicationCount: ['', [Validators.required, Validators.min(0)]],
      publicationDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Load displacement process data when component initializes
    this.displacementDatabaseService.searchDisplacements({ buildingCode: this.schoolNumber() }).subscribe({
      next: (processes: any[]) => {
        if (processes && processes.length > 0) {
          const process = processes[0];
          this.schoolName.set(process.schoolName || 'مدرسة النور الابتدائية');
          // Optionally populate form with existing data
        }
      },
      error: (error: any) => {
        console.error('Error loading displacement process:', error);
      }
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
    if (this.displacementPostForm.valid) {
      const formData = this.displacementPostForm.value;
      
      // Create displacement record for post-organization
      const displacementData = {
        referenceNumber: `DISP-POST-${Date.now()}`,
        buildingCode: this.schoolNumber(),
        displacementType: 'بعد التنظيم',
        status: 'قيد المعالجة',
        requestDate: new Date().toISOString(),
        reason: `قرار لجنة المبيعات: ${formData.salesCommitteeDecision || 'غير محدد'}`,
        notes: `رقم جلسة المبيعات: ${formData.salesSessionNumber || ''}\nتفاصيل إضافية من النموذج`
      };
      
      // Save to database
      this.displacementDatabaseService.createDisplacement(displacementData as any).subscribe({
        next: (savedDisplacement) => {
          console.log('Post-displacement saved successfully:', savedDisplacement);
          this.submitStatus.set('success');
          alert('✅ تم حفظ بيانات النزع بعد التنظيم بنجاح');
          setTimeout(() => {
            this.submitStatus.set('idle');
            this.router.navigate(['/building-displacement-menu']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error saving displacement:', error);
          this.submitStatus.set('error');
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'حفظ بيانات النزع بعد التنظيم'
          );
          alert(errorMessage);
          setTimeout(() => this.submitStatus.set('idle'), 3000);
        }
      });
    } else {
      this.submitStatus.set('error');
      this.markFormGroupTouched(this.displacementPostForm);
      alert('⚠️ الرجاء ملء جميع الحقول المطلوبة');
      setTimeout(() => this.submitStatus.set('idle'), 3000);
    }
  }

  protected onReset(): void {
    this.displacementPostForm.reset();
    this.submitStatus.set('idle');
  }

  protected selectOption(optionId: number): void {
    console.log('Selected option:', optionId);
    if (optionId === 1) {
      this.showFinalCompensationModal.set(true);
    } else if (optionId === 2) {
      this.showDisplayListsModal.set(true);
    } else if (optionId === 3) {
      this.showConformityCertificatesModal.set(true);
    } else if (optionId === 4) {
      this.showMinisterDecisionModal.set(true);
    } else if (optionId === 5) {
      this.showRealEstateUnitModal.set(true);
    } else if (optionId === 6) {
      this.showSaleFormsModal.set(true);
    }
  }

  // Final Compensation Methods
  protected closeFinalCompensationModal(): void {
    this.showFinalCompensationModal.set(false);
    this.finalCompensationForm.reset();
  }

  protected submitFinalCompensation(): void {
    if (this.finalCompensationForm.valid) {
      const newCompensation = this.finalCompensationForm.value;
      this.finalCompensationList.update(list => [...list, newCompensation]);
      this.finalCompensationForm.reset();
      console.log('Final Compensation List:', this.finalCompensationList());
    } else {
      this.markFormGroupTouched(this.finalCompensationForm);
    }
  }

  protected deleteFinalCompensation(index: number): void {
    this.finalCompensationList.update(list => list.filter((_, i) => i !== index));
  }

  // Display Lists Methods
  protected closeDisplayListsModal(): void {
    this.showDisplayListsModal.set(false);
    this.displayListsForm.reset();
  }

  protected submitDisplayLists(): void {
    if (this.displayListsForm.valid) {
      this.displayListsList.update(list => [...list, this.displayListsForm.value]);
      this.displayListsForm.reset();
    } else {
      this.markFormGroupTouched(this.displayListsForm);
    }
  }

  protected deleteDisplayLists(index: number): void {
    this.displayListsList.update(list => list.filter((_, i) => i !== index));
  }

  // Conformity Certificates Methods
  protected closeConformityCertificatesModal(): void {
    this.showConformityCertificatesModal.set(false);
    this.conformityCertificatesForm.reset();
  }

  protected submitConformityCertificates(): void {
    if (this.conformityCertificatesForm.valid) {
      this.conformityCertificatesList.update(list => [...list, this.conformityCertificatesForm.value]);
      this.conformityCertificatesForm.reset();
    } else {
      this.markFormGroupTouched(this.conformityCertificatesForm);
    }
  }

  protected deleteConformityCertificates(index: number): void {
    this.conformityCertificatesList.update(list => list.filter((_, i) => i !== index));
  }

  // Real Estate Unit Methods
  protected closeRealEstateUnitModal(): void {
    this.showRealEstateUnitModal.set(false);
    this.realEstateUnitForm.reset();
  }

  protected submitRealEstateUnit(): void {
    if (this.realEstateUnitForm.valid) {
      this.realEstateUnitList.update(list => [...list, this.realEstateUnitForm.value]);
      this.realEstateUnitForm.reset();
    } else {
      this.markFormGroupTouched(this.realEstateUnitForm);
    }
  }

  protected deleteRealEstateUnit(index: number): void {
    this.realEstateUnitList.update(list => list.filter((_, i) => i !== index));
  }

  // Sale Forms Methods
  protected closeSaleFormsModal(): void {
    this.showSaleFormsModal.set(false);
    this.saleFormsForm.reset();
  }

  protected submitSaleForms(): void {
    if (this.saleFormsForm.valid) {
      this.saleFormsList.update(list => [...list, this.saleFormsForm.value]);
      this.saleFormsForm.reset();
    } else {
      this.markFormGroupTouched(this.saleFormsForm);
    }
  }

  protected deleteSaleForms(index: number): void {
    this.saleFormsList.update(list => list.filter((_, i) => i !== index));
  }

  // Minister Decision Methods
  protected closeMinisterDecisionModal(): void {
    this.showMinisterDecisionModal.set(false);
    this.ministerDecisionForm.reset();
  }

  protected submitMinisterDecision(): void {
    if (this.ministerDecisionForm.valid) {
      this.ministerDecisionList.update(list => [...list, this.ministerDecisionForm.value]);
      this.ministerDecisionForm.reset();
    } else {
      this.markFormGroupTouched(this.ministerDecisionForm);
    }
  }

  protected deleteMinisterDecision(index: number): void {
    this.ministerDecisionList.update(list => list.filter((_, i) => i !== index));
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
