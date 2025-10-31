import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { RentalStatusEditComponent } from '../rental-status-edit/rental-status-edit';
import { RentalBuildingInfo, RentalBuildingDetails } from '../../models/rental.model';
import { RentalApiService } from '../../services/rental-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-rental-inquiry-building',
  templateUrl: './rental-inquiry-building.html',
  styleUrl: './rental-inquiry-building.css',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, RentalStatusEditComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentalInquiryBuildingComponent {
  private router = inject(Router);
  private rentalDatabaseService = inject(RentalApiService);
  private errorHandler = inject(ErrorHandlerService);

  protected identificationNumber = signal('');
  protected buildingInfo = signal<RentalBuildingInfo | null>(null);
  protected buildingDetails = signal<RentalBuildingDetails | null>(null);
  protected showDetails = signal(false);
  protected showEditPopup = signal(false);

  protected goBack(): void {
    this.router.navigate(['/rental-status-menu']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected search(): void {
    if (this.identificationNumber().trim()) {
      // Fetch rental building data
      this.rentalDatabaseService.getRentalBuildingByIdNumber(this.identificationNumber()).subscribe({
        next: (building) => {
          this.buildingInfo.set(building);
          this.showDetails.set(false);
          
          // Fetch full details
          this.rentalDatabaseService.getRentalBuildingById(building.id).subscribe({
            next: (details) => {
              this.buildingDetails.set(details);
            },
            error: (error) => {
              console.error('Error fetching building details:', error);
            }
          });
        },
        error: (error) => {
          const errorMessage = this.errorHandler.getUserFriendlyMessage(
            error,
            'البحث عن المبنى المستأجر'
          );
          alert(errorMessage);
        }
      });
    } else {
      alert('⚠️ الرجاء إدخال الرقم التعريفي للمبنى');
    }
  }

  protected viewDetails(): void {
    this.showDetails.set(!this.showDetails());
  }

  protected navigateToEdit(): void {
    if (this.buildingInfo()) {
      this.showEditPopup.set(true);
    }
  }

  protected closeEditPopup(): void {
    this.showEditPopup.set(false);
  }

  protected handleEditSubmit(selectedFlags: any[]): void {
    const building = this.buildingInfo();
    if (!building) return;

    // Get the selected status (only one now since we're using radio buttons)
    const newStatus = selectedFlags[0]?.label || '';
    
    // First, get the complete building details
    this.rentalDatabaseService.getRentalBuildingById(building.id).subscribe({
      next: (fullBuilding) => {
        // Merge the status changes with the full building object
        const updatedBuilding = {
          ...fullBuilding,
          status: newStatus,
          substatus: newStatus
        };
        
        // Update the building
        this.rentalDatabaseService.updateRentalBuilding(building.id, updatedBuilding).subscribe({
          next: (result) => {
            // Re-fetch the building from database to ensure we have the latest data
            this.rentalDatabaseService.getRentalBuildingByIdNumber(building.identificationNumber).subscribe({
              next: (refreshedBuilding) => {
                // Update with fresh data from database
                this.buildingInfo.set(refreshedBuilding);
                
                alert(`✅ تم تحديث موقف المبنى بنجاح\n\nالحالة الجديدة: ${newStatus}`);
                this.closeEditPopup();
              },
              error: (error) => {
                // Even if refresh fails, close popup since update succeeded
                this.buildingInfo.set({
                  ...building,
                  status: newStatus,
                  substatus: newStatus
                });
                alert(`✅ تم تحديث موقف المبنى بنجاح\n\nالحالة الجديدة: ${newStatus}`);
                this.closeEditPopup();
              }
            });
          },
          error: (error) => {
            const errorMessage = this.errorHandler.getUserFriendlyMessage(
              error,
              'تحديث موقف المبنى'
            );
            alert(errorMessage);
          }
        });
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

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }
}
