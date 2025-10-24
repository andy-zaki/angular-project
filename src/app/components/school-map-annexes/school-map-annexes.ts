import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

interface AnnexData {
  buildingName: string;
  floorsCount: number;
  totalArea: string;
  structuralCondition: {
    structure: string;
    electricity: string;
    interiorFinishing: string;
    sanitary: string;
    expansionCapability: string;
    constructionDate: string;
  };
  construction: {
    constructionSystem: string;
    constructionMethod: string;
    buildingMaterials: {
      walls: string;
      ceilings: string;
    };
    facadeFinishing: string;
  };
  finishingTable: {
    floors: { classrooms: string; corridors: string; bathrooms: string; labs: string; other: string };
    walls: { classrooms: string; corridors: string; bathrooms: string; labs: string; other: string };
    ceilings: { classrooms: string; corridors: string; bathrooms: string; labs: string; other: string };
  };
}

@Component({
  selector: 'app-school-map-annexes',
  templateUrl: './school-map-annexes.html',
  styleUrl: './school-map-annexes.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class SchoolMapAnnexesComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  searchForm: FormGroup;
  showDetails = signal<boolean>(false);
  annexData = signal<AnnexData | null>(null);

  constructor() {
    this.searchForm = this.fb.group({
      buildingCode: ['', [Validators.required]],
      annexSerial: ['', [Validators.required]]
    });
  }

  onSearch() {
    if (this.searchForm.valid) {
      // Simulate data fetch - replace with actual API call
      this.annexData.set({
        buildingName: 'مبنى النور التعليمي',
        floorsCount: 3,
        totalArea: '1200 م²',
        structuralCondition: {
          structure: 'جيد',
          electricity: 'جيد جداً',
          interiorFinishing: 'متوسط',
          sanitary: 'جيد',
          expansionCapability: 'قابل للتعلية بدورين',
          constructionDate: '2015-05-20'
        },
        construction: {
          constructionSystem: 'هيكل خرساني',
          constructionMethod: 'صب في الموقع',
          buildingMaterials: {
            walls: 'طوب أحمر',
            ceilings: 'بلاطات خرسانية'
          },
          facadeFinishing: 'دهانات خارجية'
        },
        finishingTable: {
          floors: {
            classrooms: 'بلاط سيراميك',
            corridors: 'بلاط موزاييك',
            bathrooms: 'بلاط سيراميك مضاد للانزلاق',
            labs: 'إيبوكسي',
            other: 'رخام'
          },
          walls: {
            classrooms: 'دهان بلاستيك',
            corridors: 'دهان زيتي',
            bathrooms: 'سيراميك حوائط',
            labs: 'دهان إيبوكسي',
            other: 'ورق حائط'
          },
          ceilings: {
            classrooms: 'جبس بورد',
            corridors: 'دهان مباشر',
            bathrooms: 'ألواح PVC',
            labs: 'جبس بورد معلق',
            other: 'أسقف معلقة'
          }
        }
      });
      this.showDetails.set(true);
    } else {
      this.markFormGroupTouched(this.searchForm);
    }
  }

  onReset() {
    this.searchForm.reset();
    this.showDetails.set(false);
    this.annexData.set(null);
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
