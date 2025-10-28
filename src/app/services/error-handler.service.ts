import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
 * Error Handler Service
 * Centralized error handling for HTTP requests
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  /**
   * Handle HTTP errors and return user-friendly messages
   */
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'حدث خطأ غير متوقع'; // Default error message in Arabic

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `خطأ في الاتصال: ${error.error.message}`;
      console.error('Client-side error:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      switch (error.status) {
        case 0:
          errorMessage = 'لا يمكن الاتصال بالخادم. تأكد من تشغيل الخادم.';
          console.error('Cannot connect to server. Backend may be down.');
          break;
        case 400:
          errorMessage = 'البيانات المرسلة غير صحيحة أو غير مكتملة';
          console.error('Bad Request (400):', error.error);
          break;
        case 401:
          errorMessage = 'غير مصرح لك بالوصول. يرجى تسجيل الدخول.';
          console.error('Unauthorized (401)');
          break;
        case 403:
          errorMessage = 'ليس لديك صلاحية للوصول إلى هذا المورد';
          console.error('Forbidden (403)');
          break;
        case 404:
          errorMessage = 'البيانات المطلوبة غير موجودة';
          console.error('Not Found (404):', error.url);
          break;
        case 409:
          errorMessage = 'البيانات موجودة مسبقاً أو يوجد تعارض';
          console.error('Conflict (409):', error.error);
          break;
        case 500:
          errorMessage = 'خطأ في الخادم. يرجى المحاولة لاحقاً.';
          console.error('Internal Server Error (500):', error.error);
          break;
        case 503:
          errorMessage = 'الخدمة غير متوفرة حالياً. يرجى المحاولة لاحقاً.';
          console.error('Service Unavailable (503)');
          break;
        default:
          errorMessage = `خطأ من الخادم: ${error.status} - ${error.statusText}`;
          console.error(`Server Error (${error.status}):`, error.error);
      }
    }

    // Log full error for debugging
    console.error('Full error object:', error);

    return throwError(() => ({
      message: errorMessage,
      status: error.status,
      statusText: error.statusText,
      error: error.error
    }));
  }

  /**
   * Validate that required data exists
   */
  validateData<T>(data: T | null | undefined, dataName: string): T {
    if (data === null || data === undefined) {
      const errorMessage = `البيانات المطلوبة غير موجودة: ${dataName}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    return data;
  }

  /**
   * Validate array data is not empty
   */
  validateArrayData<T>(data: T[] | null | undefined, dataName: string): T[] {
    if (!data || data.length === 0) {
      const errorMessage = `لا توجد بيانات: ${dataName}`;
      console.warn(errorMessage);
      return [];
    }
    return data;
  }

  /**
   * Validate string data is not empty
   */
  validateString(value: string | null | undefined, fieldName: string): string {
    if (!value || value.trim() === '') {
      const errorMessage = `الحقل المطلوب فارغ: ${fieldName}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    return value;
  }

  /**
   * Validate GUID format
   */
  validateGuid(guid: string | null | undefined, fieldName: string): string {
    if (!guid) {
      throw new Error(`معرف فارغ: ${fieldName}`);
    }

    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!guidRegex.test(guid)) {
      throw new Error(`معرف غير صحيح: ${fieldName}`);
    }

    return guid;
  }

  /**
   * Log and display error to user
   */
  logAndShowError(error: any, context: string): void {
    console.error(`Error in ${context}:`, error);
    
    // You can integrate with a toast/snackbar service here
    const message = error.message || error.error?.message || 'حدث خطأ غير متوقع';
    alert(`خطأ في ${context}: ${message}`);
  }
}
