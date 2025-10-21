import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface EducationalBuildingOption {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: () => void;
}

@Component({
  selector: 'app-educational-building',
  templateUrl: './educational-building.html',
  styleUrl: './educational-building.css',
  imports: [CommonModule]
})
export class EducationalBuildingComponent {
  private router = inject(Router);

  protected buildingOptions: EducationalBuildingOption[] = [
    {
      id: 1,
      title: 'استعلام عن المبنى',
      description: 'البحث والاستعلام عن بيانات المباني التعليمية',
      icon: '🔍',
      color: '#3b82f6',
      action: () => this.navigateToOption('building-inquiry')
    },
    {
      id: 2,
      title: 'استعلام عن مدرسة معينة',
      description: 'البحث عن معلومات مدرسة محددة',
      icon: '🏫',
      color: '#10b981',
      action: () => this.navigateToOption('school-inquiry')
    },
    {
      id: 3,
      title: 'استعلام عن للمدينة الأداء أربع',
      description: 'معلومات خاصة بالمدينة والأداء',
      icon: '🏙️',
      color: '#f59e0b',
      action: () => this.navigateToOption('city-performance')
    },
    {
      id: 4,
      title: 'استعلام المشروعات الغير مسندة',
      description: 'عرض المشروعات التي لم يتم إسنادها بعد',
      icon: '📋',
      color: '#ef4444',
      action: () => this.navigateToOption('unassigned-projects')
    },
    {
      id: 5,
      title: 'بيان بالمدارس المغلقة',
      description: 'قائمة بالمدارس المغلقة وأسباب الإغلاق',
      icon: '🔒',
      color: '#8b5cf6',
      action: () => this.navigateToOption('closed-schools')
    },
    {
      id: 6,
      title: 'الاستعلام عن بيانات قطع الاراضى',
      description: 'معلومات قطع الأراضي المخصصة للمدارس',
      icon: '🗺️',
      color: '#06b6d4',
      action: () => this.navigateToOption('land-data')
    },
    {
      id: 7,
      title: 'بيان اجمالى المدارس الجرى',
      description: 'إحصائيات شاملة للمدارس الجارية',
      icon: '📊',
      color: '#84cc16',
      action: () => this.navigateToOption('running-schools-stats')
    },
    {
      id: 8,
      title: 'قائمة رقمية للمدارس',
      description: 'قاعدة بيانات رقمية لجميع المدارس',
      icon: '💾',
      color: '#f97316',
      action: () => this.navigateToOption('digital-schools-list')
    },
    {
      id: 9,
      title: 'استعلام عن الملفات التاريخية',
      description: 'الوصول إلى الأرشيف والملفات التاريخية',
      icon: '📜',
      color: '#6366f1',
      action: () => this.navigateToOption('historical-files')
    },
    {
      id: 10,
      title: 'اراضي تم الموافقة على البناء',
      description: 'قائمة الأراضي المعتمدة للبناء',
      icon: '✅',
      color: '#22c55e',
      action: () => this.navigateToOption('approved-construction')
    },
    {
      id: 11,
      title: 'بيانات مباني تعليمية مغلقة CL',
      description: 'تفاصيل المباني التعليمية المغلقة',
      icon: '🏛️',
      color: '#dc2626',
      action: () => this.navigateToOption('closed-buildings')
    },
    {
      id: 12,
      title: 'تقرير متابعة موقف الأراضي',
      description: 'تقارير دورية لمتابعة وضع الأراضي',
      icon: '📈',
      color: '#7c3aed',
      action: () => this.navigateToOption('land-status-report')
    },
    {
      id: 13,
      title: 'تسجيل ملاحظات على الأراضي مغاربة',
      description: 'تسجيل الملاحظات والتعليقات على الأراضي',
      icon: '📝',
      color: '#059669',
      action: () => this.navigateToOption('land-notes')
    }
  ];

  protected goBack(): void {
    this.router.navigate(['/applications']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected onOptionClick(option: EducationalBuildingOption): void {
    option.action();
  }

  private navigateToOption(optionKey: string): void {
    // For now, show alert with the option. Later you can implement specific routes
    const option = this.buildingOptions.find(opt => opt.action.toString().includes(optionKey));
    alert(`تم اختيار: ${option?.title}\nسيتم تطوير هذه الميزة قريباً`);
  }
}