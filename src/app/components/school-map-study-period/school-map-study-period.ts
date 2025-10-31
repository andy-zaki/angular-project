import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { StudyPeriodData } from '../../models/school-map.model';
import { SchoolMapApiService } from '../../services/school-map-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-school-map-study-period',
  templateUrl: './school-map-study-period.html',
  styleUrl: './school-map-study-period.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class SchoolMapStudyPeriodComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private schoolMapDatabaseService = inject(SchoolMapApiService);
  private errorHandler = inject(ErrorHandlerService);

  searchForm!: FormGroup;
  showModal = signal<boolean>(false);
  studyPeriodData = signal<StudyPeriodData[]>([]);

  constructor() {
    this.searchForm = this.fb.group({
      buildingCode: ['', Validators.required],
      centerCode: ['', Validators.required],
      branchCode: ['', Validators.required]
    });
  }

  onSearch() {
    if (this.searchForm.valid) {
      console.log('Search Data:', this.searchForm.value);
      
      const buildingCode = this.searchForm.get('buildingCode')?.value;
      const centerCode = this.searchForm.get('centerCode')?.value;
      const branchCode = this.searchForm.get('branchCode')?.value;
      
      // Combine the codes or use buildingCode as primary identifier
      // For now, we'll use buildingCode as the main identifier
      // TODO: Backend might need to support searching by all three codes
      
      // Use mock database service to fetch study periods
      this.schoolMapDatabaseService.getStudyPeriodsByBuildingCode(buildingCode).subscribe({
        next: (periods) => {
          this.studyPeriodData.set(periods);
          this.showModal.set(true);
        },
        error: (error) => {
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'تحميل بيانات الفترات الدراسية'
          );
          alert(errorMessage);
        }
      });
    } else {
      this.markFormGroupTouched(this.searchForm);
    }
  }

  closeModal() {
    this.showModal.set(false);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
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
