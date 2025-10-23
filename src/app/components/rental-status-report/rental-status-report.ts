import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

interface StatusStatistic {
  label: string;
  value: number;
  percentage: number;
  color: string;
  closed: number;    // مغلق
  working: number;   // تعمل
}

@Component({
  selector: 'app-rental-status-report',
  templateUrl: './rental-status-report.html',
  styleUrl: './rental-status-report.css',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentalStatusReportComponent {
  private router = inject(Router);

  protected statistics: StatusStatistic[] = [
    {
      label: 'دراسة الاحتياج',
      value: 45,
      percentage: 18,
      color: '#3b82f6',
      closed: 12,
      working: 33
    },
    {
      label: 'صلاحية الموقع',
      value: 38,
      percentage: 15,
      color: '#10b981',
      closed: 8,
      working: 30
    },
    {
      label: 'استكمال بيانات',
      value: 52,
      percentage: 21,
      color: '#f59e0b',
      closed: 15,
      working: 37
    },
    {
      label: 'اعتمادات اللجنة',
      value: 35,
      percentage: 14,
      color: '#8b5cf6',
      closed: 10,
      working: 25
    },
    {
      label: 'تدرس باللجنة',
      value: 42,
      percentage: 17,
      color: '#ef4444',
      closed: 13,
      working: 29
    },
    {
      label: 'توقيع م. الهيئة',
      value: 38,
      percentage: 15,
      color: '#06b6d4',
      closed: 9,
      working: 29
    }
  ];

  protected totalCount = this.statistics.reduce((sum, stat) => sum + stat.value, 0);

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
