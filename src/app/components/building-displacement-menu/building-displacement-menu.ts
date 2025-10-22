import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

interface DisplacementOption {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
}

@Component({
  selector: 'app-building-displacement-menu',
  templateUrl: './building-displacement-menu.html',
  styleUrl: './building-displacement-menu.css',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingDisplacementMenuComponent {
  private router = inject(Router);

  protected displacementOptions: DisplacementOption[] = [
    {
      id: 1,
      title: 'إدخال بيانات نزع الملكية قبل قرار رئيس الوزراء',
      description: 'البيانات الأساسية لنزع الملكية قبل موافقة المجلس',
      icon: '📋',
      color: '#ef4444',
      route: '/building-displacement-pre'
    },
    {
      id: 2,
      title: 'إدخال بيانات نزع الملكية بعد قرار رئيس الوزراء',
      description: 'البيانات والمستندات بعد موافقة المجلس',
      icon: '✅',
      color: '#10b981',
      route: '/building-displacement-post'
    },
    {
      id: 3,
      title: 'إدخال بيانات شبكات تكاليف الاعمار',
      description: 'بيانات تكاليف شبكات البنية التحتية',
      icon: '🏗️',
      color: '#f59e0b',
      route: '/building-network-costs'
    },
    {
      id: 4,
      title: 'إدخال بيانات الاستيفاء المؤقت',
      description: 'معلومات الاستيفاء المؤقت للعقارات',
      icon: '⏳',
      color: '#06b6d4',
      route: '/building-temporary-fulfillment'
    },
    {
      id: 5,
      title: 'طلب تسليم العقار',
      description: 'تقديم طلب تسليم العقار بعد الإجراءات',
      icon: '🎁',
      color: '#8b5cf6',
      route: '/building-property-handover'
    }
  ];

  protected goBack(): void {
    this.router.navigate(['/educational-building']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected navigateToOption(route: string): void {
    this.router.navigate([route]);
  }
}
