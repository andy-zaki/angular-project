import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

interface StatusStatistic {
  label: string;
  value: number;
  percentage: number;
  color: string;
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
      color: '#3b82f6'
    },
    {
      label: 'صلاحية الموقع',
      value: 38,
      percentage: 15,
      color: '#10b981'
    },
    {
      label: 'استكمال بيانات',
      value: 52,
      percentage: 21,
      color: '#f59e0b'
    },
    {
      label: 'اعتمادات اللجنة',
      value: 35,
      percentage: 14,
      color: '#8b5cf6'
    },
    {
      label: 'تدرس باللجنة',
      value: 42,
      percentage: 17,
      color: '#ef4444'
    },
    {
      label: 'توقيع م. الهيئة',
      value: 38,
      percentage: 15,
      color: '#06b6d4'
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
