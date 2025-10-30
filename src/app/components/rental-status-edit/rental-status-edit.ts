import { Component, signal, input, output, effect, ChangeDetectionStrategy, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface StatusFlag {
  id: string;
  label: string;
  checked: boolean;
}

@Component({
  selector: 'app-rental-status-edit',
  templateUrl: './rental-status-edit.html',
  styleUrl: './rental-status-edit.css',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentalStatusEditComponent {
  buildingId = input<string>('');
  currentStatus = input<string>('');
  currentSubstatus = input<string>('');
  isOpen = input<boolean>(false);
  
  closePopup = output<void>();
  submitSuccess = output<StatusFlag[]>();

  protected statusFlags = signal<StatusFlag[]>([
    { id: 'closed', label: 'مغلقة', checked: false },
    { id: 'working', label: 'تعمل', checked: false },
    { id: 'donated', label: 'تم التبرع بها', checked: false },
    { id: 'purchased', label: 'تم شراؤها', checked: false },
    { id: 'returned', label: 'صدر قرار بردها للمالك', checked: false },
    { id: 'displaced', label: 'تم نزع ملكيتها', checked: false },
    { id: 'purchase-pending', label: 'جاري اتخاذ إجراءات شراء بعد البت', checked: false },
    { id: 'purchase-deliberation', label: 'جاري البت للشراء', checked: false }
  ]);

  private lastOpenState = false;

  constructor() {
    // Initialize checkboxes based on current status when popup opens
    effect(() => {
      const isCurrentlyOpen = this.isOpen();
      
      // Only initialize when transitioning from closed to open
      if (isCurrentlyOpen && !this.lastOpenState) {
        untracked(() => {
          this.initializeFlags();
        });
      }
      
      this.lastOpenState = isCurrentlyOpen;
    });
  }

  private initializeFlags(): void {
    const status = this.currentStatus();
    
    // Parse the status string which may contain multiple statuses separated by commas
    const activeStatuses = status ? status.split(',').map(s => s.trim()) : [];
    
    // Create new flags array with updated checked states
    const flags: StatusFlag[] = [
      { id: 'closed', label: 'مغلقة', checked: false },
      { id: 'working', label: 'تعمل', checked: false },
      { id: 'donated', label: 'تم التبرع بها', checked: false },
      { id: 'purchased', label: 'تم شراؤها', checked: false },
      { id: 'returned', label: 'صدر قرار بردها للمالك', checked: false },
      { id: 'displaced', label: 'تم نزع ملكيتها', checked: false },
      { id: 'purchase-pending', label: 'جاري اتخاذ إجراءات شراء بعد البت', checked: false },
      { id: 'purchase-deliberation', label: 'جاري البت للشراء', checked: false }
    ];
    
    // Mark flags as checked if they are in the current status
    flags.forEach(flag => {
      flag.checked = activeStatuses.some(activeStatus => 
        activeStatus.includes(flag.label) || flag.label.includes(activeStatus)
      );
    });
    
    this.statusFlags.set(flags);
  }

  protected close(): void {
    this.closePopup.emit();
  }

  protected toggleFlag(index: number): void {
    const flags = [...this.statusFlags()];
    flags[index].checked = !flags[index].checked;
    this.statusFlags.set(flags);
  }

  protected submitChanges(): void {
    const selectedFlags = this.statusFlags().filter(flag => flag.checked);

    if (selectedFlags.length === 0) {
      alert('الرجاء تحديد حالة واحدة على الأقل');
      return;
    }

    this.submitSuccess.emit(selectedFlags);
    this.close();
  }
}
