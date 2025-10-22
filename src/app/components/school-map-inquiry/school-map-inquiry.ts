import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

interface MapOption {
  id: number;
  title: string;
  icon: string;
  description: string;
  route: string;
}

@Component({
  selector: 'app-school-map-inquiry',
  templateUrl: './school-map-inquiry.html',
  styleUrl: './school-map-inquiry.css',
  imports: [CommonModule, HeaderComponent]
})
export class SchoolMapInquiryComponent {
  private router = inject(Router);

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

  navigateToOption(route: string) {
    this.router.navigate([route]);
  }

  navigateBack() {
    this.router.navigate(['/educational-building']);
  }
}
