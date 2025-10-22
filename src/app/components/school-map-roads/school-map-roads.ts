import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-school-map-roads',
  templateUrl: './school-map-roads.html',
  styleUrl: './school-map-roads.css',
  imports: [CommonModule, HeaderComponent]
})
export class SchoolMapRoadsComponent {
  private router = inject(Router);

  roads = [
    { id: 1, name: 'الطريق الرئيسي الشمالي', width: '20 م', length: '500 م' },
    { id: 2, name: 'الطريق الجنوبي', width: '15 م', length: '300 م' }
  ];

  navigateBack() {
    this.router.navigate(['/school-map-inquiry']);
  }
}
