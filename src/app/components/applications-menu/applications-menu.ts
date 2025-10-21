import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ApplicationMenuOption {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: () => void;
}

@Component({
  selector: 'app-applications-menu',
  templateUrl: './applications-menu.html',
  styleUrl: './applications-menu.css',
  imports: [CommonModule]
})
export class ApplicationsMenuComponent {
  private router = inject(Router);

  protected applicationMenuOptions: ApplicationMenuOption[] = [
    {
      id: 1,
      title: 'القائمة الرئيسية للتطبيقات',
      description: 'الوصول إلى جميع التطبيقات والبرامج المتاحة',
      icon: '📱',
      color: '#667eea',
      action: () => this.navigateToApplicationsList()
    },
    {
      id: 2,
      title: 'برنامج الاستعلام للمواقف',
      description: 'نظام الاستعلام عن المواقف والحجوزات',
      icon: '🅿️',
      color: '#10b981',
      action: () => this.navigateToParkingInquiry()
    }
  ];

  protected goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected onMenuClick(option: ApplicationMenuOption): void {
    option.action();
  }

  private navigateToApplicationsList(): void {
    this.router.navigate(['/applications']);
  }

  private navigateToParkingInquiry(): void {
    // For now, just show an alert. Later you can implement this route
    alert('برنامج الاستعلام للمواقف سيتم تطويره قريباً');
  }
}