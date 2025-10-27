# SQL Database Integration - Quick Start Guide

## What Was Created

✅ **Backend API Server** (Node.js + Express + SQL Server)
- Location: `backend/` directory
- 18 database tables for all your data
- RESTful API with CRUD operations
- Complete authentication and security setup

✅ **Angular API Services**
- `LandApiService` - Replaces `MockLandDatabaseService`
- `BuildingApiService` - Replaces `MockBuildingDatabaseService`
- `RentalApiService` - Replaces `MockRentalDatabaseService`
- `SchoolMapApiService` - Replaces `MockSchoolMapDatabaseService`
- `DisplacementApiService` - Replaces `MockDisplacementDatabaseService`

✅ **Environment Configuration**
- Development and production environment files
- HttpClient configured in Angular

## Next Steps to Get Started

### 1. Install SQL Server (if you don't have it)

**Option A: SQL Server Express (Free)**
- Download from: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
- Choose "Express" edition
- During installation, enable "Mixed Mode" authentication
- Create a login with username/password

**Option B: Use Existing SQL Server**
- Just note your connection details

### 2. Install Backend Dependencies

```powershell
cd backend
npm install
```

### 3. Configure Database Connection

Edit `backend/.env` file with your SQL Server details:

```env
DB_SERVER=localhost
DB_USER=your_username
DB_PASSWORD=your_password
```

For SQL Server Express, use:
```env
DB_SERVER=localhost\SQLEXPRESS
```

### 4. Initialize Database

This creates all 18 tables automatically:

```powershell
cd backend
npm run init-db
```

You should see:
```
✓ Lands table created
✓ Buildings table created
✓ RentalBuildings table created
... (18 tables total)
✓ All tables created successfully!
```

### 5. Start Backend Server

```powershell
cd backend
npm run dev
```

You should see:
```
Connected to SQL Server successfully
Server running on port 3000
```

**Test it:** Open browser to http://localhost:3000/api/health

### 6. Update Your Angular Components

In each component, replace mock service with real API service:

**BEFORE:**
```typescript
import { MockLandDatabaseService } from '../services/mock-land-database.service';

export class MyComponent {
  private landService = inject(MockLandDatabaseService);
}
```

**AFTER:**
```typescript
import { LandApiService } from '../services/land-api.service';

export class MyComponent {
  private landService = inject(LandApiService);
}
```

### 7. Start Angular App

In a **new terminal**:

```powershell
npm start
```

## Component Update Checklist

Update these services in your components:

- [ ] `MockLandDatabaseService` → `LandApiService`
- [ ] `MockBuildingDatabaseService` → `BuildingApiService`
- [ ] `MockRentalDatabaseService` → `RentalApiService`
- [ ] `MockSchoolMapDatabaseService` → `SchoolMapApiService`
- [ ] `MockDisplacementDatabaseService` → `DisplacementApiService`

## Quick Search & Replace

Use VS Code's search & replace (Ctrl+Shift+H):

1. **Find:** `from '../services/mock-land-database.service'`  
   **Replace:** `from '../services/land-api.service'`

2. **Find:** `MockLandDatabaseService`  
   **Replace:** `LandApiService`

3. Repeat for other services (building, rental, school-map, displacement)

## API Service Methods

All methods are **identical** to mock services! Example:

```typescript
// Works exactly the same as before
this.landService.getLandByReferenceNumber('REF-001').subscribe(land => {
  console.log(land);
});
```

## Database Tables Created

1. **Lands** - Land parcel data
2. **LandCoordinates** - Geographic coordinates
3. **BuildingLocations** - Buildings on lands
4. **Buildings** - Educational buildings
5. **BuildingBasicData** - Building details
6. **BuildingAnnexes** - Building additions
7. **NetworkCosts** - Utility costs
8. **RentalBuildings** - Rental properties
9. **RentalBuildingLocations** - Rental locations
10. **RentalStatusFlags** - Status indicators
11. **RentalDecisions** - Approval records
12. **StudyPeriods** - Educational periods
13. **SchoolRoads** - Roads around schools
14. **SchoolAnnexes** - School annexes
15. **SchoolSpaces** - School facilities
16. **EducationalBuildings** - Educational facilities
17. **DisplacementRecords** - Displacement data
18. **DisplacementCompensation** - Compensation records
19. **CouncilApprovals** - Council decisions

## Ports Used

- **Backend API:** http://localhost:3000
- **Angular App:** http://localhost:4200

## Troubleshooting

### Can't connect to SQL Server?

```powershell
# Test SQL Server connection
sqlcmd -S localhost -U sa -P YourPassword -Q "SELECT @@VERSION"
```

If this fails:
1. Check SQL Server is running
2. Verify username/password
3. Enable TCP/IP in SQL Server Configuration Manager

### Backend won't start?

Check `backend/.env` file has correct credentials:
```env
DB_SERVER=localhost
DB_DATABASE=AngularProjectDB
DB_USER=your_username
DB_PASSWORD=your_password
```

### Port 3000 already in use?

```powershell
# Kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Testing the API

### Using Browser (GET requests only)

- http://localhost:3000/api/health
- http://localhost:3000/api/lands
- http://localhost:3000/api/buildings

### Using PowerShell

```powershell
# Test health endpoint
Invoke-RestMethod -Uri http://localhost:3000/api/health

# Get all lands
Invoke-RestMethod -Uri http://localhost:3000/api/lands

# Create new land
$body = @{
    referenceNumber = "REF-2025-001"
    usageStatus = "Available"
    headquarters = "Main Office"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/api/lands -Method POST -Body $body -ContentType "application/json"
```

## File Structure

```
angular-project/
├── backend/                    # ← New backend server
│   ├── config/
│   │   └── database.js        # Database connection
│   ├── routes/
│   │   ├── land.routes.js     # Land API endpoints
│   │   ├── building.routes.js # Building API endpoints
│   │   ├── rental.routes.js   # Rental API endpoints
│   │   ├── school-map.routes.js
│   │   └── displacement.routes.js
│   ├── scripts/
│   │   └── init-database.js   # Database setup script
│   ├── .env                   # Your configuration
│   ├── package.json
│   ├── server.js              # Main server file
│   └── README.md
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   ├── land-api.service.ts           # ← New
│   │   │   ├── building-api.service.ts       # ← New
│   │   │   ├── rental-api.service.ts         # ← New
│   │   │   ├── school-map-api.service.ts     # ← New
│   │   │   ├── displacement-api.service.ts   # ← New
│   │   │   └── mock-*.service.ts             # Keep for backup
│   │   └── app.config.ts      # ← Updated with HttpClient
│   └── environments/           # ← New
│       ├── environment.ts
│       └── environment.development.ts
└── DATABASE_MIGRATION_GUIDE.md # ← Full documentation
```

## Full Documentation

For complete details, see:
- **[DATABASE_MIGRATION_GUIDE.md](DATABASE_MIGRATION_GUIDE.md)** - Complete migration guide
- **[backend/README.md](backend/README.md)** - Backend API documentation

## Production Deployment

When ready to deploy:

1. Update `src/environments/environment.ts` with production API URL
2. Build Angular: `ng build --configuration production`
3. Deploy backend to Azure/AWS/VPS
4. Deploy Angular to Azure Static Web Apps/Netlify/Vercel

## Need Help?

Common issues and solutions are in:
- DATABASE_MIGRATION_GUIDE.md (Troubleshooting section)
- backend/README.md (Development section)

## Summary

You now have:
✅ Full SQL Server database with 18 tables
✅ RESTful API with all CRUD operations
✅ Angular services ready to use
✅ Complete documentation

**Next action:** Install SQL Server, run `npm install` in backend/, configure .env, and run `npm run init-db`!
