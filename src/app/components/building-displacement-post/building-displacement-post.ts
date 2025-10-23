import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header';

@Component({
  selector: 'app-building-displacement-post',
  templateUrl: './building-displacement-post.html',
  styleUrl: './building-displacement-post.css',
  imports: [CommonModule, HeaderComponent]
})
export class BuildingDisplacementPostComponent {
  private router = inject(Router);

  options = [
    { id: 1, title: 'التعويض النهائي', icon: '💰' },
    { id: 2, title: 'كشوف العرض', icon: '📊' },
    { id: 3, title: 'شهادات المطابقة', icon: '📜' },
    { id: 4, title: 'قرار الوزير المختص', icon: '📋' },
    { id: 5, title: 'صحيفة وحدة عقارية', icon: '🏠' },
    { id: 6, title: 'استمارات البيع', icon: '📝' }
  ];

  selectOption(optionId: number) {
    console.log('Selected option:', optionId);
  }

  navigateBack() {
    this.router.navigate(['/educational-building']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
