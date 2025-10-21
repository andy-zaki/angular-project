import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuOption {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: () => void;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [CommonModule]
})
export class DashboardComponent {
  private router = inject(Router);
  
  protected userInfo = signal({
    name: 'المستخدم', // Default user name in Arabic
    lastLogin: new Date().toLocaleDateString('ar-SA')
  });

  protected menuOptions: MenuOption[] = [
    {
      id: 1,
      title: 'تطبيقات',
      description: 'الوصول إلى التطبيقات والبرامج المختلفة',
      icon: '🔧',
      color: '#667eea',
      action: () => this.navigateToApplications()
    },
    {
      id: 2,
      title: 'قواعد بيانات',
      description: 'إدارة والوصول إلى قواعد البيانات',
      icon: '🗄️',
      color: '#764ba2',
      action: () => this.navigateToDatabases()
    }
  ];

  private navigateToApplications(): void {
    this.router.navigate(['/applications-menu']);
  }

  private navigateToDatabases(): void {
    // For now, just show an alert - you can implement actual navigation later
    alert('تم النقر على قواعد بيانات - سيتم تطوير هذه الميزة قريباً');
  }

  protected logout(): void {
    // Clear any stored user data and navigate back to login
    const confirmLogout = confirm('هل أنت متأكد من أنك تريد تسجيل الخروج؟');
    if (confirmLogout) {
      this.router.navigate(['/login']);
    }
  }

  protected onMenuClick(option: MenuOption): void {
    option.action();
  }
}