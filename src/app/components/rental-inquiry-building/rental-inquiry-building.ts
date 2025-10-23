import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';
import { RentalStatusEditComponent } from '../rental-status-edit/rental-status-edit';

interface BuildingInfo {
  id: string;
  name: string;
  status: string;
  substatus: string;
}

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

  protected identificationNumber = signal('');
  protected buildingInfo = signal<BuildingInfo | null>(null);
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
      // Simulate API response with dummy data
      this.buildingInfo.set({
        id: this.identificationNumber(),
        name: 'مدرسة الرازي الابتدائية',
        status: 'مؤجرة - نشطة',
        substatus: 'تعمل بكفاءة'
      });
      this.showDetails.set(false);
    } else {
      alert('الرجاء إدخال الرقم التعريفي');
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
    console.log('Status flags updated:', selectedFlags);
    alert(`تم تحديث الحالات:\n${selectedFlags.map(f => f.label).join('\n')}`);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }
}
