import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

interface StatusFlag {
  id: string;
  label: string;
  checked: boolean;
}

@Component({
  selector: 'app-rental-status-edit',
  templateUrl: './rental-status-edit.html',
  styleUrl: './rental-status-edit.css',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentalStatusEditComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected buildingId = signal('');

  protected statusFlags = signal<StatusFlag[]>([
    { id: 'closed', label: 'مغلقة', checked: false },
    { id: 'working', label: 'تعمل', checked: true },
    { id: 'donated', label: 'تم التبرع بها', checked: false },
    { id: 'purchased', label: 'تم شراؤها', checked: false },
    { id: 'returned', label: 'صدر قرار بردها للمالك', checked: false },
    { id: 'displaced', label: 'تم نزع ملكيتها', checked: false },
    { id: 'purchase-pending', label: 'جاري اتخاذ إجراءات شراء بعد البت', checked: false },
    { id: 'purchase-deliberation', label: 'جاري البت للشراء', checked: false }
  ]);

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['buildingId']) {
        this.buildingId.set(params['buildingId']);
      }
    });
  }

  protected goBack(): void {
    this.router.navigate(['/rental-inquiry-building']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }

  protected toggleFlag(index: number): void {
    const flags = [...this.statusFlags()];
    flags[index].checked = !flags[index].checked;
    this.statusFlags.set(flags);
  }

  protected submitChanges(): void {
    const selectedFlags = this.statusFlags()
      .filter(flag => flag.checked)
      .map(flag => flag.label);

    if (selectedFlags.length === 0) {
      alert('الرجاء تحديد حالة واحدة على الأقل');
      return;
    }

    alert(`تم تحديث الحالات:\n${selectedFlags.join('\n')}`);
    this.goBack();
  }
}
