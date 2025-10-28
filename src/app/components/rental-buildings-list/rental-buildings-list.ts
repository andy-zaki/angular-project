import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';
import { RentalBuildingInfo } from '../../models/rental.model';
import { RentalApiService } from '../../services/rental-api.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-rental-buildings-list',
  templateUrl: './rental-buildings-list.html',
  styleUrl: './rental-buildings-list.css',
  imports: [CommonModule, HeaderComponent]
})
export class RentalBuildingsListComponent implements OnInit {
  private router = inject(Router);
  private rentalDatabaseService = inject(RentalApiService);
  private errorHandler = inject(ErrorHandlerService);

  buildings = signal<RentalBuildingInfo[]>([]);

  ngOnInit(): void {
    // Load all rental buildings when component initializes
    this.rentalDatabaseService.getAllRentalBuildings().subscribe({
      next: (buildings) => {
        this.buildings.set(buildings);
      },
      error: (error) => {
        const errorMessage = this.errorHandler.getUserFriendlyMessage(
          error,
          'تحميل قائمة المباني المستأجرة'
        );
        alert(errorMessage);
      }
    });
  }

  selectBuilding(buildingId: string) {
    this.router.navigate(['/rental-building-location'], {
      queryParams: { buildingId }
    });
  }

  navigateBack() {
    this.router.navigate(['/rental-buildings-status']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
