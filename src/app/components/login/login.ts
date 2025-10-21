import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  protected loginForm: FormGroup;
  protected isLoading = signal(false);
  protected errorMessage = signal('');

  // Sample data for dropdowns
  protected programs = [
    { id: 1, name: 'البرنامج أ' },
    { id: 2, name: 'البرنامج ب' },
    { id: 3, name: 'البرنامج ج' }
  ];

  protected menus = [
    { id: 1, name: 'القائمة الرئيسية' },
    { id: 2, name: 'قائمة الإدارة' },
    { id: 3, name: 'قائمة المستخدم' }
  ];

  protected libraries = [
    { id: 1, name: 'المكتبة الأولى' },
    { id: 2, name: 'المكتبة الثانية' },
    { id: 3, name: 'المكتبة الثالثة' }
  ];

  constructor() {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    //   program: ['', Validators.required],
    //   menu: ['', Validators.required],
    //   currentLibrary: ['', Validators.required]
      program: [''],
      menu: [''], 
      currentLibrary: [''] 
    });
  }

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      // Simulate login process
      setTimeout(() => {
        console.log('Login form submitted:', this.loginForm.value);
        this.isLoading.set(false);
        // Navigate to dashboard on successful login
        this.router.navigate(['/dashboard']);
      }, 1500);
    } else {
      this.errorMessage.set('الرجاء ملء جميع الحقول المطلوبة بشكل صحيح.');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  protected getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} مطلوب`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} يجب أن يكون على الأقل ${requiredLength} أحرف`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      user: 'المستخدم',
      password: 'كلمة المرور',
      program: 'البرنامج/الإجراء',
      menu: 'القائمة',
      currentLibrary: 'المكتبة الحالية'
    };
    return displayNames[fieldName] || fieldName;
  }
}