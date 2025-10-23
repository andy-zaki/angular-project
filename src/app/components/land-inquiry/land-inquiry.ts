import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

interface LandData {
  id: string;
  referenceNumber: string;
  usageStatus: string;
  headquarters: string;
  approvalStatus: string;
  identificationNumber: string;
  centerDepartment: string;
  totalArea: number;
  phase: string;
  approval: string;
  housing: string;
  committeePricing: string;
  purchasePrice: string;
  saleNegotiations: string;
  landCode: string;
  village: string;
  currentOwner: string;
  originalOwner: string;
  model: string;
  documents: string;
  plan: string;
  branchNotification: string;
  realEstateStatus: string;
  // New availability fields
  buildingBoundaries: string;
  networkData: string;
  networkObservations: string;
  landAreaFromTotal: string;
  landUseDatabase: string;
  landInspectionDatabase: string;
  landConstructionObstacles: string;
  landCreationObstacles: string;
  landConstructionData: string;
  landReceiptDatabase: string;
  paidAmountsDatabase: string;
  decisionData: string;
  landCommittees: string;
  landFacilities: string;
  landCoordinatesData: string;
  educationalStudies: string;
  landReviewCommittees: string;
}

interface BuildingLocationData {
  id: string;
  code: string;
  locationName: string;
  coordinates: number;
  status: string;
  requiredStatus: string;
}

@Component({
  selector: 'app-land-inquiry',
  templateUrl: './land-inquiry.html',
  styleUrl: './land-inquiry.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class LandInquiryComponent {
  private router = inject(Router);
  private location = inject(Location);
  private fb = inject(FormBuilder);
  
  protected searchForm: FormGroup;
  protected isSearching = signal(false);
  protected hasSearched = signal(false);
  protected landData = signal<LandData | null>(null);
  protected showFullData = signal(false);
  
  // Popup signals
  protected showBuildingPopup = signal(false);
  protected buildingData = signal<BuildingLocationData[]>([]);
  protected showLandCoordinatesPopup = signal(false);
  protected showLandDataPopup = signal(false);
  protected showDataAvailabilityPopup = signal(false);
  
  constructor() {
    this.searchForm = this.fb.group({
      referenceNumber: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  protected onSearch(): void {
    if (this.searchForm.valid) {
      this.isSearching.set(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const referenceNumber = this.searchForm.get('referenceNumber')?.value;
        const mockData = this.generateMockLandData(referenceNumber);
        this.landData.set(mockData);
        this.hasSearched.set(true);
        this.isSearching.set(false);
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  protected onReset(): void {
    this.searchForm.reset();
    this.landData.set(null);
    this.hasSearched.set(false);
    this.showFullData.set(false);
  }

  protected goBack(): void {
    this.location.back();
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected openBuildingInquiry(): void {
    const mockBuildingData = this.generateMockBuildingData();
    this.buildingData.set(mockBuildingData);
    this.showBuildingPopup.set(true);
  }

  protected closeBuildingPopup(): void {
    this.showBuildingPopup.set(false);
  }

  protected navigateToLandData(): void {
    // Open land data popup
    this.showLandDataPopup.set(true);
  }

  protected navigateToDataAvailability(): void {
    // Open data availability popup
    this.showDataAvailabilityPopup.set(true);
  }

  protected closeDataAvailabilityPopup(): void {
    this.showDataAvailabilityPopup.set(false);
  }

  protected navigateToLandCoordinates(): void {
    // Open land coordinates popup
    this.showLandCoordinatesPopup.set(true);
  }

  protected navigateToBuildingInquiry(): void {
    // Open building inquiry popup
    this.openBuildingInquiry();
  }

  protected closeLandCoordinatesPopup(): void {
    this.showLandCoordinatesPopup.set(false);
  }

  protected closeLandDataPopup(): void {
    this.showLandDataPopup.set(false);
  }

  protected showFullDisplay(): void {
    // Toggle full data display
    const newState = !this.showFullData();
    this.showFullData.set(newState);
    
    // Scroll to the full data section only when showing
    if (newState) {
      setTimeout(() => {
        const resultCard = document.querySelector('.result-card');
        resultCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  protected getFieldError(fieldName: string): string | null {
    const field = this.searchForm.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) {
        return 'الرقم التعريفى مطلوب';
      }
      if (field.errors['minlength']) {
        return 'الرقم التعريفى يجب أن يكون على الأقل 3 أرقام';
      }
    }
    return null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.searchForm.controls).forEach(key => {
      this.searchForm.get(key)?.markAsTouched();
    });
  }

  private generateMockLandData(referenceNumber: string): LandData {
    // Generate mock data based on the specified fields - return single result
    const mockData: LandData = {
      id: '1',
      referenceNumber: referenceNumber,
      usageStatus: 'مستخدم',
      headquarters: 'القاهرة - مدينة نصر',
      approvalStatus: 'معتمد',
      identificationNumber: '132513',
      centerDepartment: 'قسم عين شمس',
      totalArea: 1497.00,
      phase: 'المرحلة الأولى',
      approval: 'موافق',
      housing: 'تم التسكين',
      committeePricing: '150000',
      purchasePrice: '125000',
      saleNegotiations: 'مكتملة',
      landCode: 'CAL505',
      village: 'مدينة نصر',
      currentOwner: 'الهيئة العامة للأبنية التعليمية',
      originalOwner: 'ملك دولة',
      model: 'النموذج أ',
      documents: 'مكتملة',
      plan: 'خطة 2024-2025',
      branchNotification: 'تم الإخطار',
      realEstateStatus: 'موقف العقارية: نشط',
      // New availability fields
      buildingBoundaries: 'موجود',
      networkData: 'موجود',
      networkObservations: 'غير موجود',
      landAreaFromTotal: 'موجود',
      landUseDatabase: 'موجود',
      landInspectionDatabase: 'غير موجود',
      landConstructionObstacles: 'موجود',
      landCreationObstacles: 'غير موجود',
      landConstructionData: 'موجود',
      landReceiptDatabase: 'موجود',
      paidAmountsDatabase: 'غير موجود',
      decisionData: 'موجود',
      landCommittees: 'موجود',
      landFacilities: 'موجود',
      landCoordinatesData: 'موجود',
      educationalStudies: 'غير موجود',
      landReviewCommittees: 'موجود'
    };

    return mockData;
  }

  private generateMockBuildingData(): BuildingLocationData[] {
    return [
      {
        id: '01',
        code: 'شمال',
        locationName: 'شارع عبد الجواد',
        coordinates: 6.87,
        status: 'يوجد',
        requiredStatus: 'مطلوب'
      },
      {
        id: '02',
        code: 'شمال شرق',
        locationName: 'شارع عبد الجواد',
        coordinates: 56.47,
        status: 'يوجد',
        requiredStatus: 'مطلوب'
      },
      {
        id: '04',
        code: 'جنوب شرق',
        locationName: 'شارع سيدي بلال',
        coordinates: 20.48,
        status: 'يوجد',
        requiredStatus: 'مطلوب'
      },
      {
        id: '06',
        code: 'شمال غرب',
        locationName: 'شارع الزعيم',
        coordinates: 21.65,
        status: 'يوجد',
        requiredStatus: 'مطلوب'
      },
      {
        id: '08',
        code: 'جنوب غرب',
        locationName: 'ممر بعرض ...',
        coordinates: 57.42,
        status: 'يوجد',
        requiredStatus: 'مطلوب'
      }
    ];
  }
}