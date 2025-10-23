import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

interface RentalStatusOption {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
}

@Component({
  selector: 'app-rental-status-menu',
  templateUrl: './rental-status-menu.html',
  styleUrl: './rental-status-menu.css',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentalStatusMenuComponent {
  private router = inject(Router);

  protected statusOptions: RentalStatusOption[] = [
    {
      id: 1,
      title: 'بيان بموقف المباني المؤجرة',
      description: 'عرض الإحصائيات والبيانات الشاملة لموقف المباني المؤجرة',
      icon: '📊',
      color: '#3b82f6',
      route: '/rental-status-report'
    },
    {
      id: 2,
      title: 'مدارس مؤجرة (صدر لها قرار مجلس حلي)',
      description: 'جدول بالمدارس المؤجرة التي صدر لها قرار مجلس محلي',
      icon: '📋',
      color: '#10b981',
      route: '/rental-decision-buildings'
    },
    {
      id: 3,
      title: 'استعلام عن موقع مبنى مؤجرة',
      description: 'البحث والاستعلام عن موقف مبنى مؤجر معين',
      icon: '🔍',
      color: '#f59e0b',
      route: '/rental-inquiry-building'
    }
  ];

  protected goBack(): void {
    this.router.navigate(['/applications-menu']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected navigateToOption(route: string): void {
    this.router.navigate([route]);
  }
}
