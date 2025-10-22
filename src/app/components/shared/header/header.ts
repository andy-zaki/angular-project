import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface UserInfo {
  name: string;
  lastLogin?: string;
}

export interface HeaderAction {
  type: 'back' | 'logout';
  label: string;
  ariaLabel: string;
  title: string;
  action: () => void;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class HeaderComponent {
  // Inputs
  pageTitle = input.required<string>();
  pageSubtitle = input<string>('');
  userInfo = input<UserInfo | null>(null);
  showBackButton = input<boolean>(false);
  backButtonLabel = input<string>('العودة');
  backButtonAriaLabel = input<string>('العودة للصفحة السابقة');
  customActions = input<HeaderAction[]>([]);
  
  // Outputs
  backClicked = output<void>();
  logoutClicked = output<void>();
  
  constructor(private router: Router) {}
  
  // Computed properties
  showUserInfo = computed(() => !!this.userInfo());
  
  onBackClick(): void {
    this.backClicked.emit();
  }
  
  onLogoutClick(): void {
    this.logoutClicked.emit();
  }
  
  // Default logout action (can be overridden)
  defaultLogout(): void {
    this.router.navigate(['/login']);
  }
}