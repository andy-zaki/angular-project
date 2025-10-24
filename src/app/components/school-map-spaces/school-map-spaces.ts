import { Component, inject, signal } from '@angular/core';
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

  schoolNumber = signal<string>('12345');
  schoolName = signal<string>('مدرسة النور الابتدائية');

  spaces = [
    { annex: 'ملحق 1', floor: 'الدور الأول', code: '001', serial: '1001', branchName: 'فرع النور', area: '50 م²' },
    { annex: 'ملحق 1', floor: 'الدور الأول', code: '002', serial: '1002', branchName: 'فرع النور', area: '45 م²' },
    { annex: 'ملحق 2', floor: 'الدور الثاني', code: '003', serial: '2001', branchName: 'فرع الأمل', area: '60 م²' },
    { annex: 'ملحق 2', floor: 'الدور الثاني', code: '004', serial: '2002', branchName: 'فرع الأمل', area: '55 م²' },
    { annex: 'ملحق 3', floor: 'الدور الأرضي', code: '005', serial: '0001', branchName: 'فرع الهدى', area: '70 م²' }
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
