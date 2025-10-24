import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-building-annexes-data',
  templateUrl: './building-annexes-data.html',
  styleUrl: './building-annexes-data.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class BuildingAnnexesDataComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  buildingNumberForm: FormGroup;
  annexesForm: FormGroup;
  showForm = signal<boolean>(false);

  constructor() {
    this.buildingNumberForm = this.fb.group({
      buildingNumber: ['', [Validators.required]]
    });

    this.annexesForm = this.fb.group({
      annexes: this.fb.array([this.createAnnexFormGroup(1)])
    });
  }

  get annexes(): FormArray {
    return this.annexesForm.get('annexes') as FormArray;
  }

  createAnnexFormGroup(id: number): FormGroup {
    return this.fb.group({
      id: [id],
      totalFloors: ['', [Validators.required, Validators.min(1)]],
      structureCondition: ['', [Validators.required]],
      totalArea: ['', [Validators.required]],
      constructionDate: ['', [Validators.required]],
      interiorFinishingCondition: ['', [Validators.required]],
      expansionCapability: ['', [Validators.required]],
      constructionSystem: ['', [Validators.required]],
      constructionMethod: ['', [Validators.required]],
      ceilingMaterials: ['', [Validators.required]],
      wallMaterials: ['', [Validators.required]],
      exteriorFacadeFinishing: ['', [Validators.required]],
      sanitaryWorks: ['', [Validators.required]],
      electricalWorks: ['', [Validators.required]]
    });
  }

  searchBuilding() {
    if (this.buildingNumberForm.valid) {
      this.showForm.set(true);
    } else {
      this.buildingNumberForm.get('buildingNumber')?.markAsTouched();
      alert('الرجاء إدخال رقم المبني');
    }
  }

  addAnnex() {
    const newId = this.annexes.length + 1;
    this.annexes.push(this.createAnnexFormGroup(newId));
  }

  removeAnnex(index: number) {
    if (this.annexes.length > 1) {
      this.annexes.removeAt(index);
    }
  }

  submitData() {
    if (this.annexesForm.valid) {
      console.log('Annexes data submitted:', this.annexesForm.value);
      alert('تم حفظ بيانات الملاحق بنجاح! ✓');
      this.router.navigate(['/building-data-completion']);
    } else {
      this.markFormGroupTouched(this.annexesForm);
      alert('الرجاء ملء جميع الحقول المطلوبة في جميع الملاحق');
    }
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }

  getAnnexControl(index: number, field: string) {
    return this.annexes.at(index).get(field);
  }

  navigateBack() {
    this.router.navigate(['/building-data-completion']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
