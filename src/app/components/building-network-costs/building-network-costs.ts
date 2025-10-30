import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { BuildingApiService } from '../../services/building-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-building-network-costs',
  templateUrl: './building-network-costs.html',
  styleUrl: './building-network-costs.css',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildingNetworkCostsComponent {
  private router = inject(Router);
  private buildingService = inject(BuildingApiService);
  private errorHandler = inject(ErrorHandlerService);

  protected formData = {
    governmentNumber: '',
    networkType: '',
    costAmount: '',
    description: ''
  };

  protected networkTypes = [
    'كهرباء',
    'مياه',
    'صرف صحي',
    'غاز',
    'اتصالات',
    'طرق'
  ];

  protected goBack(): void {
    this.router.navigate(['/building-displacement-menu']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected submitForm(): void {
    if (this.validateForm()) {
      const governmentNumber = this.formData.governmentNumber;
      
      // First, find or create the building
      this.buildingService.searchBuildings({ buildingNumber: governmentNumber }).subscribe({
        next: (buildings: any[]) => {
          let buildingId: string;
          
          if (buildings && buildings.length > 0) {
            buildingId = buildings[0].id;
            this.saveNetworkCosts(buildingId);
          } else {
            // Create building first
            const buildingData = {
              buildingNumber: governmentNumber,
              schoolName: 'مبنى - ' + governmentNumber,
              governorate: 'غير محدد',
              regionalCenter: 'غير محدد',
              educationalAdministration: 'غير محدد',
              district: 'غير محدد',
              neighborhood: 'غير محدد'
            };
            
            this.buildingService.createBuilding(buildingData as any).subscribe({
              next: (created: any) => {
                this.saveNetworkCosts(created.id);
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
    }
  }
  
  private saveNetworkCosts(buildingId: string): void {
    const costsData = {
      networkType: this.formData.networkType,
      totalCost: parseFloat(this.formData.costAmount) || 0,
      costDescription: this.formData.description || '',
      installationDate: new Date().toISOString().split('T')[0]
    };
    
    this.buildingService.addNetworkCosts(buildingId, costsData as any).subscribe({
      next: (saved: any) => {
        console.log('Network costs saved:', saved);
        alert('✅ تم حفظ بيانات تكاليف الشبكات بنجاح');
        this.goBack();
      },
      error: (error: any) => {
        console.error('Error saving network costs:', error);
        const errorMessage = this.errorHandler.getUserFriendlyMessage(
          error,
          'حفظ تكاليف الشبكات'
        );
        alert(errorMessage);
      }
    });
  }

  private validateForm(): boolean {
    if (!this.formData.governmentNumber) {
      alert('الرجاء إدخال رقم المحضر الحكومي');
      return false;
    }
    if (!this.formData.networkType) {
      alert('الرجاء اختيار نوع الشبكة');
      return false;
    }
    if (!this.formData.costAmount) {
      alert('الرجاء إدخال التكلفة');
      return false;
    }
    return true;
  }
}
