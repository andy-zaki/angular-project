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
    { id: 1, name: 'Program A' },
    { id: 2, name: 'Program B' },
    { id: 3, name: 'Program C' }
  ];

  protected menus = [
    { id: 1, name: 'Main Menu' },
    { id: 2, name: 'Admin Menu' },
    { id: 3, name: 'User Menu' }
  ];

  protected libraries = [
    { id: 1, name: 'Library 1' },
    { id: 2, name: 'Library 2' },
    { id: 3, name: 'Library 3' }
  ];

  constructor() {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      program: ['', Validators.required],
      menu: ['', Validators.required],
      currentLibrary: ['', Validators.required]
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
      this.errorMessage.set('Please fill in all required fields correctly.');
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
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} must be at least ${requiredLength} characters`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      user: 'User',
      password: 'Password',
      program: 'Program/Procedure',
      menu: 'Menu',
      currentLibrary: 'Current Library'
    };
    return displayNames[fieldName] || fieldName;
  }
}