import { Injectable } from '@angular/core';

/**
 * Notification Service
 * Handles displaying notifications to users
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  /**
   * Show success message
   */
  success(message: string): void {
    // For now using alert, can be replaced with toast/snackbar
    alert(`✓ ${message}`);
  }

  /**
   * Show error message
   */
  error(message: string): void {
    alert(`✗ ${message}`);
  }

  /**
   * Show warning message
   */
  warning(message: string): void {
    alert(`⚠ ${message}`);
  }

  /**
   * Show info message
   */
  info(message: string): void {
    alert(`ℹ ${message}`);
  }

  /**
   * Show API error with details
   */
  apiError(error: any): void {
    const message = error?.message || error?.error?.message || 'حدث خطأ غير متوقع';
    this.error(message);
  }

  /**
   * Clear all notifications
   */
  clearAll(): void {
    // Implementation for clearing notifications
    console.log('Clearing all notifications');
  }
}
