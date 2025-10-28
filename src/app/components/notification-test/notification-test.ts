import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';
import { NotificationService } from '../../services/notification.service';

/**
 * Notification Test Component
 * For testing notification service
 */
@Component({
  selector: 'app-notification-test',
  templateUrl: './notification-test.html',
  styleUrl: './notification-test.css',
  imports: [CommonModule, HeaderComponent]
})
export class NotificationTestComponent {
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  protected testSuccess(): void {
    this.notificationService.success('تم تنفيذ العملية بنجاح');
  }

  protected testError(): void {
    this.notificationService.error('حدث خطأ أثناء تنفيذ العملية');
  }

  protected testWarning(): void {
    this.notificationService.warning('تحذير: يرجى التحقق من البيانات');
  }

  protected testInfo(): void {
    this.notificationService.info('معلومات: البيانات محفوظة مؤقتاً');
  }

  protected testApiError(): void {
    this.notificationService.apiError({
      message: 'فشل الاتصال بالخادم',
      status: 500
    });
  }

  protected goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }
}
