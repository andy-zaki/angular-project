import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

interface MapOption {
  id: number;
  title: string;
  icon: string;
  description: string;
  route: string;
}

interface BuildingData {
  buildingNumber: string;
  schoolName: string;
  usageStatus: string;
  affiliation: string;
  buildingOwnership: string;
}

@Component({
  selector: 'app-school-map-inquiry',
  templateUrl: './school-map-inquiry.html',
  styleUrl: './school-map-inquiry.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class SchoolMapInquiryComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  inquiryForm!: FormGroup;
  showModal = signal<boolean>(false);
  searchResults = signal<BuildingData[]>([]);

  mapOptions: MapOption[] = [
    {
      id: 1,
      title: 'بيانات الفترة الدراسية',
      icon: '📅',
      description: 'معلومات الفترات الدراسية',
      route: '/school-map-study-period'
    },
    {
      id: 2,
      title: 'بيانات الطرق المحيطة',
      icon: '🛣️',
      description: 'الطرق المحيطة بالمدرسة',
      route: '/school-map-roads'
    },
    {
      id: 3,
      title: 'بيانات الملاحق',
      icon: '🏗️',
      description: 'معلومات الملاحق والإضافات',
      route: '/school-map-annexes'
    },
    {
      id: 4,
      title: 'تسجيل بيانات الفراغات',
      icon: '📋',
      description: 'تسجيل الفراغات في المبنى',
      route: '/school-map-spaces'
    }
  ];

  constructor() {
    this.inquiryForm = this.fb.group({
      governorate: ['', Validators.required],
      regionalCenter: ['', Validators.required],
      educationalAdministration: ['', Validators.required],
      district: ['', Validators.required],
      neighborhood: ['', Validators.required],
      villageAffiliate: [''],
      
      // Characteristics
      stage: ['', Validators.required],
      affiliation: ['', Validators.required],
      educationType: ['', Validators.required],
      studentType: ['', Validators.required],
      landOwnership: ['', Validators.required],
      buildingOwnership: ['', Validators.required],
      usageStatus: ['', Validators.required],
      buildingName: ['', Validators.required],
      buildingNumber: ['', Validators.required]
    });
  }

  onSearch() {
    if (this.inquiryForm.valid) {
      console.log('Search Data:', this.inquiryForm.value);
      
      // Dummy data for demonstration
      const dummyResults: BuildingData[] = [
        {
          buildingNumber: '12345',
          schoolName: 'مدرسة النور الابتدائية',
          usageStatus: 'قيد الاستخدام',
          affiliation: 'حكومي',
          buildingOwnership: 'ملك'
        },
        {
          buildingNumber: '67890',
          schoolName: 'مدرسة الأمل الإعدادية',
          usageStatus: 'قيد الاستخدام',
          affiliation: 'حكومي',
          buildingOwnership: 'إيجار'
        },
        {
          buildingNumber: '11223',
          schoolName: 'مدرسة المستقبل الثانوية',
          usageStatus: 'غير مستخدم',
          affiliation: 'خاص',
          buildingOwnership: 'ملك'
        }
      ];

      this.searchResults.set(dummyResults);
      this.showModal.set(true);
    } else {
      this.markFormGroupTouched(this.inquiryForm);
    }
  }

  closeModal() {
    this.showModal.set(false);
  }

  onReset() {
    this.inquiryForm.reset();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  navigateToOption(route: string) {
    this.router.navigate([route]);
  }

  navigateBack() {
    this.router.navigate(['/educational-building']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
