import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { SchoolMapApiService } from '../../services/school-map-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-school-map-roads',
  templateUrl: './school-map-roads.html',
  styleUrl: './school-map-roads.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolMapRoadsComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private schoolMapService = inject(SchoolMapApiService);
  private errorHandler = inject(ErrorHandlerService);

  roadsForm!: FormGroup;

  // Lookup data for dropdowns
  mainRoadTypes = [
    { code: '1', name: 'طريق سريع' },
    { code: '2', name: 'طريق رئيسي' },
    { code: '3', name: 'طريق فرعي' }
  ];

  movementDirections = [
    { code: '1', name: 'اتجاه واحد' },
    { code: '2', name: 'اتجاهين' }
  ];

  constructor() {
    this.roadsForm = this.fb.group({
      buildingCode: ['', Validators.required],
      centerCode: ['', Validators.required],
      branchCode: ['', Validators.required],
      mainRoadTypeCode: ['', Validators.required],
      roadWidth: ['', [Validators.required, Validators.min(0)]],
      movementDirectionCode: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.roadsForm.valid) {
      const formData = this.roadsForm.value;
      
      const roadData = {
        buildingCode: formData.buildingCode,
        centerCode: formData.centerCode,
        branchCode: formData.branchCode,
        mainRoadTypeCode: formData.mainRoadTypeCode,
        roadWidth: parseFloat(formData.roadWidth) || 0,
        movementDirectionCode: formData.movementDirectionCode
      };
      
      // Save to database
      this.schoolMapService.addSchoolRoad(roadData as any).subscribe({
        next: (saved: any) => {
          console.log('Road data saved:', saved);
          alert('✅ تم حفظ بيانات الطرق بنجاح');
          this.roadsForm.reset();
        },
        error: (error: any) => {
          console.error('Error saving road data:', error);
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'حفظ بيانات الطرق'
          );
          alert(errorMessage);
        }
      });
    } else {
      this.markFormGroupTouched(this.roadsForm);
    }
  }

  onReset() {
    this.roadsForm.reset();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getMainRoadTypeName(code: string): string {
    return this.mainRoadTypes.find(t => t.code === code)?.name || '';
  }

  getMovementDirectionName(code: string): string {
    return this.movementDirections.find(d => d.code === code)?.name || '';
  }

  navigateBack() {
    this.router.navigate(['/school-map-inquiry']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
