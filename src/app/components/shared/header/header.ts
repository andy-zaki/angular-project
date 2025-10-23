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
  showBackButton = input<boolean>(true);
  showHomeButton = input<boolean>(true);
  backButtonLabel = input<string>('العودة');
  homeButtonLabel = input<string>('الرئيسية');
  backButtonAriaLabel = input<string>('العودة للصفحة السابقة');
  homeButtonAriaLabel = input<string>('العودة للصفحة الرئيسية');
  customActions = input<HeaderAction[]>([]);
  
  // Outputs
  backClicked = output<void>();
  homeClicked = output<void>();
  logoutClicked = output<void>();
  
  constructor(private router: Router) {}
  
  // Computed properties
  showUserInfo = computed(() => !!this.userInfo());
  
  onBackClick(): void {
    this.backClicked.emit();
  }

  onHomeClick(): void {
    this.homeClicked.emit();
  }
  
  onLogoutClick(): void {
    this.logoutClicked.emit();
  }
  
  // Default logout action (can be overridden)
  defaultLogout(): void {
    this.router.navigate(['/login']);
  }
}