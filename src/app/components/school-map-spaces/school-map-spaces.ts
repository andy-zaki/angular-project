import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-school-map-spaces',
  templateUrl: './school-map-spaces.html',
  styleUrl: './school-map-spaces.css',
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class SchoolMapSpacesComponent {
  private router = inject(Router);

  spaces = [
    { id: 1, name: 'الفصل 101', floor: 1, area: '50 م²', capacity: 30, status: 'جيد' },
    { id: 2, name: 'الفصل 102', floor: 1, area: '50 م²', capacity: 28, status: 'جيد' },
    { id: 3, name: 'الفصل 201', floor: 2, area: '50 م²', capacity: 32, status: 'يحتاج صيانة' }
  ];

  navigateBack() {
    this.router.navigate(['/school-map-inquiry']);
  }
}
