# Mock Database Services - Quick Reference

## Overview

This application uses mock database services to simulate backend API calls. All services return Observables with realistic data and include simulated network delays to mimic real-world API behavior.

## Available Services

### 1. MockLandDatabaseService

**Location:** `src/app/services/mock-land-database.service.ts`

**Methods:**
- `getLandByReferenceNumber(referenceNumber: string): Observable<LandData | null>`
- `getAllLands(): Observable<LandData[]>`
- `searchLands(criteria: Partial<LandData>): Observable<LandData[]>`
- `getBuildingLocationsByLandId(landId: string): Observable<BuildingLocationData[]>`
- `getLandCoordinates(landId: string): Observable<LandCoordinates[]>`
- `saveLand(land: LandData): Observable<LandData>`

**Used In:**
- `land-inquiry.component.ts`
- `land-coordinates.component.ts`

### 2. MockBuildingDatabaseService

**Location:** `src/app/services/mock-building-database.service.ts`

**Methods:**
- `searchBuildings(criteria: any): Observable<BuildingData[]>`
- `getBuildingByNumber(buildingNumber: string): Observable<BuildingData | null>`
- `getBuildingBasicData(buildingNumber: string): Observable<BuildingBasicData | null>`
- `getBuildingAnnexes(buildingId: string): Observable<BuildingAnnexData[]>`
- `getNetworkCosts(buildingId: string): Observable<NetworkCostsData[]>`
- `saveBuilding(building: BuildingData): Observable<BuildingData>`
- `saveAnnex(annex: BuildingAnnexData): Observable<BuildingAnnexData>`

**Used In:**
- `school-map-inquiry.component.ts`
- `building-inquiry.component.ts`
- `building-basic-data.component.ts`
- `building-annexes-data.component.ts`
- `building-network-costs.component.ts`

### 3. MockRentalDatabaseService

**Location:** `src/app/services/mock-rental-database.service.ts`

**Methods:**
- `getRentalBuildingByIdNumber(identificationNumber: string): Observable<RentalBuildingInfo | null>`
- `getAllRentalBuildings(): Observable<RentalBuildingInfo[]>`
- `getRentalBuildingsByStatus(status: string): Observable<RentalBuildingInfo[]>`
- `getRentalBuildingDetails(buildingId: string): Observable<RentalBuildingDetails | null>`
- `getRentalBuildingLocation(buildingId: string): Observable<RentalBuildingLocation | null>`
- `getRentalStatusFlags(): Observable<RentalStatusFlag[]>`
- `getRentalDecisions(buildingId: string): Observable<RentalDecision[]>`
- `getRentalReportCategories(categoryType?: 'in-progress' | 'completed' | 'finished'): Observable<RentalReportCategory[]>`
- `updateRentalBuildingStatus(buildingId: string, status: string, substatus: string): Observable<RentalBuildingInfo>`
- `saveRentalBuilding(building: RentalBuildingDetails): Observable<RentalBuildingDetails>`

**Status Flags (16 total):**
- مغلقة (Closed)
- تعمل (Working)
- مؤجرة - نشطة (Rented - Active)
- عقد منتهي (Contract Expired)
- تحت الصيانة (Under Maintenance)
- شاغرة (Vacant)
- تعمل بكفاءة (Operating Efficiently)
- بحاجة للإصلاح (Needs Repair)
- قيد المراجعة (Under Review)
- معتمد (Approved)
- تم التبرع بها (Donated)
- تم شراؤها (Purchased)
- صدر قرار بردها للمالك (Decision to Return to Owner)
- تم نزع ملكيتها (Expropriated)
- جاري اتخاذ إجراءات شراء بعد البت (Purchase Procedures After Decision)
- جاري البت للشراء (Purchase Under Deliberation)

**Report Categories (26 total):**

*In-Progress (قيد الدراسة):*
- دراسة الاحتياج (Need Study)
- صلاحية الموقع (Location Validity)
- استكمال بيانات (Data Completion)
- اعتمادات اللجنة (Committee Approvals)
- تدرس باللجنة (Under Committee Study)
- توقيع م. الهيئة (Authority Signature)

*Completed (تم الدراسة):*
- اتخاذ ج. استيلاء (Seizure Decision)
- اخراج وشأن الادارة (Eviction/Admin Matter)
- رد للمالك (كلى/جزء/شرط) (Return to Owner - Total/Partial/Conditional)
- اتخاذ نزع ملكية (Expropriation Action)
- الايقاف والتصفية (Stop and Liquidation)
- استمرار الايجار (Continue Rental)
- قبول التبرع (Accept Donation)
- لجنة البت (Decision Committee)
- اتخاذ ج. شراء بعدب (Purchase Decision After)
- تفاوض على شراء (Purchase Negotiation)

*Finished (تم الانتهاء):*
- تم التعويض بحكم (Compensation by Ruling)
- رد قبل معرفة الرقم (Return Before ID Known)
- رد للمالك (Return to Owner)
- شراء (Purchase)
- نزع الملكية (Expropriation)
- تم التبرع (Donated)
- الاخراج وشأن الادارة (Eviction/Admin Matter)
- الايقاف وتصفية مبني (Stop and Liquidate Building)

**Used In:**
- `rental-inquiry-building.component.ts`
- `rental-buildings-list.component.ts`
- `rental-building-details.component.ts`
- `rental-building-location.component.ts`
- `rental-status-edit.component.ts`
- `rental-status-report.component.ts`

### 4. MockSchoolMapDatabaseService

**Location:** `src/app/services/mock-school-map-database.service.ts`

**Methods:**
- `getStudyPeriodsByBuildingCode(buildingCode: string): Observable<StudyPeriodData[]>`
- `getSchoolRoads(buildingId: string): Observable<SchoolRoadData[]>`
- `getSchoolAnnexes(buildingId: string): Observable<SchoolAnnexData[]>`
- `getSchoolSpaces(buildingId: string): Observable<SchoolSpaceData[]>`
- `getEducationalBuilding(buildingNumber: string): Observable<EducationalBuildingData | null>`
- `saveStudyPeriod(period: StudyPeriodData): Observable<StudyPeriodData>`
- `saveSchoolSpace(space: SchoolSpaceData): Observable<SchoolSpaceData>`
- `saveSchoolAnnex(annex: SchoolAnnexData): Observable<SchoolAnnexData>`

**Used In:**
- `school-map-study-period.component.ts`
- `school-map-roads.component.ts`
- `school-map-annexes.component.ts`
- `school-map-spaces.component.ts`

### 5. MockDisplacementDatabaseService

**Location:** `src/app/services/mock-displacement-database.service.ts`

**Methods:**
- `getDisplacementProcess(schoolNumber: string): Observable<DisplacementProcessData | null>`
- `getAllDisplacementProcesses(): Observable<DisplacementProcessData[]>`
- `getCompensationEntries(displacementId: string): Observable<FinalCompensationEntry[]>`
- `getDisplayListEntries(displacementId: string): Observable<DisplayListEntry[]>`
- `getConformityCertificates(displacementId: string): Observable<ConformityCertificate[]>`
- `getRealEstateUnits(displacementId: string): Observable<RealEstateUnit[]>`
- `getSaleForms(displacementId: string): Observable<SaleForm[]>`
- `getMinisterDecisions(displacementId: string): Observable<MinisterDecision[]>`
- `getCouncilApprovals(displacementId: string): Observable<CouncilApprovalData[]>`
- `saveDisplacementProcess(process: DisplacementProcessData): Observable<DisplacementProcessData>`
- `saveCompensationEntry(entry: FinalCompensationEntry): Observable<FinalCompensationEntry>`

**Used In:**
- `building-displacement-post.component.ts`
- `building-displacement-pre.component.ts`
- `displacement-final-compensation.component.ts`
- `displacement-council-approval.component.ts`

## Usage Examples

### Example 1: Fetching Land Data

```typescript
import { Component, inject, signal } from '@angular/core';
import { MockLandDatabaseService } from '../../services/mock-land-database.service';
import { LandData } from '../../models/land.model';

export class MyComponent {
  private landService = inject(MockLandDatabaseService);
  landData = signal<LandData | null>(null);
  
  loadLandData(referenceNumber: string): void {
    this.landService.getLandByReferenceNumber(referenceNumber).subscribe({
      next: (data) => {
        this.landData.set(data);
      },
      error: (error) => {
        console.error('Error loading land:', error);
      }
    });
  }
}
```

### Example 2: Searching Buildings

```typescript
import { Component, inject, signal } from '@angular/core';
import { MockBuildingDatabaseService } from '../../services/mock-building-database.service';
import { BuildingData } from '../../models/building.model';

export class MyComponent {
  private buildingService = inject(MockBuildingDatabaseService);
  buildings = signal<BuildingData[]>([]);
  
  searchBuildings(criteria: any): void {
    this.buildingService.searchBuildings(criteria).subscribe({
      next: (results) => {
        this.buildings.set(results);
      },
      error: (error) => {
        console.error('Error searching buildings:', error);
      }
    });
  }
}
```

### Example 3: Saving Data

```typescript
import { Component, inject } from '@angular/core';
import { MockLandDatabaseService } from '../../services/mock-land-database.service';
import { LandData } from '../../models/land.model';

export class MyComponent {
  private landService = inject(MockLandDatabaseService);
  
  saveLandData(landData: LandData): void {
    this.landService.saveLand(landData).subscribe({
      next: (savedData) => {
        console.log('Land saved successfully:', savedData);
        alert('تم حفظ البيانات بنجاح');
      },
      error: (error) => {
        console.error('Error saving land:', error);
        alert('حدث خطأ أثناء حفظ البيانات');
      }
    });
  }
}
```

## Mock Data Characteristics

### Network Delay Simulation
All mock services include realistic network delays:
- **Fast queries** (by ID): 200-400ms
- **Standard queries**: 300-500ms
- **Complex searches**: 400-600ms
- **Save operations**: 300-400ms

### Data Generation
Mock services generate realistic Arabic data including:
- School names (مدرسة النور، مدرسة الأمل، etc.)
- Location names (الرياض، جدة، الدمام، etc.)
- Status values (معتمد، قيد المراجعة، etc.)
- Numerical data with realistic ranges

### In-Memory Storage
Mock services maintain in-memory data stores that persist during the application session. Data is lost on page refresh.

## Data Models

All interfaces are defined in `src/app/models/`:

```typescript
// Land Models
export interface LandData { /* ... */ }
export interface BuildingLocationData { /* ... */ }
export interface LandCoordinates { /* ... */ }

// Building Models
export interface BuildingData { /* ... */ }
export interface BuildingBasicData { /* ... */ }
export interface BuildingAnnexData { /* ... */ }
export interface NetworkCostsData { /* ... */ }

// Rental Models
export interface RentalBuildingInfo { /* ... */ }
export interface RentalBuildingDetails { /* ... */ }
export interface RentalBuildingLocation { /* ... */ }
export interface RentalStatusFlag { /* ... */ }
export interface RentalDecision { /* ... */ }

// School Map Models
export interface StudyPeriodData { /* ... */ }
export interface SchoolRoadData { /* ... */ }
export interface SchoolAnnexData { /* ... */ }
export interface SchoolSpaceData { /* ... */ }
export interface EducationalBuildingData { /* ... */ }

// Displacement Models
export interface FinalCompensationEntry { /* ... */ }
export interface DisplayListEntry { /* ... */ }
export interface ConformityCertificate { /* ... */ }
export interface RealEstateUnit { /* ... */ }
export interface SaleForm { /* ... */ }
export interface MinisterDecision { /* ... */ }
export interface DisplacementProcessData { /* ... */ }
export interface CouncilApprovalData { /* ... */ }
```

## Testing with Mock Services

### Unit Testing
Mock services are perfect for unit tests:

```typescript
import { TestBed } from '@angular/core/testing';
import { MockLandDatabaseService } from '../../services/mock-land-database.service';

describe('LandInquiryComponent', () => {
  let service: MockLandDatabaseService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockLandDatabaseService]
    });
    service = TestBed.inject(MockLandDatabaseService);
  });
  
  it('should return land data', (done) => {
    service.getLandByReferenceNumber('REF-001').subscribe(data => {
      expect(data).toBeTruthy();
      expect(data?.referenceNumber).toBe('REF-001');
      done();
    });
  });
});
```

## Migration Path

When ready to connect to a real database/API:

1. **Create real API services** (e.g., `LandApiService`)
2. **Keep the same method signatures** for easy replacement
3. **Replace service injection** in components
4. **Keep mock services** for testing purposes

See `DATABASE_INTEGRATION.md` for detailed migration instructions.

## Best Practices

### 1. Always Handle Errors
```typescript
this.landService.getLandByReferenceNumber(ref).subscribe({
  next: (data) => { /* handle success */ },
  error: (error) => { /* handle error */ }
});
```

### 2. Use Signals for Reactive State
```typescript
protected landData = signal<LandData | null>(null);
protected isLoading = signal(false);
```

### 3. Show Loading Indicators
```typescript
this.isLoading.set(true);
this.landService.getLandByReferenceNumber(ref).subscribe({
  next: (data) => {
    this.landData.set(data);
    this.isLoading.set(false);
  }
});
```

### 4. Unsubscribe When Needed
For long-lived subscriptions, use `takeUntilDestroyed()`:

```typescript
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

constructor() {
  this.landService.getAllLands()
    .pipe(takeUntilDestroyed())
    .subscribe(data => {
      this.lands.set(data);
    });
}
```

## Support

For questions or issues with mock services:
1. Check the service implementation in `src/app/services/`
2. Review data models in `src/app/models/`
3. Refer to `DATABASE_INTEGRATION.md` for migration guidance
4. Check component implementations for usage examples
