import { Component, inject, output, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rental-building-modify-status',
  templateUrl: './rental-building-modify-status.html',
  styleUrl: './rental-building-modify-status.css',
  imports: [CommonModule, FormsModule]
})
export class RentalBuildingModifyStatusComponent {
  buildingId = input<number>(0);
  isOpen = input<boolean>(false);
  
  closePopup = output<void>();
  submitSuccess = output<any>();

  status = signal('مؤجرة');
  tenant = signal('');
  rentalStartDate = signal('');
  rentalEndDate = signal('');
  annualRent = signal('');
  notes = signal('');

  submitModification() {
    const modifyData = {
      status: this.status(),
      tenant: this.tenant(),
      rentalStartDate: this.rentalStartDate(),
      rentalEndDate: this.rentalEndDate(),
      annualRent: this.annualRent(),
      notes: this.notes()
    };
    console.log('Building status modified:', modifyData);
    this.submitSuccess.emit(modifyData);
    this.close();
  }

  close() {
    this.closePopup.emit();
  }
}
