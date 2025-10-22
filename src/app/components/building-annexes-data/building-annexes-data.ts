import { Component, inject } from '@angular/core';
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

  annexesList = [
    { id: 1, name: '', type: '', area: '' },
    { id: 2, name: '', type: '', area: '' }
  ];

  addAnnex() {
    this.annexesList.push({
      id: this.annexesList.length + 1,
      name: '',
      type: '',
      area: ''
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
}
