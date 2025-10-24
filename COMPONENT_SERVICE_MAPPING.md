# Component-Service Mapping

## Overview

This document maps each component to the mock database services it uses and describes what data each component displays or manages.

## Component Mappings

### Land Management Components

#### `land-inquiry.component.ts`
**Services Used:**
- `MockLandDatabaseService`

**Methods Used:**
- `getLandByReferenceNumber()` - Fetch land data by reference number
- `getBuildingLocationsByLandId()` - Fetch building locations for the land

**Data Displayed:**
- Land reference information
- Usage status and approval details
- Owner information
- Area measurements
- Land availability data (coordinates, network data, construction obstacles, etc.)
- Building locations popup

**Previous Implementation:**
- ❌ Used inline `generateMockLandData()` method
- ❌ Used inline `generateMockBuildingData()` method

**Current Implementation:**
- ✅ Uses `MockLandDatabaseService.getLandByReferenceNumber()`
- ✅ Uses `MockLandDatabaseService.getBuildingLocationsByLandId()`

---

### Building Management Components

#### `school-map-inquiry.component.ts`
**Services Used:**
- `MockBuildingDatabaseService`

**Methods Used:**
- `searchBuildings()` - Search buildings by criteria

**Data Displayed:**
- Building search results
- School names and numbers
- Usage status and affiliation
- Building ownership type

**Previous Implementation:**
- ❌ Used inline `dummyResults` array

**Current Implementation:**
- ✅ Uses `MockBuildingDatabaseService.searchBuildings()`

#### `building-basic-data.component.ts`
**Services Used:**
- `MockBuildingDatabaseService`

**Methods Used:**
- `getBuildingBasicData()` - Fetch detailed building information

**Data Displayed:**
- Building name and number
- Land and built area
- Number of floors
- Construction year
- Building condition
- Ownership type

**Implementation Status:**
- ⚠️ **To be updated** - Currently uses static data

#### `building-annexes-data.component.ts`
**Services Used:**
- `MockBuildingDatabaseService`

**Methods Used:**
- `getBuildingAnnexes()` - Fetch building annexes
- `saveAnnex()` - Save new or updated annex

**Data Displayed:**
- Annex type and name
- Annex area
- Construction year
- Purpose and condition

**Implementation Status:**
- ⚠️ **To be updated** - Currently uses static data

#### `building-network-costs.component.ts`
**Services Used:**
- `MockBuildingDatabaseService`

**Methods Used:**
- `getNetworkCosts()` - Fetch network utility costs

**Data Displayed:**
- Network type (water, electricity, sewage, telecom)
- Installation and maintenance costs
- Provider information
- Contract details

**Implementation Status:**
- ⚠️ **To be updated** - Currently uses static data

---

### Rental Management Components

#### `rental-inquiry-building.component.ts`
**Services Used:**
- `MockRentalDatabaseService`

**Methods Used:**
- `getRentalBuildingByIdNumber()` - Fetch rental building by ID

**Data Displayed:**
- Building identification number
- Building name
- Rental status and substatus
- Tenant information

**Previous Implementation:**
- ❌ Used inline object creation

**Current Implementation:**
- ✅ Uses `MockRentalDatabaseService.getRentalBuildingByIdNumber()`

#### `rental-buildings-list.component.ts`
**Services Used:**
- `MockRentalDatabaseService`

**Methods Used:**
- `getAllRentalBuildings()` - Fetch all rental buildings

**Data Displayed:**
- List of rental buildings
- Building names
- Rental status
- Tenant information

**Previous Implementation:**
- ❌ Used static array with 3 hardcoded buildings

**Current Implementation:**
- ✅ Uses `MockRentalDatabaseService.getAllRentalBuildings()`
- ✅ Implements `OnInit` to load data on component initialization

#### `rental-building-details.component.ts`
**Services Used:**
- `MockRentalDatabaseService`

**Methods Used:**
- `getRentalBuildingDetails()` - Fetch detailed rental building info

**Data Displayed:**
- Complete building information
- Area measurements
- Contract dates
- Inspection status

**Implementation Status:**
- ⚠️ **To be updated** - Currently uses static data

#### `rental-building-location.component.ts`
**Services Used:**
- `MockRentalDatabaseService`

**Methods Used:**
- `getRentalBuildingLocation()` - Fetch location data

**Data Displayed:**
- Governorate and city
- District and neighborhood
- Street and building number
- GPS coordinates

**Implementation Status:**
- ⚠️ **To be updated** - Currently uses static data

#### `rental-status-edit.component.ts`
**Services Used:**
- `MockRentalDatabaseService`

**Methods Used:**
- `getRentalStatusFlags()` - Fetch available status flags (16 total)
- `updateRentalBuildingStatus()` - Update building status

**Data Displayed:**
- Status flag options with Arabic labels (مغلقة, تعمل, مؤجرة - نشطة, etc.)
- Selected status flags as checkboxes

**Implementation Status:**
- ✅ Uses `MockRentalDatabaseService.getRentalStatusFlags()`
- ✅ Uses `MockRentalDatabaseService.updateRentalBuildingStatus()`

#### `rental-status-report.component.ts`
**Services Used:**
- `MockRentalDatabaseService`

**Methods Used:**
- `getRentalReportCategories()` - Fetch report categories by type

**Data Displayed:**
- In-Progress categories (6 categories): دراسة الاحتياج, صلاحية الموقع, etc.
- Completed categories (12 categories): اتخاذ ج. استيلاء, اخراج وشأن الادارة, etc.
- Finished categories (8 categories): تم التعويض بحكم, شراء, نزع الملكية, etc.
- Statistics: total count, closed count, working count per category

**Implementation Status:**
- ✅ Uses `MockRentalDatabaseService.getRentalReportCategories()`

---

### School Map Components

#### `school-map-study-period.component.ts`
**Services Used:**
- `MockSchoolMapDatabaseService`

**Methods Used:**
- `getStudyPeriodsByBuildingCode()` - Fetch study periods

**Data Displayed:**
- Study period names (morning/evening)
- School names
- Student counts (boys/girls)
- Period stages

**Previous Implementation:**
- ❌ Used inline `dummyData` array

**Current Implementation:**
- ✅ Uses `MockSchoolMapDatabaseService.getStudyPeriodsByBuildingCode()`

#### `school-map-roads.component.ts`
**Services Used:**
- `MockSchoolMapDatabaseService`

**Methods Used:**
- `getSchoolRoads()` - Fetch surrounding roads

**Data Displayed:**
- Road names
- Road types (main/secondary/internal)
- Road width and condition
- Direction (north/south/east/west)

**Implementation Status:**
- ⚠️ **To be updated** - Currently uses static data

#### `school-map-annexes.component.ts`
**Services Used:**
- `MockSchoolMapDatabaseService`

**Methods Used:**
- `getSchoolAnnexes()` - Fetch school annexes
- `saveSchoolAnnex()` - Save annex data

**Data Displayed:**
- Annex name and type
- Area and capacity
- Construction date
- Purpose and condition

**Implementation Status:**
- ⚠️ **To be updated** - Currently uses static data

#### `school-map-spaces.component.ts`
**Services Used:**
- `MockSchoolMapDatabaseService`

**Methods Used:**
- `getSchoolSpaces()` - Fetch school spaces/rooms
- `saveSchoolSpace()` - Save space data

**Data Displayed:**
- Space type (classroom/lab/library/office)
- Floor number
- Area and capacity
- Facilities (AC, projector)

**Implementation Status:**
- ⚠️ **To be updated** - Currently uses static data

---

### Displacement Management Components

#### `building-displacement-post.component.ts`
**Services Used:**
- `MockDisplacementDatabaseService`

**Methods Used:**
- `getDisplacementProcess()` - Fetch displacement process data
- `getCompensationEntries()` - Fetch compensation entries
- `getDisplayListEntries()` - Fetch display lists
- `getConformityCertificates()` - Fetch certificates
- `getRealEstateUnits()` - Fetch real estate units
- `getSaleForms()` - Fetch sale forms
- `getMinisterDecisions()` - Fetch minister decisions

**Data Displayed:**
- School information
- Cabinet decision details
- Compensation entries
- Display lists
- Conformity certificates
- Real estate units
- Sale forms
- Minister decisions

**Previous Implementation:**
- ❌ Used static school number and name

**Current Implementation:**
- ✅ Uses `MockDisplacementDatabaseService.getDisplacementProcess()`
- ✅ Implements `OnInit` to load displacement data

#### `building-displacement-pre.component.ts`
**Services Used:**
- `MockDisplacementDatabaseService`

**Methods Used:**
- `getDisplacementProcess()` - Fetch pre-displacement data

**Data Displayed:**
- Pre-displacement requirements
- Initial assessment data

**Implementation Status:**
- ⚠️ **To be updated** - Currently uses static data

#### `displacement-final-compensation.component.ts`
**Services Used:**
- `MockDisplacementDatabaseService`

**Methods Used:**
- `getCompensationEntries()` - Fetch compensation entries
- `saveCompensationEntry()` - Save compensation entry

**Data Displayed:**
- Check numbers
- Compensation amounts
- Payment dates
- Recipient names

**Implementation Status:**
- ⚠️ **To be updated** - Currently uses static data

#### `displacement-council-approval.component.ts`
**Services Used:**
- `MockDisplacementDatabaseService`

**Methods Used:**
- `getCouncilApprovals()` - Fetch council approvals

**Data Displayed:**
- Council name
- Approval number and date
- Session information
- Decision details

**Implementation Status:**
- ⚠️ **To be updated** - Currently uses static data

---

## Migration Priority

### ✅ Completed (4 components)
1. ✅ `land-inquiry.component.ts`
2. ✅ `rental-inquiry-building.component.ts`
3. ✅ `rental-buildings-list.component.ts`
4. ✅ `school-map-inquiry.component.ts`
5. ✅ `school-map-study-period.component.ts`
6. ✅ `building-displacement-post.component.ts` (partial)

### ⚠️ High Priority (Should be updated next)
1. `building-basic-data.component.ts`
2. `building-annexes-data.component.ts`
3. `rental-building-details.component.ts`
4. `rental-building-location.component.ts`
5. `rental-status-edit.component.ts`

### 🔵 Medium Priority
1. `school-map-roads.component.ts`
2. `school-map-annexes.component.ts`
3. `school-map-spaces.component.ts`
4. `building-network-costs.component.ts`

### 🟢 Lower Priority
1. `displacement-final-compensation.component.ts`
2. `displacement-council-approval.component.ts`
3. `building-displacement-pre.component.ts`

---

## Update Pattern

To update a component to use mock services, follow this pattern:

### Step 1: Import the Service and Models
```typescript
import { MockXxxDatabaseService } from '../../services/mock-xxx-database.service';
import { XxxData } from '../../models/xxx.model';
```

### Step 2: Inject the Service
```typescript
export class MyComponent {
  private xxxService = inject(MockXxxDatabaseService);
}
```

### Step 3: Replace Static Data with Service Calls
```typescript
// Before
const staticData = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];
this.items.set(staticData);

// After
this.xxxService.getItems().subscribe({
  next: (data) => {
    this.items.set(data);
  },
  error: (error) => {
    console.error('Error loading items:', error);
    alert('حدث خطأ أثناء تحميل البيانات');
  }
});
```

### Step 4: Add Loading State
```typescript
protected isLoading = signal(false);

loadData(): void {
  this.isLoading.set(true);
  this.xxxService.getItems().subscribe({
    next: (data) => {
      this.items.set(data);
      this.isLoading.set(false);
    },
    error: (error) => {
      this.isLoading.set(false);
      this.handleError(error);
    }
  });
}
```

---

## Service-to-Component Cross-Reference

### MockLandDatabaseService
**Used by:**
- `land-inquiry.component.ts`
- `land-coordinates.component.ts` (if exists)

### MockBuildingDatabaseService
**Used by:**
- `school-map-inquiry.component.ts` ✅
- `building-inquiry.component.ts` ⚠️
- `building-basic-data.component.ts` ⚠️
- `building-annexes-data.component.ts` ⚠️
- `building-network-costs.component.ts` ⚠️

### MockRentalDatabaseService
**Used by:**
- `rental-inquiry-building.component.ts` ✅
- `rental-buildings-list.component.ts` ✅
- `rental-building-details.component.ts` ⚠️
- `rental-building-location.component.ts` ⚠️
- `rental-status-edit.component.ts` ✅
- `rental-status-report.component.ts` ✅

### MockSchoolMapDatabaseService
**Used by:**
- `school-map-study-period.component.ts` ✅
- `school-map-roads.component.ts` ⚠️
- `school-map-annexes.component.ts` ⚠️
- `school-map-spaces.component.ts` ⚠️

### MockDisplacementDatabaseService
**Used by:**
- `building-displacement-post.component.ts` ✅ (partial)
- `building-displacement-pre.component.ts` ⚠️
- `displacement-final-compensation.component.ts` ⚠️
- `displacement-council-approval.component.ts` ⚠️

---

## Notes

- **✅ Completed**: Component fully migrated to use mock service
- **⚠️ To be updated**: Component still uses static data
- **🔵 Medium Priority**: Can be updated when time permits
- **🟢 Lower Priority**: Less frequently used features

All completed components now:
1. Import data models from `src/app/models/`
2. Inject mock database services
3. Use service methods instead of static data
4. Handle loading states
5. Handle errors appropriately
