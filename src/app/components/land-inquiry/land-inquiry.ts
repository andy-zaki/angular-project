import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { LandData, BuildingLocationData } from '../../models/land.model';
import { LandApiService } from '../../services/land-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { SortByCodePipe } from '../../pipes/sort-by-code.pipe';

@Component({
  selector: 'app-land-inquiry',
  templateUrl: './land-inquiry.html',
  styleUrl: './land-inquiry.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, SortByCodePipe]
})
export class LandInquiryComponent {
  private router = inject(Router);
  private location = inject(Location);
  private fb = inject(FormBuilder);
  private landDatabaseService = inject(LandApiService);
  private errorHandler = inject(ErrorHandlerService);
  
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
      
      const referenceNumber = this.searchForm.get('referenceNumber')?.value;
      
      // Use mock database service to fetch land data
      this.landDatabaseService.getLandByReferenceNumber(referenceNumber).subscribe({
        next: (data) => {
          this.landData.set(data);
          this.hasSearched.set(true);
          this.isSearching.set(false);
        },
        error: (error) => {
          this.isSearching.set(false);
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'البحث عن بيانات الأرض'
          );
          alert(errorMessage);
        }
      });
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
    const landId = this.landData()?.id;
    if (landId) {
      // Use mock database service to fetch building locations
      this.landDatabaseService.getBuildingLocationsByLandId(landId).subscribe({
        next: (buildings) => {
          this.buildingData.set(buildings);
          this.showBuildingPopup.set(true);
        },
        error: (error) => {
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'تحميل بيانات المباني'
          );
          alert(errorMessage);
        }
      });
    }
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
}