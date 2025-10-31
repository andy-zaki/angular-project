import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { EducationalBuildingData } from '../../models/school-map.model';
import { SchoolMapApiService } from '../../services/school-map-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

type ViewMode = 'search' | 'view' | 'create' | 'edit';

@Component({
  selector: 'app-building-inquiry',
  templateUrl: './building-inquiry.html',
  styleUrl: './building-inquiry.css',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class BuildingInquiryComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private schoolMapService = inject(SchoolMapApiService);
  private errorHandler = inject(ErrorHandlerService);

  viewMode = signal<ViewMode>('search');
  searchForm!: FormGroup;
  buildingForm!: FormGroup;
  searchResults = signal<EducationalBuildingData[]>([]);
  selectedBuilding = signal<EducationalBuildingData | null>(null);
  showModal = signal<boolean>(false);

  positiveEnvironments = [
    { code: '1', name: 'الفترات الدراسية' },
    { code: '2', name: 'حدود الموقع العام' },
    { code: '3', name: 'الملاعب' },
    { code: '4', name: 'البوبات' },
    { code: '5', name: 'الملاحق' },
    { code: '6', name: 'المساحات' },
    { code: '7', name: 'شبكات الحريق' },
    { code: '8', name: 'المناسيب' },
    { code: '9', name: 'التغذية بالمياه' },
    { code: '10', name: 'الغاز الطبيعي' },
    { code: '11', name: 'الصرف الصحي' },
    { code: '12', name: 'التوصيلات الكهربائية' },
    { code: '13', name: 'التجهيزات الصحية' },
    { code: '14', name: 'الفراغات' }
  ];

  negativeEnvironments = [
    { code: '1', name: 'الفترات الدراسية' },
    { code: '2', name: 'حدود الموقع العام' },
    { code: '3', name: 'الملاعب' },
    { code: '4', name: 'البوبات' },
    { code: '5', name: 'الملاحق' },
    { code: '6', name: 'المساحات' },
    { code: '7', name: 'شبكات الحريق' },
    { code: '8', name: 'المناسيب' },
    { code: '9', name: 'التغذية بالمياه' },
    { code: '10', name: 'الغاز الطبيعي' },
    { code: '11', name: 'الصرف الصحي' },
    { code: '12', name: 'التوصيلات الكهربائية' },
    { code: '13', name: 'التجهيزات الصحية' },
    { code: '14', name: 'الفراغات' }
  ];

  constructor() {
    this.initializeForms();
    
    // Check if building code is provided in route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBuildingByCode(id);
    }
  }

  private initializeForms() {
    // Search form
    this.searchForm = this.fb.group({
      buildingNumber: [''],
      schoolName: ['']
    });

    // Building form for create/edit - matching building-basic-data fields
    this.buildingForm = this.fb.group({
      buildingNumber: ['', Validators.required],
      usageStatus: ['', Validators.required],
      addressNumber: ['', Validators.required],
      street: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      landOwnership: ['', Validators.required],
      buildingOwnership: ['', Validators.required],
      fenceCode: ['', Validators.required],
      fenceHeight: ['', Validators.required],
      fenceCondition: ['', Validators.required],
      northSide: ['', Validators.required],
      southSide: ['', Validators.required],
      eastSide: ['', Validators.required],
      westSide: ['', Validators.required],
      northEast: ['', Validators.required],
      southEast: ['', Validators.required],
      northWest: ['', Validators.required],
      southWest: ['', Validators.required],
      buildingMaterial: ['', Validators.required],
      coordinateX: ['', Validators.required],
      coordinateY: ['', Validators.required],
      coordinateZ: ['', Validators.required],
      positiveEnvironment: ['', Validators.required],
      negativeEnvironment: ['', Validators.required]
    });
  }

  private loadBuildingByCode(code: string) {
    this.schoolMapService.getEducationalBuildingByCode(code).subscribe({
      next: (building) => {
        this.selectedBuilding.set(building);
        this.viewMode.set('view');
      },
      error: (error) => {
        const errorMessage = this.errorHandler.getUserFriendlyMessage(
          error,
          'تحميل بيانات المبنى'
        );
        alert(errorMessage);
      }
    });
  }

  onSearch() {
    const buildingNumber = this.searchForm.get('buildingNumber')?.value;
    const schoolName = this.searchForm.get('schoolName')?.value;

    if (buildingNumber) {
      // Search by building number
      this.schoolMapService.getEducationalBuildingByCode(buildingNumber).subscribe({
        next: (building) => {
          this.searchResults.set([building]);
          this.showModal.set(true);
        },
        error: (error) => {
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'البحث عن المبنى'
          );
          alert(errorMessage);
        }
      });
    } else {
      // Get all buildings
      this.schoolMapService.getAllEducationalBuildings().subscribe({
        next: (buildings) => {
          // Filter by building number or street if provided
          let filtered = buildings;
          if (schoolName) {
            filtered = buildings.filter(b => 
              b.buildingNumber?.toLowerCase().includes(schoolName.toLowerCase()) ||
              b.street?.toLowerCase().includes(schoolName.toLowerCase())
            );
          }
          this.searchResults.set(filtered);
          this.showModal.set(true);
        },
        error: (error) => {
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'تحميل المباني'
          );
          alert(errorMessage);
        }
      });
    }
  }

  onSelectBuilding(building: EducationalBuildingData) {
    this.selectedBuilding.set(building);
    this.viewMode.set('view');
    this.showModal.set(false);
  }

  onCreateNew() {
    this.buildingForm.reset({
      fenceHeight: null,
      northSide: null,
      southSide: null,
      eastSide: null,
      westSide: null,
      northEast: null,
      southEast: null,
      northWest: null,
      southWest: null,
      coordinateX: null,
      coordinateY: null,
      coordinateZ: null
    });
    this.viewMode.set('create');
  }

  onEdit() {
    const building = this.selectedBuilding();
    if (building) {
      this.buildingForm.patchValue(building);
      this.viewMode.set('edit');
    }
  }

  onSave() {
    if (this.buildingForm.invalid) {
      this.markFormGroupTouched(this.buildingForm);
      
      // Collect all invalid fields
      const invalidFields: string[] = [];
      Object.keys(this.buildingForm.controls).forEach(key => {
        const control = this.buildingForm.get(key);
        if (control?.invalid) {
          invalidFields.push(this.getFieldLabel(key));
        }
      });
      
      alert(`❌ يرجى تصحيح الأخطاء في الحقول التالية:\n\n${invalidFields.join('\n')}`);
      return;
    }

    const formData = this.buildingForm.value;
    
    // Convert numeric fields from strings to numbers or null
    const numericFields = ['fenceHeight', 'coordinateX', 'coordinateY', 'coordinateZ'];
    
    numericFields.forEach(field => {
      const value = formData[field];
      if (value === '' || value === null || value === undefined) {
        formData[field] = null;
      } else {
        formData[field] = Number(value);
      }
    });

    if (this.viewMode() === 'create') {
      this.schoolMapService.createEducationalBuilding(formData).subscribe({
        next: (building) => {
          alert('✅ تم إضافة المبنى بنجاح');
          this.selectedBuilding.set(building);
          this.viewMode.set('view');
        },
        error: (error) => {
          console.error('Error creating building:', error);
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'إضافة المبنى'
          );
          alert(`❌ فشل في إضافة المبنى:\n${errorMessage}`);
        }
      });
    } else if (this.viewMode() === 'edit') {
      const building = this.selectedBuilding();
      if (building?.id) {
        // Include the id in the update data
        const updateData = {
          ...formData,
          id: building.id
        };
        
        this.schoolMapService.updateEducationalBuilding(building.id, updateData).subscribe({
          next: (updatedBuilding) => {
            alert('✅ تم تحديث المبنى بنجاح');
            this.selectedBuilding.set(updatedBuilding);
            this.viewMode.set('view');
          },
          error: (error) => {
            console.error('Error updating building:', error);
            const errorMessage = this.errorHandler.getUserFriendlyMessage(
              error,
              'تحديث المبنى'
            );
            alert(`❌ فشل في تحديث المبنى:\n${errorMessage}`);
          }
        });
      } else {
        alert('❌ خطأ: معرف المبنى غير موجود');
      }
    }
  }

  onCancel() {
    if (this.selectedBuilding()) {
      this.viewMode.set('view');
    } else {
      this.viewMode.set('search');
    }
  }

  onBackToSearch() {
    this.selectedBuilding.set(null);
    this.viewMode.set('search');
    this.searchForm.reset();
  }

  closeModal() {
    this.showModal.set(false);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'buildingNumber': 'رقم المبني',
      'usageStatus': 'موقف الاستخدام',
      'addressNumber': 'رقم العنوان',
      'street': 'الشارع',
      'phoneNumber': 'رقم التليفون',
      'landOwnership': 'ملكية الأرض',
      'buildingOwnership': 'ملكية المبني',
      'fenceCode': 'كود السور',
      'fenceHeight': 'ارتفاع السور',
      'fenceCondition': 'حالة السور',
      'northSide': 'ضلع شمال',
      'southSide': 'ضلع جنوب',
      'eastSide': 'ضلع شرق',
      'westSide': 'ضلع غرب',
      'northEast': 'شمال شرق',
      'southEast': 'جنوب شرق',
      'northWest': 'شمال غرب',
      'southWest': 'جنوب غرب',
      'buildingMaterial': 'الحالة',
      'coordinateX': 'إحداثي X',
      'coordinateY': 'إحداثي Y',
      'coordinateZ': 'إحداثي Z',
      'positiveEnvironment': 'المحيط الإيجابي',
      'negativeEnvironment': 'المحيط السلبي'
    };
    return labels[fieldName] || fieldName;
  }

  navigateBack() {
    this.router.navigate(['/educational-building']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
