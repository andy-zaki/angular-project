import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-school-map-annexes',
  templateUrl: './school-map-annexes.html',
  styleUrl: './school-map-annexes.css',
  imports: [CommonModule, HeaderComponent]
})
export class SchoolMapAnnexesComponent {
  private router = inject(Router);

  annexes = [
    { id: 1, name: 'المختبر العلمي', area: '100 م²', type: 'فصل خاص' },
    { id: 2, name: 'الملعب الرياضي', area: '1000 م²', type: 'ملعب' },
    { id: 3, name: 'المكتبة', area: '80 م²', type: 'مكتبة' }
  ];

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
