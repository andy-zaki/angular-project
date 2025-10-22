import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-school-map-study-period',
  templateUrl: './school-map-study-period.html',
  styleUrl: './school-map-study-period.css',
  imports: [CommonModule, HeaderComponent]
})
export class SchoolMapStudyPeriodComponent {
  private router = inject(Router);

  studyPeriods = [
    { id: 1, name: 'الفترة الصباحية', startTime: '08:00', endTime: '13:00', students: 450 },
    { id: 2, name: 'الفترة المسائية', startTime: '14:00', endTime: '19:00', students: 380 }
  ];

  navigateBack() {
    this.router.navigate(['/school-map-inquiry']);
  }
}
