import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { BuildingApiService } from '../../services/building-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-building-annexes-data',
  templateUrl: './building-annexes-data.html',
  styleUrl: './building-annexes-data.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class BuildingAnnexesDataComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private buildingService = inject(BuildingApiService);
  private errorHandler = inject(ErrorHandlerService);

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
      const buildingNumber = this.buildingNumberForm.get('buildingNumber')?.value;
      
      // First, find or create the building
      this.buildingService.searchBuildings(buildingNumber).subscribe({
        next: (buildings: any[]) => {
          let buildingId: string;
          
          if (buildings && buildings.length > 0) {
            buildingId = buildings[0].id;
            this.saveAnnexes(buildingId);
          } else {
            // Create building first
            const buildingData = {
              buildingNumber: buildingNumber,
              schoolName: 'مبنى - ' + buildingNumber,
              governorate: 'غير محدد',
              regionalCenter: 'غير محدد',
              educationalAdministration: 'غير محدد',
              district: 'غير محدد',
              neighborhood: 'غير محدد'
            };
            
            this.buildingService.createBuilding(buildingData as any).subscribe({
              next: (created: any) => {
                this.saveAnnexes(created.id);
              },
              error: (error: any) => {
                const errorMessage = this.errorHandler.getUserFriendlyMessage(
                  error,
                  'إنشاء المبنى'
                );
                alert(errorMessage);
              }
            });
          }
        },
        error: (error: any) => {
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'البحث عن المبنى'
          );
          alert(errorMessage);
        }
      });
    } else {
      this.markFormGroupTouched(this.annexesForm);
      alert('الرجاء ملء جميع الحقول المطلوبة في جميع الملاحق');
    }
  }
  
  private saveAnnexes(buildingId: string) {
    const annexesData = this.annexesForm.value.annexes;
    let savedCount = 0;
    let errorOccurred = false;
    
    annexesData.forEach((annex: any, index: number) => {
      const annexData = {
        annexNumber: (index + 1).toString(),
        totalFloors: annex.totalFloors,
        structureCondition: annex.structureCondition,
        totalArea: annex.totalArea,
        constructionDate: annex.constructionDate,
        interiorFinishingCondition: annex.interiorFinishingCondition,
        expansionCapability: annex.expansionCapability === 'نعم',
        constructionSystem: annex.constructionSystem,
        constructionMethod: annex.constructionMethod,
        ceilingMaterials: annex.ceilingMaterials,
        wallMaterials: annex.wallMaterials,
        exteriorFacadeFinishing: annex.exteriorFacadeFinishing,
        sanitaryWorks: annex.sanitaryWorks,
        electricalWorks: annex.electricalWorks
      };
      
      this.buildingService.addBuildingAnnex(buildingId, annexData as any).subscribe({
        next: (saved: any) => {
          console.log('Annex saved:', saved);
          savedCount++;
          
          if (savedCount === annexesData.length && !errorOccurred) {
            alert('✅ تم حفظ جميع بيانات الملاحق بنجاح!');
            this.router.navigate(['/building-data-completion']);
          }
        },
        error: (error: any) => {
          errorOccurred = true;
          console.error('Error saving annex:', error);
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'حفظ بيانات الملحق رقم ' + (index + 1)
          );
          alert(errorMessage);
        }
      });
    });
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
