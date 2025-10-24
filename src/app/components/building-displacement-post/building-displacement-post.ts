import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-building-displacement-post',
  templateUrl: './building-displacement-post.html',
  styleUrl: './building-displacement-post.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingDisplacementPostComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  protected displacementPostForm: FormGroup;
  protected submitStatus = signal<'idle' | 'success' | 'error'>('idle');

  protected options = [
    { id: 1, title: 'التعويض النهائي', icon: '💰' },
    { id: 2, title: 'كشوف العرض', icon: '📊' },
    { id: 3, title: 'شهادات المطابقة', icon: '📜' },
    { id: 4, title: 'قرار الوزير المختص', icon: '📋' },
    { id: 5, title: 'صحيفة وحدة عقارية', icon: '🏠' },
    { id: 6, title: 'استمارات البيع', icon: '📝' }
  ];

  constructor() {
    this.displacementPostForm = this.fb.group({
      // Basic Information
      branchCode: ['', Validators.required],
      rentedBuildingCode: ['', Validators.required],

      // Cabinet Decision
      cabinetDecisionNumber: ['', Validators.required],
      cabinetDecisionDate: ['', Validators.required],

      // Official Gazette Publication
      publicationCount: ['', [Validators.required, Validators.min(0)]],
      publicationDate: ['', Validators.required],
      educationProject: ['', Validators.required],

      // Display Lists
      ownersCount: ['', [Validators.required, Validators.min(0)]],
      pricePerMeter: ['', [Validators.required, Validators.min(0)]],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],

      // Sale Forms
      formsCount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  protected navigateBack(): void {
    this.router.navigate(['/building-displacement-menu']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected onSubmit(): void {
    if (this.displacementPostForm.valid) {
      console.log('Form Data:', this.displacementPostForm.value);
      this.submitStatus.set('success');
      setTimeout(() => {
        this.submitStatus.set('idle');
        this.router.navigate(['/building-displacement-menu']);
      }, 2000);
    } else {
      this.submitStatus.set('error');
      this.markFormGroupTouched(this.displacementPostForm);
      setTimeout(() => this.submitStatus.set('idle'), 3000);
    }
  }

  protected onReset(): void {
    this.displacementPostForm.reset();
    this.submitStatus.set('idle');
  }

  protected selectOption(optionId: number): void {
    console.log('Selected option:', optionId);
    // Add navigation or action logic here based on optionId
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
