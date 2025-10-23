import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

interface Application {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  category?: string;
}

@Component({
  selector: 'app-applications',
  templateUrl: './applications.html',
  styleUrl: './applications.css',
  imports: [CommonModule, HeaderComponent]
})
export class ApplicationsComponent {
  protected router = inject(Router);

  protected applications: Application[] = [
    {
      id: 1,
      name: 'المبنى التعليمى',
      description: 'إدارة وتسجيل بيانات المباني التعليمية',
      icon: '🏫',
      color: '#3b82f6',
      category: 'تعليم'
    },
    {
      id: 2,
      name: 'خطة مرور المدارس اكثر من 15 عام',
      description: 'متابعة وتخطيط مرور المدارس القديمة',
      icon: '🚌',
      color: '#10b981',
      category: 'نقل'
    },
    {
      id: 3,
      name: 'تقييم الاداء للادارات',
      description: 'تقييم ومتابعة أداء الإدارات المختلفة',
      icon: '📊',
      color: '#8b5cf6',
      category: 'إدارة'
    },
    {
      id: 4,
      name: 'المكتبة',
      description: 'إدارة ونظام المكتبة والموارد التعليمية',
      icon: '📚',
      color: '#0891b2',
      category: 'تعليم'
    },
    {
      id: 5,
      name: 'حياة كريمة',
      description: 'برامج ومشاريع مبادرة حياة كريمة',
      icon: '🤝',
      color: '#f59e0b',
      category: 'اجتماعي'
    },
    {
      id: 5,
      name: 'حياة كريمة',
      description: 'برامج ومشاريع مبادرة حياة كريمة',
      icon: '🤝',
      color: '#f59e0b',
      category: 'اجتماعي'
    },
    {
      id: 6,
      name: 'الاراضي',
      description: 'إدارة وتسجيل بيانات الأراضي',
      icon: '🏞️',
      color: '#06b6d4',
      category: 'عقاري'
    },
    {
      id: 7,
      name: 'صيانة الحاسبات الالية',
      description: 'متابعة وإدارة صيانة الأجهزة الحاسوبية',
      icon: '💻',
      color: '#ef4444',
      category: 'تقني'
    },
    {
      id: 8,
      name: 'المتابعة الزمنية',
      description: 'نظام متابعة الجداول والمواعيد الزمنية',
      icon: '⏰',
      color: '#84cc16',
      category: 'إدارة'
    },
    {
      id: 9,
      name: 'ملكية عقارية موافقات',
      description: 'إدارة موافقات الملكية العقارية',
      icon: '🏘️',
      color: '#6366f1',
      category: 'عقاري'
    },
    {
      id: 10,
      name: 'مكاتب البريد',
      description: 'إدارة وتنظيم مكاتب البريد',
      icon: '📮',
      color: '#ec4899',
      category: 'خدمات'
    },
    {
      id: 11,
      name: 'الجدول الزمنى للصف السادس',
      description: 'إدارة الجدول الدراسي للصف السادس',
      icon: '📚',
      color: '#14b8a6',
      category: 'تعليم'
    },
    {
      id: 12,
      name: 'الخدمات المؤاداة للغير',
      description: 'إدارة الخدمات المقدمة للجهات الخارجية',
      icon: '🤝',
      color: '#f97316',
      category: 'خدمات'
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

  protected openApplication(app: Application): void {
    // Check if this is the educational building app
    if (app.id === 1 && app.name === 'المبنى التعليمى') {
      this.router.navigate(['/educational-building']);
      return;
    }
    
    // For other applications, show alert for now
    alert(`تم اختيار تطبيق: ${app.name}\nسيتم تطوير هذا التطبيق قريباً`);
  }

  protected getUniqueCategories(): string[] {
    const categories = this.applications
      .map(app => app.category || 'عام')
      .filter((category, index, self) => self.indexOf(category) === index);
    return categories.sort();
  }

  protected getApplicationsByCategory(category: string): Application[] {
    return this.applications.filter(app => (app.category || 'عام') === category);
  }
}