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

  protected completedStatistics: StatusStatistic[] = [
    {
      label: 'اتخاذ ج. استيلاء',
      value: 28,
      percentage: 12,
      color: '#3b82f6',
      closed: 7,
      working: 21
    },
    {
      label: 'اخراج وشأن الادارة',
      value: 35,
      percentage: 15,
      color: '#10b981',
      closed: 10,
      working: 25
    },
    {
      label: 'رد للمالك (كلى)',
      value: 22,
      percentage: 9,
      color: '#f59e0b',
      closed: 5,
      working: 17
    },
    {
      label: 'رد للمالك (جزء)',
      value: 18,
      percentage: 8,
      color: '#8b5cf6',
      closed: 4,
      working: 14
    },
    {
      label: 'رد للمالك (شرط)',
      value: 25,
      percentage: 11,
      color: '#ef4444',
      closed: 6,
      working: 19
    },
    {
      label: 'اتخاذ نزع ملكية',
      value: 32,
      percentage: 14,
      color: '#06b6d4',
      closed: 8,
      working: 24
    },
    {
      label: 'الايقاف والتصفية',
      value: 15,
      percentage: 6,
      color: '#ec4899',
      closed: 3,
      working: 12
    },
    {
      label: 'استمرار الايجار',
      value: 40,
      percentage: 17,
      color: '#14b8a6',
      closed: 12,
      working: 28
    },
    {
      label: 'قبول التبرع',
      value: 12,
      percentage: 5,
      color: '#f97316',
      closed: 2,
      working: 10
    },
    {
      label: 'لجنة البت',
      value: 20,
      percentage: 8,
      color: '#a855f7',
      closed: 5,
      working: 15
    },
    {
      label: 'اتخاذ ج. شراء بعدب',
      value: 18,
      percentage: 8,
      color: '#84cc16',
      closed: 4,
      working: 14
    },
    {
      label: 'تفاوض على شراء',
      value: 16,
      percentage: 7,
      color: '#0ea5e9',
      closed: 3,
      working: 13
    }
  ];

  protected completedTotalCount = this.completedStatistics.reduce((sum, stat) => sum + stat.value, 0);

  protected finishedStatistics: StatusStatistic[] = [
    {
      label: 'تم التعويض بحكم',
      value: 34,
      percentage: 22,
      color: '#3b82f6',
      closed: 8,
      working: 26
    },
    {
      label: 'رد قبل معرفة الرقم',
      value: 28,
      percentage: 18,
      color: '#10b981',
      closed: 6,
      working: 22
    },
    {
      label: 'رد للمالك',
      value: 25,
      percentage: 16,
      color: '#f59e0b',
      closed: 5,
      working: 20
    },
    {
      label: 'شراء',
      value: 30,
      percentage: 19,
      color: '#8b5cf6',
      closed: 7,
      working: 23
    },
    {
      label: 'نزع الملكية',
      value: 22,
      percentage: 14,
      color: '#ef4444',
      closed: 4,
      working: 18
    },
    {
      label: 'تم التبرع',
      value: 12,
      percentage: 8,
      color: '#06b6d4',
      closed: 2,
      working: 10
    },
    {
      label: 'الاخراج وشأن الادارة',
      value: 18,
      percentage: 12,
      color: '#ec4899',
      closed: 3,
      working: 15
    },
    {
      label: 'الايقاف وتصفية مبني',
      value: 15,
      percentage: 10,
      color: '#14b8a6',
      closed: 3,
      working: 12
    }
  ];

  protected finishedTotalCount = this.finishedStatistics.reduce((sum, stat) => sum + stat.value, 0);

  protected notStudiedCount = 45; // لم تدرس

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
