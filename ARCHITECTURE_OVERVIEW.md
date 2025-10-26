# Application Architecture Overview

## Current Architecture (Mock Services)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Angular Application                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                       Components Layer                         │  │
│  │                                                                │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐ │  │
│  │  │   Land      │  │  Rental     │  │    School Map        │ │  │
│  │  │  Inquiry    │  │  Inquiry    │  │     Inquiry          │ │  │
│  │  │             │  │             │  │                      │ │  │
│  │  │  - Search   │  │  - Search   │  │  - Search Buildings  │ │  │
│  │  │  - Display  │  │  - Display  │  │  - Study Periods     │ │  │
│  │  │  - Popups   │  │  - Edit     │  │  - Roads/Annexes     │ │  │
│  │  └─────────────┘  └─────────────┘  └──────────────────────┘ │  │
│  │                                                                │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐ │  │
│  │  │  Building   │  │ Displacement│  │    Rental List       │ │  │
│  │  │   Basic     │  │    Post     │  │                      │ │  │
│  │  │    Data     │  │             │  │  - Load on Init      │ │  │
│  │  │             │  │  - Process  │  │  - Display List      │ │  │
│  │  │  - Display  │  │  - Modals   │  │  - Navigate          │ │  │
│  │  └─────────────┘  └─────────────┘  └──────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                             ↓ inject()                              │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   Mock Database Services                      │  │
│  │                                                                │  │
│  │  ┌────────────────┐  ┌────────────────┐  ┌─────────────────┐ │  │
│  │  │ MockLand       │  │ MockBuilding   │  │ MockRental      │ │  │
│  │  │ DatabaseService│  │ DatabaseService│  │ DatabaseService │ │  │
│  │  │                │  │                │  │                 │ │  │
│  │  │ 5 methods      │  │ 7 methods      │  │ 10 methods      │ │  │
│  │  │ - getLand      │  │ - searchBldgs  │  │ - getByIdNum    │ │  │
│  │  │ - getAllLands  │  │ - getBasicData │  │ - getAllRentals │ │  │
│  │  │ - getBuildings │  │ - getAnnexes   │  │ - getDetails    │ │  │
│  │  │ - getCoords    │  │ - getCosts     │  │ - getStatusFlags│ │  │
│  │  │ - saveLand     │  │ - saveAnnex    │  │ - getCategories │ │  │
│  │  └────────────────┘  └────────────────┘  └─────────────────┘ │  │
│  │                                                                │  │
│  │  ┌────────────────┐  ┌────────────────┐                      │  │
│  │  │ MockSchoolMap  │  │ MockDisplacement│                     │  │
│  │  │ DatabaseService│  │ DatabaseService │                     │  │
│  │  │                │  │                 │                     │  │
│  │  │ 8 methods      │  │ 11 methods      │                     │  │
│  │  │ - getPeriods   │  │ - getProcess    │                     │  │
│  │  │ - getRoads     │  │ - getCompensate │                     │  │
│  │  │ - getAnnexes   │  │ - getDisplays   │                     │  │
│  │  │ - getSpaces    │  │ - getCerts      │                     │  │
│  │  └────────────────┘  └────────────────┘                      │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                             ↓ imports                               │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                       Data Models                             │  │
│  │                                                                │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │  │
│  │  │   Land   │  │ Building │  │  Rental  │  │SchoolMap │     │  │
│  │  │  Models  │  │  Models  │  │  Models  │  │  Models  │     │  │
│  │  │          │  │          │  │          │  │          │     │  │
│  │  │ 3 types  │  │ 4 types  │  │ 6 types  │  │ 5 types  │     │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │  │
│  │                                                                │  │
│  │  ┌──────────────────────┐                                     │  │
│  │  │    Displacement      │                                     │  │
│  │  │       Models         │                                     │  │
│  │  │                      │                                     │  │
│  │  │     9 types          │                                     │  │
│  │  └──────────────────────┘                                     │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    In-Memory Storage                          │  │
│  │  (Data persists during session, resets on refresh)           │  │
│  │                                                                │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐         │  │
│  │  │  Lands  │  │Buildings│  │ Rentals │  │  Study  │         │  │
│  │  │  Array  │  │  Array  │  │  Array  │  │ Periods │         │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘         │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

                    Data Flow: Component → Service → Model
                    Network Delay: 300-800ms (simulated)
                    Return Type: Observable<T>
```

---

## Future Architecture (With Real Database)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Angular Application                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                       Components Layer                         │  │
│  │                    (No changes needed!)                        │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                             ↓ inject()                              │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                     Real API Services                         │  │
│  │              (Replace mock service injection)                 │  │
│  │                                                                │  │
│  │  ┌────────────────┐  ┌────────────────┐  ┌─────────────────┐ │  │
│  │  │ LandApi        │  │ BuildingApi    │  │ RentalApi       │ │  │
│  │  │ Service        │  │ Service        │  │ Service         │ │  │
│  │  │                │  │                │  │                 │ │  │
│  │  │ Same methods   │  │ Same methods   │  │ Same methods    │ │  │
│  │  │ + HttpClient   │  │ + HttpClient   │  │ + HttpClient    │ │  │
│  │  └────────────────┘  └────────────────┘  └─────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                             ↓ HTTP                                  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    HTTP Interceptors                          │  │
│  │                                                                │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │  │
│  │  │     Auth     │  │    Error     │  │   Logging    │       │  │
│  │  │ Interceptor  │  │ Interceptor  │  │ Interceptor  │       │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘       │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                             ↓ HTTPS                                 │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                  ┌───────────────────────┐
                  │   Backend API Server  │
                  │                       │
                  │   - REST Endpoints    │
                  │   - Authentication    │
                  │   - Validation        │
                  │   - Business Logic    │
                  └───────────────────────┘
                              ↓
                  ┌───────────────────────┐
                  │   Database Server     │
                  │                       │
                  │   - SQL/NoSQL         │
                  │   - Tables/Collections│
                  │   - Relationships     │
                  │   - Indexes           │
                  └───────────────────────┘
```

---

## Service Method Patterns

### Current Pattern (Mock)
```typescript
// In Component
this.mockLandService.getLandByReferenceNumber(ref).subscribe({
  next: (data) => this.landData.set(data),
  error: (error) => this.handleError(error)
});

// In Mock Service
getLandByReferenceNumber(ref: string): Observable<LandData | null> {
  const land = this.lands.find(l => l.referenceNumber === ref);
  return of(land || this.generateLandData(ref)).pipe(delay(400));
}
```

### Future Pattern (Real API)
```typescript
// In Component (SAME CODE!)
this.landApiService.getLandByReferenceNumber(ref).subscribe({
  next: (data) => this.landData.set(data),
  error: (error) => this.handleError(error)
});

// In API Service
getLandByReferenceNumber(ref: string): Observable<LandData | null> {
  return this.http.get<LandData | null>(
    `${this.baseUrl}/lands/by-reference/${ref}`
  );
}
```

**Key Point:** Component code doesn't change! Only the service implementation changes.

---

## Data Flow Diagram

```
┌──────────────┐
│     User     │
│   Action     │
└──────┬───────┘
       │ Click Search Button
       ↓
┌──────────────┐
│  Component   │
│   Method     │  onSearch() {
│              │    this.service.getData().subscribe(...) 
└──────┬───────┘  }
       │ Call Service
       ↓
┌──────────────┐
│    Mock      │
│   Service    │  getData(): Observable<Data> {
│              │    return of(mockData).pipe(delay(400));
└──────┬───────┘  }
       │ Return Observable
       ↓
┌──────────────┐
│   Simulate   │  Wait 300-800ms
│    Network   │
│     Delay    │
└──────┬───────┘
       │ Emit Data
       ↓
┌──────────────┐
│  Component   │
│  subscribe   │  next: (data) => {
│   Handler    │    this.data.set(data);
│              │  }
└──────┬───────┘
       │ Update Signal
       ↓
┌──────────────┐
│   Template   │  {{ data().fieldName }}
│   Renders    │
│     Data     │
└──────────────┘
```

---

## Component Integration Patterns

### Pattern 1: Search Component
```typescript
export class SearchComponent {
  private service = inject(MockXxxDatabaseService);
  protected searchResults = signal<Data[]>([]);
  protected isLoading = signal(false);

  onSearch(): void {
    this.isLoading.set(true);
    this.service.search(criteria).subscribe({
      next: (results) => {
        this.searchResults.set(results);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.handleError(error);
      }
    });
  }
}
```

### Pattern 2: List Component (Load on Init)
```typescript
export class ListComponent implements OnInit {
  private service = inject(MockXxxDatabaseService);
  protected items = signal<Data[]>([]);

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (items) => this.items.set(items),
      error: (error) => this.handleError(error)
    });
  }
}
```

### Pattern 3: Detail Component (Load by ID)
```typescript
export class DetailComponent {
  private service = inject(MockXxxDatabaseService);
  protected item = signal<Data | null>(null);

  loadItem(id: string): void {
    this.service.getById(id).subscribe({
      next: (item) => this.item.set(item),
      error: (error) => this.handleError(error)
    });
  }
}
```

---

## File Organization

```
src/app/
│
├── models/                         # Data structure definitions
│   ├── index.ts                    # Central export
│   ├── land.model.ts              # 3 interfaces
│   ├── building.model.ts          # 4 interfaces
│   ├── rental.model.ts            # 6 interfaces
│   ├── school-map.model.ts        # 5 interfaces
│   └── displacement.model.ts      # 9 interfaces
│
├── services/                       # Business logic & data access
│   ├── mock-land-database.service.ts          # 5 methods
│   ├── mock-building-database.service.ts      # 7 methods
│   ├── mock-rental-database.service.ts        # 10 methods
│   ├── mock-school-map-database.service.ts    # 8 methods
│   └── mock-displacement-database.service.ts  # 11 methods
│
└── components/                     # UI components
    ├── land-inquiry/               # ✅ Updated
    ├── rental-inquiry-building/    # ✅ Updated
    ├── rental-buildings-list/      # ✅ Updated
    ├── school-map-inquiry/         # ✅ Updated
    ├── school-map-study-period/    # ✅ Updated
    ├── building-displacement-post/ # ✅ Updated
    └── [other components]/         # ⚠️ Can be updated
```

---

## Migration Checklist Quick View

```
┌─────────────────────────────────────────────────────────────┐
│  WHEN BACKEND IS READY                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ☐ 1. Create API Services (LandApiService, etc.)          │
│       ├─ Same method signatures as mock services          │
│       ├─ Use HttpClient for HTTP calls                    │
│       └─ Add to src/app/services/                         │
│                                                             │
│  ☐ 2. Configure Environment                                │
│       ├─ Add API URL to environment.ts                    │
│       └─ Add API URL to environment.prod.ts               │
│                                                             │
│  ☐ 3. Add HTTP Interceptors                               │
│       ├─ Auth interceptor (JWT tokens)                    │
│       ├─ Error interceptor (global error handling)        │
│       └─ Register in app.config.ts                        │
│                                                             │
│  ☐ 4. Update Component Injections                         │
│       ├─ Replace: MockLandDatabaseService                 │
│       └─ With: LandApiService                             │
│                                                             │
│  ☐ 5. Test Thoroughly                                     │
│       ├─ Test each endpoint                               │
│       ├─ Test error scenarios                             │
│       └─ Test with real data                              │
│                                                             │
│  ☐ 6. Keep Mock Services                                  │
│       └─ For unit testing and development                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Benefits Summary

```
┌────────────────────────────────────────────────────┐
│  BEFORE (Static Data)     →    AFTER (Dynamic)     │
├────────────────────────────────────────────────────┤
│                                                     │
│  Hardcoded arrays         →    Service methods     │
│  Copy-paste data          →    Generated data      │
│  No type safety           →    Full TypeScript     │
│  Difficult to change      →    Easy to maintain    │
│  No testing strategy      →    Mockable services   │
│  No backend plan          →    Clear migration     │
│  No documentation         →    4 guide documents   │
│                                                     │
└────────────────────────────────────────────────────┘
```

---

## Success Indicators

✅ **Code Quality**
- Zero compilation errors
- Full TypeScript support
- Consistent patterns
- Comprehensive JSDoc

✅ **Functionality**
- Data loads correctly
- Network delay works
- Error handling prevents crashes
- Relationships maintained

✅ **Documentation**
- 4 comprehensive guides
- Clear examples
- Migration path defined
- Troubleshooting included

✅ **Maintainability**
- Centralized data logic
- Easy to update
- Simple to extend
- Ready for API integration

---

**Visual representations help understand:**
- How components connect to services
- How services connect to data models
- What changes when migrating to real API
- How data flows through the application
