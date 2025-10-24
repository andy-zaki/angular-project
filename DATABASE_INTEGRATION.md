# Database Integration Guide

## Overview

This Angular application currently uses **mock database services** that simulate API calls and return realistic data. This document provides comprehensive instructions for replacing these mock services with real database connections when your backend API is ready.

## Current Architecture

### Mock Services Structure

The application uses the following mock database services located in `src/app/services/`:

1. **`mock-land-database.service.ts`** - Land parcel data
2. **`mock-building-database.service.ts`** - Building and educational facility data
3. **`mock-rental-database.service.ts`** - Rental building information
4. **`mock-school-map-database.service.ts`** - School map and study period data
5. **`mock-displacement-database.service.ts`** - Displacement and compensation data

### Data Models

All data structures are defined in `src/app/models/`:

- **`land.model.ts`** - Land-related interfaces
- **`building.model.ts`** - Building-related interfaces
- **`rental.model.ts`** - Rental-related interfaces
- **`school-map.model.ts`** - School map interfaces
- **`displacement.model.ts`** - Displacement process interfaces

## Migration Steps

### Step 1: Create Real API Service

Create a new service for each domain (e.g., `land-api.service.ts`) that will handle HTTP communication with your backend.

**Example: Creating a Real Land API Service**

```typescript
// src/app/services/land-api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LandData, BuildingLocationData, LandCoordinates } from '../models/land.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/lands`;

  /**
   * Get land data by reference number
   * API Endpoint: GET /api/lands/by-reference/:referenceNumber
   */
  getLandByReferenceNumber(referenceNumber: string): Observable<LandData | null> {
    return this.http.get<LandData | null>(`${this.baseUrl}/by-reference/${referenceNumber}`);
  }

  /**
   * Get all lands
   * API Endpoint: GET /api/lands
   */
  getAllLands(): Observable<LandData[]> {
    return this.http.get<LandData[]>(this.baseUrl);
  }

  /**
   * Search lands by criteria
   * API Endpoint: POST /api/lands/search
   */
  searchLands(criteria: Partial<LandData>): Observable<LandData[]> {
    return this.http.post<LandData[]>(`${this.baseUrl}/search`, criteria);
  }

  /**
   * Get building locations for a land parcel
   * API Endpoint: GET /api/lands/:landId/buildings
   */
  getBuildingLocationsByLandId(landId: string): Observable<BuildingLocationData[]> {
    return this.http.get<BuildingLocationData[]>(`${this.baseUrl}/${landId}/buildings`);
  }

  /**
   * Get coordinates for a land parcel
   * API Endpoint: GET /api/lands/:landId/coordinates
   */
  getLandCoordinates(landId: string): Observable<LandCoordinates[]> {
    return this.http.get<LandCoordinates[]>(`${this.baseUrl}/${landId}/coordinates`);
  }

  /**
   * Create or update land data
   * API Endpoint: POST /api/lands (create) or PUT /api/lands/:id (update)
   */
  saveLand(land: LandData): Observable<LandData> {
    if (land.id) {
      return this.http.put<LandData>(`${this.baseUrl}/${land.id}`, land);
    } else {
      return this.http.post<LandData>(this.baseUrl, land);
    }
  }
}
```

### Step 2: Create Environment Configuration

Configure your API endpoints in environment files.

**`src/environments/environment.ts`** (Development)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000' // Your development API URL
};
```

**`src/environments/environment.prod.ts`** (Production)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com' // Your production API URL
};
```

### Step 3: Update Components to Use Real API

Replace the mock service injection with the real API service.

**Before (using mock service):**
```typescript
import { MockLandDatabaseService } from '../../services/mock-land-database.service';

export class LandInquiryComponent {
  private landDatabaseService = inject(MockLandDatabaseService);
  
  protected onSearch(): void {
    this.landDatabaseService.getLandByReferenceNumber(referenceNumber).subscribe({
      next: (data) => {
        this.landData.set(data);
      }
    });
  }
}
```

**After (using real API service):**
```typescript
import { LandApiService } from '../../services/land-api.service';

export class LandInquiryComponent {
  private landApiService = inject(LandApiService);
  
  protected onSearch(): void {
    this.landApiService.getLandByReferenceNumber(referenceNumber).subscribe({
      next: (data) => {
        this.landData.set(data);
      },
      error: (error) => {
        // Add proper error handling
        console.error('API Error:', error);
        this.handleApiError(error);
      }
    });
  }
  
  private handleApiError(error: any): void {
    // Implement user-friendly error messages
    if (error.status === 404) {
      alert('لم يتم العثور على البيانات المطلوبة');
    } else if (error.status === 500) {
      alert('حدث خطأ في الخادم. يرجى المحاولة لاحقاً');
    } else {
      alert('حدث خطأ غير متوقع');
    }
  }
}
```

### Step 4: Configure HTTP Interceptors (Optional but Recommended)

Add interceptors for authentication, error handling, and logging.

**`src/app/interceptors/auth.interceptor.ts`**
```typescript
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Add authentication token to requests
  const token = localStorage.getItem('authToken');
  
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  
  return next(req);
};
```

**Register interceptor in `app.config.ts`:**
```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    // ... other providers
  ]
};
```

### Step 5: Implement Error Handling Service

Create a centralized error handling service.

**`src/app/services/error-handler.service.ts`**
```typescript
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'حدث خطأ غير متوقع';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `خطأ: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'طلب غير صحيح. يرجى التحقق من البيانات المدخلة';
          break;
        case 401:
          errorMessage = 'غير مصرح. يرجى تسجيل الدخول';
          break;
        case 403:
          errorMessage = 'ليس لديك صلاحية للوصول إلى هذا المورد';
          break;
        case 404:
          errorMessage = 'المورد المطلوب غير موجود';
          break;
        case 500:
          errorMessage = 'خطأ في الخادم. يرجى المحاولة لاحقاً';
          break;
        default:
          errorMessage = `خطأ غير متوقع: ${error.status}`;
      }
    }
    
    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}
```

## Service Migration Checklist

Use this checklist to systematically migrate each service:

### Land Service Migration
- [ ] Create `land-api.service.ts`
- [ ] Implement all methods from `MockLandDatabaseService`
- [ ] Update `land-inquiry.component.ts` to use new service
- [ ] Update `land-coordinates.component.ts` (if exists)
- [ ] Test all land-related functionality

### Building Service Migration
- [ ] Create `building-api.service.ts`
- [ ] Implement all methods from `MockBuildingDatabaseService`
- [ ] Update `building-inquiry.component.ts`
- [ ] Update `building-basic-data.component.ts`
- [ ] Update `building-annexes-data.component.ts`
- [ ] Update `building-network-costs.component.ts`
- [ ] Update `school-map-inquiry.component.ts`
- [ ] Test all building-related functionality

### Rental Service Migration
- [ ] Create `rental-api.service.ts`
- [ ] Implement all methods from `MockRentalDatabaseService`
- [ ] Update `rental-inquiry-building.component.ts`
- [ ] Update `rental-buildings-list.component.ts`
- [ ] Update `rental-building-details.component.ts`
- [ ] Update `rental-building-location.component.ts`
- [ ] Test all rental-related functionality

### School Map Service Migration
- [ ] Create `school-map-api.service.ts`
- [ ] Implement all methods from `MockSchoolMapDatabaseService`
- [ ] Update `school-map-study-period.component.ts`
- [ ] Update `school-map-roads.component.ts`
- [ ] Update `school-map-annexes.component.ts`
- [ ] Update `school-map-spaces.component.ts`
- [ ] Test all school map functionality

### Displacement Service Migration
- [ ] Create `displacement-api.service.ts`
- [ ] Implement all methods from `MockDisplacementDatabaseService`
- [ ] Update `building-displacement-pre.component.ts`
- [ ] Update `building-displacement-post.component.ts`
- [ ] Update `displacement-final-compensation.component.ts`
- [ ] Update `displacement-council-approval.component.ts`
- [ ] Test all displacement-related functionality

## Backend API Requirements

Your backend API should implement the following endpoints for each domain:

### Land Endpoints
```
GET    /api/lands                           - Get all lands
GET    /api/lands/by-reference/:refNumber  - Get land by reference number
POST   /api/lands/search                    - Search lands
GET    /api/lands/:id                       - Get land by ID
POST   /api/lands                           - Create new land
PUT    /api/lands/:id                       - Update land
DELETE /api/lands/:id                       - Delete land
GET    /api/lands/:id/buildings             - Get building locations
GET    /api/lands/:id/coordinates           - Get land coordinates
```

### Building Endpoints
```
GET    /api/buildings                       - Get all buildings
POST   /api/buildings/search                - Search buildings
GET    /api/buildings/:number               - Get building by number
GET    /api/buildings/:id/basic-data        - Get basic building data
GET    /api/buildings/:id/annexes           - Get building annexes
GET    /api/buildings/:id/network-costs     - Get network costs
POST   /api/buildings                       - Create new building
PUT    /api/buildings/:id                   - Update building
```

### Rental Endpoints
```
GET    /api/rentals                         - Get all rental buildings
GET    /api/rentals/by-id/:idNumber         - Get by identification number
GET    /api/rentals/:id                     - Get rental building details
GET    /api/rentals/:id/location            - Get location data
GET    /api/rentals/:id/decisions           - Get rental decisions
GET    /api/rentals/status-flags            - Get status flags
POST   /api/rentals                         - Create rental building
PUT    /api/rentals/:id                     - Update rental building
PUT    /api/rentals/:id/status              - Update status
```

### School Map Endpoints
```
GET    /api/school-map/study-periods/:buildingCode  - Get study periods
GET    /api/school-map/roads/:buildingId            - Get surrounding roads
GET    /api/school-map/annexes/:buildingId          - Get school annexes
GET    /api/school-map/spaces/:buildingId           - Get school spaces
POST   /api/school-map/study-periods                - Create study period
PUT    /api/school-map/spaces/:id                   - Update space
```

### Displacement Endpoints
```
GET    /api/displacement/process/:schoolNumber      - Get displacement process
GET    /api/displacement/:id/compensation           - Get compensation entries
GET    /api/displacement/:id/display-lists          - Get display lists
GET    /api/displacement/:id/certificates           - Get certificates
GET    /api/displacement/:id/real-estate-units      - Get real estate units
GET    /api/displacement/:id/sale-forms             - Get sale forms
GET    /api/displacement/:id/minister-decisions     - Get minister decisions
POST   /api/displacement/process                    - Create displacement
POST   /api/displacement/compensation               - Add compensation entry
```

## Testing Strategy

### 1. Unit Testing
Keep mock services for unit testing:
```typescript
// In component.spec.ts
import { MockLandDatabaseService } from '../../services/mock-land-database.service';

TestBed.configureTestingModule({
  providers: [
    { provide: LandApiService, useClass: MockLandDatabaseService }
  ]
});
```

### 2. Integration Testing
Test with real API in development environment:
```typescript
// Use environment flag to switch between mock and real API
const landService = environment.useMockData 
  ? inject(MockLandDatabaseService) 
  : inject(LandApiService);
```

### 3. End-to-End Testing
Implement E2E tests that work with both mock and real APIs.

## Performance Considerations

### 1. Caching
Implement caching for frequently accessed data:
```typescript
@Injectable({ providedIn: 'root' })
export class LandApiService {
  private cache = new Map<string, Observable<any>>();
  
  getLandByReferenceNumber(refNumber: string): Observable<LandData | null> {
    const cacheKey = `land-${refNumber}`;
    
    if (!this.cache.has(cacheKey)) {
      const request = this.http.get<LandData | null>(
        `${this.baseUrl}/by-reference/${refNumber}`
      ).pipe(
        shareReplay(1) // Cache the result
      );
      this.cache.set(cacheKey, request);
    }
    
    return this.cache.get(cacheKey)!;
  }
}
```

### 2. Pagination
Implement pagination for large datasets:
```typescript
searchBuildings(
  criteria: any, 
  page: number = 1, 
  pageSize: number = 20
): Observable<{ data: BuildingData[], total: number }> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
    
  return this.http.post<{ data: BuildingData[], total: number }>(
    `${this.baseUrl}/search`,
    criteria,
    { params }
  );
}
```

### 3. Loading States
Add proper loading indicators:
```typescript
protected isLoading = signal(false);

protected onSearch(): void {
  this.isLoading.set(true);
  
  this.landApiService.getLandByReferenceNumber(refNumber).subscribe({
    next: (data) => {
      this.landData.set(data);
      this.isLoading.set(false);
    },
    error: (error) => {
      this.isLoading.set(false);
      this.handleError(error);
    }
  });
}
```

## Security Considerations

### 1. Authentication
Implement JWT token-based authentication:
```typescript
// Store token after login
localStorage.setItem('authToken', token);

// Add token to requests via interceptor (see Step 4)
```

### 2. Authorization
Check user permissions before API calls:
```typescript
if (this.authService.hasPermission('land.view')) {
  this.landApiService.getLandByReferenceNumber(refNumber).subscribe(...);
} else {
  alert('ليس لديك صلاحية لعرض هذه البيانات');
}
```

### 3. Input Validation
Validate all user inputs before sending to API:
```typescript
protected onSearch(): void {
  if (!this.validateInput(referenceNumber)) {
    alert('الرقم المرجعي غير صحيح');
    return;
  }
  // Proceed with API call
}
```

## Rollback Plan

If you need to rollback to mock services:

1. Keep mock service files in the codebase
2. Use dependency injection to switch services:
```typescript
// In app.config.ts
providers: [
  environment.useMockData
    ? { provide: LandApiService, useClass: MockLandDatabaseService }
    : LandApiService
]
```

## Data Models Reference

All data models are located in `src/app/models/` and are fully typed TypeScript interfaces. These interfaces should match your backend API response structure exactly. If there are any differences, create adapter functions to transform the API response to match the interface.

**Example Adapter:**
```typescript
function adaptApiLandData(apiData: any): LandData {
  return {
    id: apiData.land_id,
    referenceNumber: apiData.ref_number,
    usageStatus: apiData.usage_status,
    // ... map all fields
  };
}
```

## Support and Troubleshooting

### Common Issues

**Issue: CORS errors**
- Solution: Configure CORS on your backend server to allow requests from your frontend domain

**Issue: 401 Unauthorized errors**
- Solution: Ensure authentication token is being sent correctly and hasn't expired

**Issue: Network timeout**
- Solution: Implement timeout handling and retry logic:
```typescript
import { timeout, retry } from 'rxjs/operators';

this.http.get(url).pipe(
  timeout(30000), // 30 second timeout
  retry(2) // Retry twice on failure
).subscribe(...);
```

**Issue: Data format mismatch**
- Solution: Create adapter functions to transform API responses

## Next Steps

1. **Coordinate with Backend Team**: Share this document and the data models
2. **Define API Contract**: Agree on endpoint URLs, request/response formats
3. **Implement API Services**: Create real API services one domain at a time
4. **Test Thoroughly**: Test each service before moving to the next
5. **Monitor Performance**: Use browser dev tools to monitor API calls
6. **Document Changes**: Keep this guide updated as you make changes

## Conclusion

This guide provides a complete roadmap for transitioning from mock services to real database connections. Follow the steps systematically, test thoroughly at each stage, and maintain the mock services for testing purposes.

For questions or clarification, refer to the mock service implementations as examples of the expected behavior.
