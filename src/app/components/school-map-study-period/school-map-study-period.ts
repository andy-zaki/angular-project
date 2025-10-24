import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

interface StudyPeriodData {
  period: string;
  schoolName: string;
  type: string;
  boysCount: number;
  girlsCount: number;
  periodStage: string;
}

@Component({
  selector: 'app-school-map-study-period',
  templateUrl: './school-map-study-period.html',
  styleUrl: './school-map-study-period.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class SchoolMapStudyPeriodComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);

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
      
      // Dummy data for demonstration
      const dummyData: StudyPeriodData[] = [
        {
          period: 'الفترة الصباحية',
          schoolName: 'مدرسة النور الابتدائية',
          type: 'ابتدائي',
          boysCount: 250,
          girlsCount: 230,
          periodStage: 'ابتدائي'
        },
        {
          period: 'الفترة المسائية',
          schoolName: 'مدرسة الأمل الإعدادية',
          type: 'إعدادي',
          boysCount: 180,
          girlsCount: 200,
          periodStage: 'إعدادي'
        }
      ];

      this.studyPeriodData.set(dummyData);
      this.showModal.set(true);
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
