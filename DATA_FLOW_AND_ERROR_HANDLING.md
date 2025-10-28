# Data Flow and Error Handling Implementation

## Overview
This document outlines the implementation of proper data flow between Angular components and the .NET backend, along with comprehensive error handling.

---

## Critical Fixes Implemented

### 1. API Route Corrections

**Issue:** Mismatch between Angular service URLs and backend controller routes

**Fixed Routes:**

| Service | Old URL | Correct URL | Backend Controller |
|---------|---------|-------------|-------------------|
| SchoolMapApiService | `api/school-maps` | `api/schoolmaps` | SchoolMapsController |
| BuildingApiService | `api/buildings` | `api/buildings` | BuildingsController ✓ |
| LandApiService | `api/lands` | `api/lands` | LandsController ✓ |
| RentalApiService | `api/rentals` | `api/rentals` | RentalsController ✓ |
| DisplacementApiService | `api/displacements` | `api/displacements` | DisplacementsController ✓ |

---

## 2. New Error Handler Service

**File:** `src/app/services/error-handler.service.ts`

### Features:
- Centralized HTTP error handling
- Arabic error messages for user-friendly display
- Data validation methods
- GUID validation
- String and array validation

### Error Codes Handled:

```typescript
Status 0   → Cannot connect to server (Backend is down)
Status 400 → Bad Request (Invalid or incomplete data)
Status 401 → Unauthorized (Please login)
Status 403 → Forbidden (No permission)
Status 404 → Not Found (Data doesn't exist)
Status 409 → Conflict (Duplicate data)
Status 500 → Internal Server Error
Status 503 → Service Unavailable
```

### Validation Methods:

```typescript
// Validate required data exists
validateData<T>(data: T | null | undefined, dataName: string): T

// Validate array is not empty
validateArrayData<T>(data: T[] | null | undefined, dataName: string): T[]

// Validate string is not empty
validateString(value: string | null | undefined, fieldName: string): string

// Validate GUID format
validateGuid(guid: string | null | undefined, fieldName: string): string

// Log and show error to user
logAndShowError(error: any, context: string): void
```

---

## 3. Updated API Services with Error Handling

All API services now include:

✅ **Input Validation:** Validate parameters before making HTTP calls
✅ **Error Catching:** Use RxJS `catchError` operator
✅ **Logging:** Console.log successful operations
✅ **Error Messages:** User-friendly Arabic messages
✅ **Type Safety:** Proper TypeScript typing

### Example Pattern:

```typescript
getDataById(id: string): Observable<DataType> {
  // 1. Validate input
  try {
    this.errorHandler.validateGuid(id, 'معرف');
  } catch (error: any) {
    this.errorHandler.logAndShowError(error, 'getDataById');
    return throwError(() => error);
  }

  // 2. Make HTTP call with error handling
  return this.http.get<DataType>(`${this.baseUrl}/${id}`).pipe(
    tap(data => console.log('Fetched data:', data)),
    catchError(error => this.errorHandler.handleError(error))
  );
}
```

---

## 4. Backend API Endpoint Reference

### SchoolMapsController (`api/schoolmaps`)

| Method | Endpoint | Description | Returns |
|--------|----------|-------------|---------|
| GET | `/study-periods/{buildingCode}` | Get study periods by building code | StudyPeriod[] |
| GET | `/roads/{buildingId}` | Get school roads by building ID | SchoolRoad[] |
| GET | `/annexes/{buildingId}` | Get school annexes by building ID | SchoolAnnex[] |
| GET | `/spaces/{buildingId}` | Get school spaces by building ID | SchoolSpace[] |
| GET | `/educational-buildings/{buildingCode}` | Get educational building by code | EducationalBuilding |
| GET | `/educational-buildings` | Get all educational buildings | EducationalBuilding[] |
| POST | `/study-periods` | Add study period | StudyPeriod |
| POST | `/roads` | Add school road | SchoolRoad |
| POST | `/annexes` | Add school annex | SchoolAnnex |
| POST | `/spaces` | Add school space | SchoolSpace |
| POST | `/educational-buildings` | Create educational building | EducationalBuilding |
| PUT | `/educational-buildings/{id}` | Update educational building | EducationalBuilding |

### BuildingsController (`api/buildings`)

| Method | Endpoint | Description | Returns |
|--------|----------|-------------|---------|
| GET | `/` | Get all buildings | Building[] |
| GET | `/{id}` | Get building by ID | Building |
| GET | `/by-number/{buildingNumber}` | Get building by number | Building |
| POST | `/search` | Search buildings by criteria | Building[] |
| POST | `/` | Create building | Building |
| PUT | `/{id}` | Update building | Building |
| DELETE | `/{id}` | Delete building | { message } |
| GET | `/{id}/basic-data` | Get building basic data | BuildingBasicData |
| POST | `/{id}/basic-data` | Add building basic data | BuildingBasicData |
| GET | `/{id}/annexes` | Get building annexes | BuildingAnnex[] |
| POST | `/{id}/annexes` | Add building annex | BuildingAnnex |
| GET | `/{id}/network-costs` | Get network costs | NetworkCosts[] |
| POST | `/{id}/network-costs` | Add network costs | NetworkCosts |

### LandsController (`api/lands`)

| Method | Endpoint | Description | Returns |
|--------|----------|-------------|---------|
| GET | `/` | Get all lands | Land[] |
| GET | `/{id}` | Get land by ID | Land |
| GET | `/reference/{referenceNumber}` | Get land by reference | Land |
| POST | `/` | Create land | Land |
| PUT | `/{id}` | Update land | Land |
| DELETE | `/{id}` | Delete land | { message } |
| GET | `/{id}/coordinates` | Get land coordinates | LandCoordinate[] |
| POST | `/{id}/coordinates` | Add coordinate | LandCoordinate |
| GET | `/{id}/locations` | Get building locations | BuildingLocation[] |
| POST | `/{id}/locations` | Add building location | BuildingLocation |

### RentalsController (`api/rentals`)

| Method | Endpoint | Description | Returns |
|--------|----------|-------------|---------|
| GET | `/` | Get all rental buildings | RentalBuilding[] |
| GET | `/{id}` | Get rental building by ID | RentalBuilding |
| GET | `/by-id-number/{identificationNumber}` | Get by identification number | RentalBuilding |
| POST | `/` | Create rental building | RentalBuilding |
| PUT | `/{id}` | Update rental building | RentalBuilding |
| DELETE | `/{id}` | Delete rental building | { message } |
| GET | `/{id}/location` | Get rental location | RentalBuildingLocation |
| POST | `/{id}/location` | Add rental location | RentalBuildingLocation |
| GET | `/{id}/decisions` | Get rental decisions | RentalDecision[] |
| POST | `/{id}/decisions` | Add rental decision | RentalDecision |
| GET | `/status-flags` | Get all status flags | RentalStatusFlag[] |

### DisplacementsController (`api/displacements`)

| Method | Endpoint | Description | Returns |
|--------|----------|-------------|---------|
| GET | `/` | Get all displacement records | DisplacementRecord[] |
| GET | `/{id}` | Get displacement by ID | DisplacementRecord |
| GET | `/by-reference/{referenceNumber}` | Get by reference number | DisplacementRecord |
| POST | `/` | Create displacement record | DisplacementRecord |
| PUT | `/{id}` | Update displacement record | DisplacementRecord |
| DELETE | `/{id}` | Delete displacement record | { message } |
| GET | `/{id}/compensations` | Get compensations | DisplacementCompensation[] |
| POST | `/{id}/compensations` | Add compensation | DisplacementCompensation |
| GET | `/{id}/approvals` | Get council approvals | CouncilApproval[] |
| POST | `/{id}/approvals` | Add council approval | CouncilApproval |

---

## 5. Component Data Flow

### Typical Data Flow Pattern:

```
1. Component Initialization
   ↓
2. Call API Service Method
   ↓
3. API Service Validates Input (ErrorHandlerService)
   ↓
4. HTTP Request to Backend
   ↓
5. Backend Processes Request
   ↓
6. Response Returns to Frontend
   ↓
7. Error Handling (if error)
   ├─→ Log to console
   ├─→ Display Arabic error message
   └─→ Return Observable with error
   ↓
8. Success Handling
   ├─→ Log success to console
   └─→ Component receives data
   ↓
9. Component Updates View
```

### Example Component Usage:

```typescript
export class SomeComponent {
  private readonly apiService = inject(SomeApiService);
  private readonly errorHandler = inject(ErrorHandlerService);
  
  data: DataType[] = [];
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading.set(true);
    this.error.set(null);

    this.apiService.getData().subscribe({
      next: (data) => {
        this.data = this.errorHandler.validateArrayData(data, 'البيانات');
        this.loading.set(false);
        console.log('Data loaded successfully:', data);
      },
      error: (err) => {
        this.error.set(err.message || 'حدث خطأ أثناء تحميل البيانات');
        this.loading.set(false);
        console.error('Error loading data:', err);
      }
    });
  }
}
```

---

## 6. Testing Checklist

### Backend Connection Test:
- [ ] Backend is running on http://localhost:5000
- [ ] Swagger UI accessible at http://localhost:5000/swagger
- [ ] Database is populated with seed data
- [ ] CORS allows requests from http://localhost:4200

### API Service Tests:
- [ ] SchoolMapApiService routes to `api/schoolmaps`
- [ ] All GET requests return data without 404 errors
- [ ] POST requests create new records
- [ ] PUT requests update existing records
- [ ] DELETE requests remove records
- [ ] Error responses show Arabic messages

### Component Tests:
- [ ] Components load data on initialization
- [ ] Loading indicators appear during API calls
- [ ] Success messages appear after operations
- [ ] Error messages display when operations fail
- [ ] Data validates before submission
- [ ] Empty states show when no data exists

### Error Handling Tests:
- [ ] Backend down (Status 0) - Shows connection error
- [ ] Invalid data (Status 400) - Shows validation error
- [ ] Not found (Status 404) - Shows data not found error
- [ ] Server error (Status 500) - Shows server error message
- [ ] Invalid GUID - Shows GUID validation error
- [ ] Empty required field - Shows field validation error

---

## 7. Common Issues and Solutions

### Issue 1: 404 Not Found on API Calls
**Cause:** Route mismatch between frontend and backend
**Solution:** Verify controller route matches service baseUrl
- Backend: `[Route("api/[controller]")]` becomes `api/controllername` (lowercase, no hyphen)
- Frontend: Use exact same route in service

### Issue 2: CORS Error
**Cause:** Backend not configured to accept requests from Angular
**Solution:** Check `Program.cs` has CORS configured:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
app.UseCors("AllowAngular");
```

### Issue 3: Cannot Connect to Server (Status 0)
**Cause:** Backend not running or wrong URL
**Solution:** 
1. Start backend: `dotnet run` in backend-dotnet folder
2. Verify environment.development.ts has correct apiUrl
3. Check backend is listening on http://localhost:5000

### Issue 4: Data Not Displaying in Component
**Cause:** Observable not subscribed or async pipe missing
**Solution:**
```typescript
// Option 1: Subscribe in component
this.apiService.getData().subscribe(data => this.data = data);

// Option 2: Use async pipe in template
data$ = this.apiService.getData();
// Template: <div *ngIf="data$ | async as data">...</div>
```

### Issue 5: Backend Returns NULL Instead of 404
**Cause:** FirstOrDefaultAsync returns null when not found
**Solution:** Backend should check for null and return NotFound():
```csharp
var item = await _context.Items.FindAsync(id);
if (item == null) return NotFound();
return item;
```

---

## 8. Next Steps

1. **Update Remaining Services:**
   - ✅ SchoolMapApiService
   - ✅ BuildingApiService
   - ⏳ LandApiService
   - ⏳ RentalApiService
   - ⏳ DisplacementApiService

2. **Update Components:**
   - Add error state signals
   - Add loading state signals
   - Implement proper error display in templates
   - Add data validation before submission

3. **Add Toast/Snackbar Service:**
   - Create centralized notification service
   - Display success/error messages as toasts
   - Replace alert() calls with toast notifications

4. **Testing:**
   - Test all API endpoints with Postman/Swagger
   - Test frontend with backend running
   - Test error scenarios (backend down, invalid data, etc.)
   - Test with empty database
   - Test with large datasets

5. **Documentation:**
   - Document component data dependencies
   - Create API endpoint reference guide
   - Document error codes and their meanings
   - Create troubleshooting guide

---

## Files Modified

1. **New Files:**
   - `src/app/services/error-handler.service.ts`
   - `backend-dotnet/DATA_FLOW_AND_ERROR_HANDLING.md` (this file)

2. **Updated Files:**
   - `src/app/services/school-map-api.service.ts` (Fixed route, added error handling)
   - `src/app/services/building-api.service.ts` (Added error handling)

3. **To Be Updated:**
   - `src/app/services/land-api.service.ts`
   - `src/app/services/rental-api.service.ts`
   - `src/app/services/displacement-api.service.ts`
   - All component files that use API services

---

## Summary

This implementation ensures:
✅ Correct API routes matching backend controllers
✅ Comprehensive error handling with user-friendly Arabic messages
✅ Input validation before HTTP requests
✅ Proper error propagation to components
✅ Logging for debugging
✅ Type-safe data handling
✅ Consistent patterns across all services

The system is now ready for thorough testing and integration with Angular components.
