import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-building-annexes-data',
  templateUrl: './building-annexes-data.html',
  styleUrl: './building-annexes-data.css',
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class BuildingAnnexesDataComponent {
  private router = inject(Router);

  buildingNumber = '';
  showForm = signal<boolean>(false);

  annexesList = [
    {
      id: 1,
      totalFloors: '',
      structureCondition: '',
      totalArea: '',
      constructionDate: '',
      interiorFinishingCondition: '',
      expansionCapability: '',
      constructionSystem: '',
      constructionMethod: '',
      ceilingMaterials: '',
      wallMaterials: '',
      exteriorFacadeFinishing: '',
      sanitaryWorks: '',
      electricalWorks: ''
    }
  ];

  searchBuilding() {
    if (this.buildingNumber.trim()) {
      this.showForm.set(true);
    } else {
      alert('الرجاء إدخال رقم المبني');
    }
  }

  addAnnex() {
    this.annexesList.push({
      id: this.annexesList.length + 1,
      totalFloors: '',
      structureCondition: '',
      totalArea: '',
      constructionDate: '',
      interiorFinishingCondition: '',
      expansionCapability: '',
      constructionSystem: '',
      constructionMethod: '',
      ceilingMaterials: '',
      wallMaterials: '',
      exteriorFacadeFinishing: '',
      sanitaryWorks: '',
      electricalWorks: ''
    });
  }

  removeAnnex(index: number) {
    this.annexesList.splice(index, 1);
  }

  submitData() {
    console.log('Annexes data submitted:', this.annexesList);
    this.router.navigate(['/building-data-completion']);
  }

  navigateBack() {
    this.router.navigate(['/building-data-completion']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
