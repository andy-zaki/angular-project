import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

interface RentalBuilding {
  centerCode: string;
  centerName: string;
  buildingCode: string;
  buildingName: string;
  usageStatus: string; // موقف الاستخدام
}

@Component({
  selector: 'app-rental-decision-buildings',
  templateUrl: './rental-decision-buildings.html',
  styleUrl: './rental-decision-buildings.css',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentalDecisionBuildingsComponent {
  private router = inject(Router);

  protected buildings: RentalBuilding[] = [
    {
      centerCode: '001',
      centerName: 'مركز القاهرة',
      buildingCode: 'B001',
      buildingName: 'مدرسة الرازي الابتدائية',
      usageStatus: 'مدرسة'
    },
    {
      centerCode: '001',
      centerName: 'مركز القاهرة',
      buildingCode: 'B002',
      buildingName: 'مدرسة النيل الإعدادية',
      usageStatus: 'مؤجرة ولا تعمل'
    },
    {
      centerCode: '002',
      centerName: 'مركز الجيزة',
      buildingCode: 'B003',
      buildingName: 'مدرسة ابن سينا الثانوية',
      usageStatus: 'تم الغاؤه'
    },
    {
      centerCode: '002',
      centerName: 'مركز الجيزة',
      buildingCode: 'B004',
      buildingName: 'مدرسة الفارابي الابتدائية',
      usageStatus: 'مدرسة'
    },
    {
      centerCode: '003',
      centerName: 'مركز الإسكندرية',
      buildingCode: 'B005',
      buildingName: 'مدرسة الحسن بن الهيثم',
      usageStatus: 'مؤجرة ولا تعمل'
    },
    {
      centerCode: '003',
      centerName: 'مركز الإسكندرية',
      buildingCode: 'B006',
      buildingName: 'مدرسة الكندي الثانوية',
      usageStatus: 'مدرسة'
    },
    {
      centerCode: '004',
      centerName: 'مركز المنيا',
      buildingCode: 'B007',
      buildingName: 'مدرسة الخوارزمي الإعدادية',
      usageStatus: 'تم الغاؤه'
    },
    {
      centerCode: '004',
      centerName: 'مركز المنيا',
      buildingCode: 'B008',
      buildingName: 'مدرسة البيروني الابتدائية',
      usageStatus: 'مؤجرة ولا تعمل'
    }
  ];

  protected goBack(): void {
    this.router.navigate(['/rental-status-menu']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }
}
