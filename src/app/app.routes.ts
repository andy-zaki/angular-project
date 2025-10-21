import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'applications-menu',
    loadComponent: () => import('./components/applications-menu/applications-menu').then(m => m.ApplicationsMenuComponent)
  },
  {
    path: 'applications',
    loadComponent: () => import('./components/applications/applications').then(m => m.ApplicationsComponent)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
