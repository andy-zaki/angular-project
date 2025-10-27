# Database Migration Guide

## Overview

This guide provides complete instructions for migrating your Angular project from mock services to a SQL Server database with a Node.js/Express backend API.

## Prerequisites

- **SQL Server**: Microsoft SQL Server (2016 or later) or SQL Server Express
- **Node.js**: Version 18.x or later
- **npm**: Version 9.x or later
- **Angular CLI**: Version 20.x (already installed)

## Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  Angular App    │ ──HTTP─→│  Express API    │ ──SQL─→ │  SQL Server DB  │
│  (Port 4200)    │ ←─JSON──│  (Port 3000)    │ ←─DATA──│                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

## Step 1: Install SQL Server

### Option A: SQL Server Express (Free)

1. Download SQL Server Express from Microsoft
2. Install with default settings
3. Enable TCP/IP protocol in SQL Server Configuration Manager
4. Set SQL Server Authentication mode to "Mixed Mode"
5. Create a login with username and password

### Option B: Use Existing SQL Server

If you already have SQL Server, note your connection details:
- Server name/address
- Port (default: 1433)
- Authentication method
- Username and password

## Step 2: Setup Backend

### Install Backend Dependencies

```powershell
cd backend
npm install
```

This installs:
- `express` - Web framework
- `mssql` - SQL Server client
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `helmet` - Security middleware
- `morgan` - HTTP request logger

### Configure Database Connection

1. Edit `backend/.env` file with your SQL Server credentials:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# SQL Server Configuration
DB_SERVER=localhost
DB_PORT=1433
DB_DATABASE=AngularProjectDB
DB_USER=your_username
DB_PASSWORD=your_password
DB_ENCRYPT=true
DB_TRUST_SERVER_CERTIFICATE=true
```

**Important Notes:**
- For local SQL Server Express, use `localhost` or `localhost\\SQLEXPRESS`
- For remote servers, use the IP address or domain name
- Set `DB_TRUST_SERVER_CERTIFICATE=false` in production with valid SSL certificates

## Step 3: Initialize Database

### Create Database

Run the database initialization script:

```powershell
cd backend
npm run init-db
```

This script creates:
- **Lands Table** - Land parcel information
- **LandCoordinates Table** - Geographic coordinates for lands
- **BuildingLocations Table** - Buildings on land parcels
- **Buildings Table** - Educational building information
- **BuildingBasicData Table** - Detailed building data
- **BuildingAnnexes Table** - Building annexes and additions
- **NetworkCosts Table** - Utility and infrastructure costs
- **RentalBuildings Table** - Rental building information
- **RentalBuildingLocations Table** - Geographic locations
- **RentalStatusFlags Table** - Status indicators
- **RentalDecisions Table** - Rental approval decisions
- **StudyPeriods Table** - Educational period data
- **SchoolRoads Table** - Roads surrounding schools
- **SchoolAnnexes Table** - School annexes
- **SchoolSpaces Table** - School spaces and facilities
- **EducationalBuildings Table** - Educational facility details
- **DisplacementRecords Table** - Displacement processes
- **DisplacementCompensation Table** - Compensation payments
- **CouncilApprovals Table** - Council approval records

### Verify Database Creation

Connect to SQL Server using SQL Server Management Studio (SSMS) or Azure Data Studio and verify:

```sql
USE AngularProjectDB;
GO

-- List all tables
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
```

You should see 18 tables.

## Step 4: Start Backend Server

### Development Mode

```powershell
cd backend
npm run dev
```

This starts the server with `nodemon` for auto-reloading on file changes.

### Production Mode

```powershell
cd backend
npm start
```

### Verify Backend is Running

Open a browser and navigate to:
```
http://localhost:3000/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2025-10-28T..."
}
```

## Step 5: Update Angular Application

### Update Components to Use Real API Services

Replace mock service imports with real API services in your components.

**Before (using mock service):**
```typescript
import { MockLandDatabaseService } from '../services/mock-land-database.service';

export class LandInquiryComponent {
  private landService = inject(MockLandDatabaseService);
}
```

**After (using real API):**
```typescript
import { LandApiService } from '../services/land-api.service';

export class LandInquiryComponent {
  private landService = inject(LandApiService);
}
```

### Services Available

| Mock Service | Real API Service | Description |
|-------------|------------------|-------------|
| `MockLandDatabaseService` | `LandApiService` | Land parcel operations |
| `MockBuildingDatabaseService` | `BuildingApiService` | Building operations |
| `MockRentalDatabaseService` | `RentalApiService` | Rental building operations |
| `MockSchoolMapDatabaseService` | `SchoolMapApiService` | School map operations |
| `MockDisplacementDatabaseService` | `DisplacementApiService` | Displacement operations |

### Update Imports in All Components

Use search and replace to update all files:

1. Find: `mock-land-database.service` → Replace: `land-api.service`
2. Find: `MockLandDatabaseService` → Replace: `LandApiService`
3. Find: `mock-building-database.service` → Replace: `building-api.service`
4. Find: `MockBuildingDatabaseService` → Replace: `BuildingApiService`
5. Find: `mock-rental-database.service` → Replace: `rental-api.service`
6. Find: `MockRentalDatabaseService` → Replace: `RentalApiService`
7. Find: `mock-school-map-database.service` → Replace: `school-map-api.service`
8. Find: `MockSchoolMapDatabaseService` → Replace: `SchoolMapApiService`
9. Find: `mock-displacement-database.service` → Replace: `displacement-api.service`
10. Find: `MockDisplacementDatabaseService` → Replace: `DisplacementApiService`

## Step 6: Run the Application

### Start Backend (Terminal 1)

```powershell
cd backend
npm run dev
```

### Start Angular (Terminal 2)

```powershell
npm start
```

### Access the Application

Navigate to: `http://localhost:4200`

## API Endpoints Reference

### Land Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/lands` | Get all lands |
| GET | `/api/lands/by-reference/:referenceNumber` | Get land by reference number |
| GET | `/api/lands/:id` | Get land by ID |
| POST | `/api/lands/search` | Search lands by criteria |
| POST | `/api/lands` | Create new land |
| PUT | `/api/lands/:id` | Update land |
| DELETE | `/api/lands/:id` | Delete land |
| GET | `/api/lands/:landId/buildings` | Get building locations |
| GET | `/api/lands/:landId/coordinates` | Get land coordinates |
| POST | `/api/lands/:landId/coordinates` | Add coordinates |

### Building Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/buildings` | Get all buildings |
| GET | `/api/buildings/by-number/:buildingNumber` | Get building by number |
| GET | `/api/buildings/:id` | Get building by ID |
| POST | `/api/buildings/search` | Search buildings |
| POST | `/api/buildings` | Create building |
| PUT | `/api/buildings/:id` | Update building |
| DELETE | `/api/buildings/:id` | Delete building |
| GET | `/api/buildings/:buildingNumber/basic-data` | Get basic data |
| GET | `/api/buildings/:buildingId/annexes` | Get annexes |
| GET | `/api/buildings/:buildingId/network-costs` | Get network costs |
| POST | `/api/buildings/:buildingNumber/basic-data` | Add basic data |
| POST | `/api/buildings/:buildingId/annexes` | Add annex |
| POST | `/api/buildings/:buildingId/network-costs` | Add network costs |

### Rental Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rentals` | Get all rental buildings |
| GET | `/api/rentals/by-id-number/:identificationNumber` | Get by ID number |
| GET | `/api/rentals/:id` | Get by ID |
| POST | `/api/rentals/search` | Search rentals |
| POST | `/api/rentals` | Create rental |
| PUT | `/api/rentals/:id` | Update rental |
| DELETE | `/api/rentals/:id` | Delete rental |
| GET | `/api/rentals/:buildingId/location` | Get location |
| GET | `/api/rentals/:buildingId/decisions` | Get decisions |
| GET | `/api/rentals/status-flags/all` | Get all status flags |
| POST | `/api/rentals/:buildingId/location` | Add location |

### School Map Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/school-maps/study-periods/:buildingCode` | Get study periods |
| GET | `/api/school-maps/roads/:buildingId` | Get school roads |
| GET | `/api/school-maps/annexes/:buildingId` | Get annexes |
| GET | `/api/school-maps/spaces/:buildingId` | Get spaces |
| GET | `/api/school-maps/educational-buildings/:buildingCode` | Get educational building |
| GET | `/api/school-maps/educational-buildings` | Get all educational buildings |
| POST | `/api/school-maps/study-periods` | Add study period |
| POST | `/api/school-maps/roads` | Add road |
| POST | `/api/school-maps/annexes` | Add annex |
| POST | `/api/school-maps/spaces` | Add space |
| POST | `/api/school-maps/educational-buildings` | Create educational building |
| PUT | `/api/school-maps/educational-buildings/:id` | Update educational building |

### Displacement Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/displacements` | Get all displacements |
| GET | `/api/displacements/by-reference/:referenceNumber` | Get by reference |
| GET | `/api/displacements/:id` | Get by ID |
| POST | `/api/displacements/search` | Search displacements |
| POST | `/api/displacements` | Create displacement |
| PUT | `/api/displacements/:id` | Update displacement |
| DELETE | `/api/displacements/:id` | Delete displacement |
| GET | `/api/displacements/:displacementId/compensation` | Get compensation |
| GET | `/api/displacements/:displacementId/council-approvals` | Get approvals |
| POST | `/api/displacements/:displacementId/compensation` | Add compensation |
| POST | `/api/displacements/:displacementId/council-approvals` | Add approval |

## Troubleshooting

### Backend Connection Issues

**Problem:** Cannot connect to SQL Server

**Solutions:**
1. Verify SQL Server is running
2. Check TCP/IP is enabled in SQL Server Configuration Manager
3. Verify firewall allows port 1433
4. Test connection with SSMS or Azure Data Studio
5. Check credentials in `.env` file

**Problem:** "Login failed for user"

**Solutions:**
1. Verify SQL Server Authentication is enabled (Mixed Mode)
2. Check username and password in `.env`
3. Grant appropriate permissions to the user

### CORS Issues

**Problem:** "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution:** The backend is already configured with CORS. Verify:
1. Backend is running on port 3000
2. Angular app is on port 4200
3. Both servers are running

### Database Errors

**Problem:** "Invalid object name 'TableName'"

**Solution:** Run the database initialization script:
```powershell
cd backend
npm run init-db
```

### API 404 Errors

**Problem:** "GET http://localhost:3000/api/... 404 (Not Found)"

**Solutions:**
1. Verify backend server is running
2. Check API endpoint URL in browser
3. Review backend console for errors
4. Verify route exists in route files

## Data Migration

### Export Mock Data (Optional)

If you have valuable mock data to preserve:

1. Create a migration script to export mock data to JSON
2. Create import endpoints in the backend
3. POST the data to your database

### Import Sample Data

To populate the database with sample data:

```typescript
// Create a data seeding script in backend/scripts/seed-data.js
const { getPool, closePool } = require('../config/database');

async function seedData() {
  const pool = await getPool();
  
  // Insert sample lands
  await pool.request()
    .input('referenceNumber', 'LAND-2025-001')
    .input('usageStatus', 'Available')
    // ... other fields
    .query('INSERT INTO Lands (...) VALUES (...)');
  
  // Continue with other tables...
}

seedData().then(() => process.exit(0));
```

## Production Deployment

### Backend Deployment

1. **Update Environment Variables:**
   - Set `NODE_ENV=production`
   - Update `DB_SERVER` to production server
   - Use strong passwords
   - Set `DB_ENCRYPT=true`
   - Set `DB_TRUST_SERVER_CERTIFICATE=false` (with valid SSL)

2. **Deploy to Server:**
   - Azure App Service
   - AWS Elastic Beanstalk
   - Heroku
   - VPS with PM2

3. **Configure Database:**
   - Use Azure SQL Database or AWS RDS
   - Configure firewall rules
   - Set up backups
   - Enable encryption

### Angular Deployment

1. **Update `src/environments/environment.ts`:**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com'
};
```

2. **Build for Production:**
```powershell
ng build --configuration production
```

3. **Deploy:**
   - Azure Static Web Apps
   - AWS S3 + CloudFront
   - Netlify
   - Vercel

## Security Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use strong passwords** for database
3. **Enable HTTPS** in production
4. **Implement authentication** and authorization
5. **Validate and sanitize** all inputs
6. **Use parameterized queries** (already implemented)
7. **Keep dependencies updated** - Run `npm audit`
8. **Monitor logs** for suspicious activity
9. **Implement rate limiting** on API endpoints
10. **Use environment-specific configs**

## Performance Optimization

1. **Database Indexing:**
```sql
-- Add indexes to frequently queried columns
CREATE INDEX IX_Lands_ReferenceNumber ON Lands(ReferenceNumber);
CREATE INDEX IX_Buildings_BuildingNumber ON Buildings(BuildingNumber);
CREATE INDEX IX_RentalBuildings_IdentificationNumber ON RentalBuildings(IdentificationNumber);
```

2. **Connection Pooling:** Already configured in `database.js`

3. **Query Optimization:** Use `EXPLAIN` to analyze slow queries

4. **Caching:** Implement Redis for frequently accessed data

## Monitoring & Maintenance

### Log Files

Backend logs are output to console. Configure log files:

```javascript
// In server.js, add file logging
const fs = require('fs');
const path = require('path');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));
```

### Database Backups

Set up automated backups:

```sql
-- SQL Server backup script
BACKUP DATABASE AngularProjectDB
TO DISK = 'C:\\Backups\\AngularProjectDB.bak'
WITH FORMAT, INIT, NAME = 'Full Backup of AngularProjectDB';
```

### Health Checks

Monitor endpoint: `http://localhost:3000/api/health`

Set up automated health checks with tools like:
- Pingdom
- UptimeRobot
- Azure Application Insights

## Support & Resources

### Documentation
- [Express.js Documentation](https://expressjs.com/)
- [MSSQL Node.js Driver](https://www.npmjs.com/package/mssql)
- [Angular HttpClient](https://angular.io/guide/http)
- [SQL Server Documentation](https://docs.microsoft.com/en-us/sql/)

### SQL Server Tools
- [SQL Server Management Studio (SSMS)](https://aka.ms/ssmsfullsetup)
- [Azure Data Studio](https://aka.ms/azuredatastudio)

### Useful Commands

```powershell
# Backend
cd backend
npm install              # Install dependencies
npm start                # Start server
npm run dev              # Start with auto-reload
npm run init-db          # Initialize database

# Angular
npm start                # Start dev server
npm run build            # Build for production
npm test                 # Run tests

# Database
sqlcmd -S localhost -U sa -P password -Q "SELECT @@VERSION"  # Test connection
```

## Next Steps

1. ✅ Backend infrastructure created
2. ✅ Database schema created
3. ✅ API endpoints implemented
4. ✅ Angular services created
5. ⚠️ **TODO:** Update all components to use new API services
6. ⚠️ **TODO:** Remove mock services (optional, keep for reference)
7. ⚠️ **TODO:** Test all functionality
8. ⚠️ **TODO:** Deploy to production

## Rollback Plan

If you need to revert to mock services:

1. Keep mock service files (don't delete)
2. Change service imports back to mock services
3. Comment out `provideHttpClient` in `app.config.ts`
4. Restart Angular dev server

The mock services will continue to work independently of the database.

## Conclusion

You now have a complete SQL Server database integration with:
- ✅ 18 database tables with proper relationships
- ✅ RESTful API with Express.js
- ✅ Angular HTTP services ready to use
- ✅ Environment configuration
- ✅ Production-ready architecture

Start by updating one component at a time, test thoroughly, and gradually migrate all features to use the real database.

For questions or issues, refer to the troubleshooting section or check the backend console logs for detailed error messages.
