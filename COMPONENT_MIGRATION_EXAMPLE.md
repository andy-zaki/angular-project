# Component Migration Example

This document shows exactly how to update your components from mock services to real API services.

## Example: Land Inquiry Component

### BEFORE (Using Mock Service)

```typescript
// src/app/components/land-inquiry/land-inquiry.ts
import { Component, signal, inject } from '@angular/core';
import { MockLandDatabaseService } from '../../services/mock-land-database.service';
import { LandData } from '../../models/land.model';

@Component({
  selector: 'app-land-inquiry',
  templateUrl: './land-inquiry.html',
  styleUrls: ['./land-inquiry.css']
})
export class LandInquiryComponent {
  private readonly landService = inject(MockLandDatabaseService);
  
  landData = signal<LandData | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string>('');

  searchLand(referenceNumber: string) {
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    this.landService.getLandByReferenceNumber(referenceNumber).subscribe({
      next: (land) => {
        this.landData.set(land);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to fetch land data');
        this.isLoading.set(false);
      }
    });
  }
}
```

### AFTER (Using Real API Service)

```typescript
// src/app/components/land-inquiry/land-inquiry.ts
import { Component, signal, inject } from '@angular/core';
import { LandApiService } from '../../services/land-api.service'; // ← Changed import
import { LandData } from '../../models/land.model';

@Component({
  selector: 'app-land-inquiry',
  templateUrl: './land-inquiry.html',
  styleUrls: ['./land-inquiry.css']
})
export class LandInquiryComponent {
  private readonly landService = inject(LandApiService); // ← Changed service
  
  landData = signal<LandData | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string>('');

  searchLand(referenceNumber: string) {
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    // Exactly the same code - API is identical!
    this.landService.getLandByReferenceNumber(referenceNumber).subscribe({
      next: (land) => {
        this.landData.set(land);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to fetch land data');
        this.isLoading.set(false);
      }
    });
  }
}
```

**Changes made:**
1. Line 2: Changed import from `mock-land-database.service` to `land-api.service`
2. Line 2: Changed class name from `MockLandDatabaseService` to `LandApiService`
3. Line 11: Changed injected service type
4. Everything else stays **exactly the same**!

## Example: Building Inquiry Component

### BEFORE

```typescript
import { MockBuildingDatabaseService } from '../../services/mock-building-database.service';

export class BuildingInquiryComponent {
  private readonly buildingService = inject(MockBuildingDatabaseService);
  
  searchBuilding(buildingNumber: string) {
    this.buildingService.getBuildingByNumber(buildingNumber).subscribe({
      next: (building) => {
        this.buildingData.set(building);
      }
    });
  }
}
```

### AFTER

```typescript
import { BuildingApiService } from '../../services/building-api.service'; // ← Changed

export class BuildingInquiryComponent {
  private readonly buildingService = inject(BuildingApiService); // ← Changed
  
  // Same code - no changes needed!
  searchBuilding(buildingNumber: string) {
    this.buildingService.getBuildingByNumber(buildingNumber).subscribe({
      next: (building) => {
        this.buildingData.set(building);
      }
    });
  }
}
```

## Example: Rental Buildings List Component

### BEFORE

```typescript
import { MockRentalDatabaseService } from '../../services/mock-rental-database.service';

export class RentalBuildingsListComponent {
  private readonly rentalService = inject(MockRentalDatabaseService);
  
  ngOnInit() {
    this.loadRentalBuildings();
  }
  
  loadRentalBuildings() {
    this.rentalService.getAllRentalBuildings().subscribe({
      next: (buildings) => {
        this.rentalBuildings.set(buildings);
      }
    });
  }
}
```

### AFTER

```typescript
import { RentalApiService } from '../../services/rental-api.service'; // ← Changed

export class RentalBuildingsListComponent {
  private readonly rentalService = inject(RentalApiService); // ← Changed
  
  ngOnInit() {
    this.loadRentalBuildings();
  }
  
  // Same code - works identically!
  loadRentalBuildings() {
    this.rentalService.getAllRentalBuildings().subscribe({
      next: (buildings) => {
        this.rentalBuildings.set(buildings);
      }
    });
  }
}
```

## Example: School Map Component

### BEFORE

```typescript
import { MockSchoolMapDatabaseService } from '../../services/mock-school-map-database.service';

export class SchoolMapInquiryComponent {
  private readonly schoolMapService = inject(MockSchoolMapDatabaseService);
  
  loadStudyPeriods(buildingCode: string) {
    this.schoolMapService.getStudyPeriodsByBuildingCode(buildingCode).subscribe({
      next: (periods) => {
        this.studyPeriods.set(periods);
      }
    });
  }
}
```

### AFTER

```typescript
import { SchoolMapApiService } from '../../services/school-map-api.service'; // ← Changed

export class SchoolMapInquiryComponent {
  private readonly schoolMapService = inject(SchoolMapApiService); // ← Changed
  
  // Same code!
  loadStudyPeriods(buildingCode: string) {
    this.schoolMapService.getStudyPeriodsByBuildingCode(buildingCode).subscribe({
      next: (periods) => {
        this.studyPeriods.set(periods);
      }
    });
  }
}
```

## Example: Displacement Component

### BEFORE

```typescript
import { MockDisplacementDatabaseService } from '../../services/mock-displacement-database.service';

export class DisplacementFinalCompensationComponent {
  private readonly displacementService = inject(MockDisplacementDatabaseService);
  
  loadDisplacement(referenceNumber: string) {
    this.displacementService.getDisplacementByReferenceNumber(referenceNumber).subscribe({
      next: (displacement) => {
        this.displacementData.set(displacement);
      }
    });
  }
}
```

### AFTER

```typescript
import { DisplacementApiService } from '../../services/displacement-api.service'; // ← Changed

export class DisplacementFinalCompensationComponent {
  private readonly displacementService = inject(DisplacementApiService); // ← Changed
  
  // Same code!
  loadDisplacement(referenceNumber: string) {
    this.displacementService.getDisplacementByReferenceNumber(referenceNumber).subscribe({
      next: (displacement) => {
        this.displacementData.set(displacement);
      }
    });
  }
}
```

## Service Method Mapping

All methods have the **exact same signature** in API services as mock services:

### Land Service Methods
| Method | Parameters | Returns |
|--------|-----------|---------|
| `getAllLands()` | none | `Observable<LandData[]>` |
| `getLandByReferenceNumber()` | `referenceNumber: string` | `Observable<LandData \| null>` |
| `getLandById()` | `id: string` | `Observable<LandData>` |
| `searchLands()` | `criteria: Partial<LandData>` | `Observable<LandData[]>` |
| `saveLand()` | `land: LandData` | `Observable<LandData>` |
| `deleteLand()` | `id: string` | `Observable<{message: string}>` |
| `getBuildingLocationsByLandId()` | `landId: string` | `Observable<BuildingLocationData[]>` |
| `getLandCoordinates()` | `landId: string` | `Observable<LandCoordinates[]>` |

### Building Service Methods
| Method | Parameters | Returns |
|--------|-----------|---------|
| `getAllBuildings()` | none | `Observable<BuildingData[]>` |
| `getBuildingByNumber()` | `buildingNumber: string` | `Observable<BuildingData>` |
| `getBuildingById()` | `id: string` | `Observable<BuildingData>` |
| `searchBuildings()` | `criteria: Partial<BuildingData>` | `Observable<BuildingData[]>` |
| `createBuilding()` | `building: Omit<BuildingData, 'id'>` | `Observable<BuildingData>` |
| `updateBuilding()` | `id: string, building: Partial<BuildingData>` | `Observable<BuildingData>` |
| `deleteBuilding()` | `id: string` | `Observable<{message: string}>` |
| `getBuildingBasicData()` | `buildingNumber: string` | `Observable<BuildingBasicData \| null>` |
| `getBuildingAnnexes()` | `buildingId: string` | `Observable<BuildingAnnexData[]>` |
| `getNetworkCosts()` | `buildingId: string` | `Observable<NetworkCostsData[]>` |

### Rental Service Methods
| Method | Parameters | Returns |
|--------|-----------|---------|
| `getAllRentalBuildings()` | none | `Observable<RentalBuildingDetails[]>` |
| `getRentalBuildingByIdNumber()` | `identificationNumber: string` | `Observable<RentalBuildingInfo>` |
| `getRentalBuildingById()` | `id: string` | `Observable<RentalBuildingDetails>` |
| `searchRentalBuildings()` | `criteria: {...}` | `Observable<RentalBuildingDetails[]>` |
| `createRentalBuilding()` | `building: Omit<RentalBuildingDetails, 'id'>` | `Observable<RentalBuildingDetails>` |
| `updateRentalBuilding()` | `id: string, building: Partial<...>` | `Observable<RentalBuildingDetails>` |
| `deleteRentalBuilding()` | `id: string` | `Observable<{message: string}>` |
| `getRentalBuildingLocation()` | `buildingId: string` | `Observable<RentalBuildingLocation \| null>` |
| `getRentalDecisions()` | `buildingId: string` | `Observable<RentalDecision[]>` |
| `getRentalStatusFlags()` | none | `Observable<RentalStatusFlag[]>` |

## Search & Replace Guide

Use VS Code's **Find in Files** (Ctrl+Shift+F) and **Replace in Files** (Ctrl+Shift+H):

### Step 1: Update Land Service
**Find:** `mock-land-database.service`  
**Replace:** `land-api.service`

**Find:** `MockLandDatabaseService`  
**Replace:** `LandApiService`

### Step 2: Update Building Service
**Find:** `mock-building-database.service`  
**Replace:** `building-api.service`

**Find:** `MockBuildingDatabaseService`  
**Replace:** `BuildingApiService`

### Step 3: Update Rental Service
**Find:** `mock-rental-database.service`  
**Replace:** `rental-api.service`

**Find:** `MockRentalDatabaseService`  
**Replace:** `RentalApiService`

### Step 4: Update School Map Service
**Find:** `mock-school-map-database.service`  
**Replace:** `school-map-api.service`

**Find:** `MockSchoolMapDatabaseService`  
**Replace:** `SchoolMapApiService`

### Step 5: Update Displacement Service
**Find:** `mock-displacement-database.service`  
**Replace:** `displacement-api.service`

**Find:** `MockDisplacementDatabaseService`  
**Replace:** `DisplacementApiService`

## Testing After Migration

After updating a component, test that it works:

1. **Start Backend:** `cd backend && npm run dev`
2. **Start Angular:** `npm start`
3. **Test the feature** in your browser
4. Check browser console for errors
5. Check backend console for API calls

## Common Issues

### Issue: "Observable<unknown>" error

**Problem:** TypeScript can't infer return type

**Solution:** Already fixed! All API services have explicit return types.

### Issue: "HttpClient not provided"

**Problem:** HttpClient not configured

**Solution:** Already fixed! HttpClient is provided in `app.config.ts`.

### Issue: CORS error

**Problem:** Backend not allowing Angular requests

**Solution:** Backend CORS is already configured. Make sure:
- Backend is running on port 3000
- Angular is running on port 4200

### Issue: "Cannot connect to database"

**Problem:** SQL Server connection failed

**Solution:**
1. Check backend `.env` file
2. Verify SQL Server is running
3. Test connection: `sqlcmd -S localhost -U username -P password`

## Component Update Checklist

- [ ] Land Inquiry
- [ ] Land Inquiry ID
- [ ] Land Coordinates
- [ ] Building Inquiry
- [ ] Building Basic Data
- [ ] Building Data Completion
- [ ] Building Annexes Data
- [ ] Building Network Costs
- [ ] Building Property Handover
- [ ] Building Temporary Fulfillment
- [ ] Rental Inquiry Building
- [ ] Rental Buildings List
- [ ] Rental Building Details
- [ ] Rental Building Location
- [ ] Rental Buildings Status
- [ ] Rental Status Menu
- [ ] Rental Status Edit
- [ ] Rental Status Report
- [ ] Rental Decision Buildings
- [ ] Rental Building Modify Status
- [ ] School Map Inquiry
- [ ] School Map Study Period
- [ ] School Map Roads
- [ ] School Map Annexes
- [ ] School Map Spaces
- [ ] Educational Building
- [ ] Displacement Final Compensation
- [ ] Displacement Council Approval
- [ ] Building Displacement Menu
- [ ] Building Displacement Pre
- [ ] Building Displacement Post

## Gradual Migration Strategy

You can migrate **one feature at a time**:

1. Update one component to use API service
2. Test thoroughly
3. If it works, move to next component
4. If there's an issue, revert that component temporarily

**Keep mock services** until all components are migrated and tested!

## Summary

Migration is simple:
1. Change import from `mock-X-database.service` to `X-api.service`
2. Change class name from `MockXDatabaseService` to `XApiService`
3. **No other code changes needed!**

The API services have **identical methods** to mock services, so your component logic doesn't change at all!
