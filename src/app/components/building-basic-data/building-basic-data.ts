import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-building-basic-data',
  templateUrl: './building-basic-data.html',
  styleUrl: './building-basic-data.css',
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class BuildingBasicDataComponent {
  private router = inject(Router);

  buildingData = {
    name: '',
    type: '',
    area: '',
    location: '',
    constructionYear: '',
    numberOfFloors: ''
  };

  submitData() {
    console.log('Building data submitted:', this.buildingData);
    this.router.navigate(['/building-data-completion']);
  }

  navigateBack() {
    this.router.navigate(['/building-data-completion']);
  }
}
