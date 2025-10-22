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
    path: 'educational-building',
    loadComponent: () => import('./components/educational-building/educational-building').then(m => m.EducationalBuildingComponent)
  },
  {
    path: 'land-inquiry',
    loadComponent: () => import('./components/land-inquiry/land-inquiry').then(m => m.LandInquiryComponent)
  },
  // Land Inquiry Flow
  {
    path: 'land-inquiry-id',
    loadComponent: () => import('./components/land-inquiry-id/land-inquiry-id').then(m => m.LandInquiryIdComponent)
  },
  {
    path: 'land-coordinates',
    loadComponent: () => import('./components/land-coordinates/land-coordinates').then(m => m.LandCoordinatesComponent)
  },
  {
    path: 'building-inquiry',
    loadComponent: () => import('./components/building-inquiry/building-inquiry').then(m => m.BuildingInquiryComponent)
  },
  // Building Displacement Flow
  {
    path: 'building-displacement-pre',
    loadComponent: () => import('./components/building-displacement-pre/building-displacement-pre').then(m => m.BuildingDisplacementPreComponent)
  },
  {
    path: 'displacement-council-approval',
    loadComponent: () => import('./components/displacement-council-approval/displacement-council-approval').then(m => m.DisplacementCouncilApprovalComponent)
  },
  {
    path: 'building-displacement-post',
    loadComponent: () => import('./components/building-displacement-post/building-displacement-post').then(m => m.BuildingDisplacementPostComponent)
  },
  {
    path: 'displacement-final-compensation',
    loadComponent: () => import('./components/displacement-final-compensation/displacement-final-compensation').then(m => m.DisplacementFinalCompensationComponent)
  },
  // School Map Inquiry Flow
  {
    path: 'school-map-inquiry',
    loadComponent: () => import('./components/school-map-inquiry/school-map-inquiry').then(m => m.SchoolMapInquiryComponent)
  },
  {
    path: 'school-map-study-period',
    loadComponent: () => import('./components/school-map-study-period/school-map-study-period').then(m => m.SchoolMapStudyPeriodComponent)
  },
  {
    path: 'school-map-roads',
    loadComponent: () => import('./components/school-map-roads/school-map-roads').then(m => m.SchoolMapRoadsComponent)
  },
  {
    path: 'school-map-annexes',
    loadComponent: () => import('./components/school-map-annexes/school-map-annexes').then(m => m.SchoolMapAnnexesComponent)
  },
  {
    path: 'school-map-spaces',
    loadComponent: () => import('./components/school-map-spaces/school-map-spaces').then(m => m.SchoolMapSpacesComponent)
  },
  // Building Data Completion Flow
  {
    path: 'building-data-completion',
    loadComponent: () => import('./components/building-data-completion/building-data-completion').then(m => m.BuildingDataCompletionComponent)
  },
  {
    path: 'building-basic-data',
    loadComponent: () => import('./components/building-basic-data/building-basic-data').then(m => m.BuildingBasicDataComponent)
  },
  {
    path: 'building-annexes-data',
    loadComponent: () => import('./components/building-annexes-data/building-annexes-data').then(m => m.BuildingAnnexesDataComponent)
  },
  // Rental Buildings Status Flow
  {
    path: 'rental-buildings-status',
    loadComponent: () => import('./components/rental-buildings-status/rental-buildings-status').then(m => m.RentalBuildingsStatusComponent)
  },
  {
    path: 'rental-buildings-list',
    loadComponent: () => import('./components/rental-buildings-list/rental-buildings-list').then(m => m.RentalBuildingsListComponent)
  },
  {
    path: 'rental-building-location',
    loadComponent: () => import('./components/rental-building-location/rental-building-location').then(m => m.RentalBuildingLocationComponent)
  },
  {
    path: 'rental-building-details',
    loadComponent: () => import('./components/rental-building-details/rental-building-details').then(m => m.RentalBuildingDetailsComponent)
  },
  {
    path: 'rental-building-modify-status',
    loadComponent: () => import('./components/rental-building-modify-status/rental-building-modify-status').then(m => m.RentalBuildingModifyStatusComponent)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
