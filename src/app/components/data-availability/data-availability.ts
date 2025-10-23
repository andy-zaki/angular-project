import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-data-availability',
  templateUrl: './data-availability.html',
  styleUrl: './data-availability.css',
  imports: [CommonModule, HeaderComponent]
})
export class DataAvailabilityComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  protected referenceNumber = signal<string>('');

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.referenceNumber.set(id);
    }
  }

  protected goBack(): void {
    this.router.navigate(['/land-inquiry']);
  }

  protected goHome(): void {
    this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.router.navigate(['/login']);
  }
}
