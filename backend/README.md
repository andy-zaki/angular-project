# Angular Project Backend API

RESTful API built with Node.js, Express, and SQL Server for the Angular educational building management system.

## Quick Start

### Prerequisites
- Node.js 18.x or later
- SQL Server 2016+ or SQL Server Express
- npm 9.x or later

### Installation

1. **Install dependencies:**
```powershell
npm install
```

2. **Configure environment variables:**

Copy `.env.example` to `.env` and update with your SQL Server credentials:

```env
DB_SERVER=localhost
DB_PORT=1433
DB_DATABASE=AngularProjectDB
DB_USER=your_username
DB_PASSWORD=your_password
```

3. **Initialize database:**
```powershell
npm run init-db
```

4. **Start the server:**

Development mode (with auto-reload):
```powershell
npm run dev
```

Production mode:
```powershell
npm start
```

Server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- **GET** `/api/health` - Server health status

### Lands
- **GET** `/api/lands` - Get all lands
- **GET** `/api/lands/by-reference/:referenceNumber` - Get land by reference number
- **GET** `/api/lands/:id` - Get land by ID
- **POST** `/api/lands/search` - Search lands by criteria
- **POST** `/api/lands` - Create new land
- **PUT** `/api/lands/:id` - Update land
- **DELETE** `/api/lands/:id` - Delete land
- **GET** `/api/lands/:landId/buildings` - Get building locations for land
- **GET** `/api/lands/:landId/coordinates` - Get land coordinates
- **POST** `/api/lands/:landId/coordinates` - Add coordinates to land

### Buildings
- **GET** `/api/buildings` - Get all buildings
- **GET** `/api/buildings/by-number/:buildingNumber` - Get building by number
- **GET** `/api/buildings/:id` - Get building by ID
- **POST** `/api/buildings/search` - Search buildings
- **POST** `/api/buildings` - Create building
- **PUT** `/api/buildings/:id` - Update building
- **DELETE** `/api/buildings/:id` - Delete building
- **GET** `/api/buildings/:buildingNumber/basic-data` - Get building basic data
- **GET** `/api/buildings/:buildingId/annexes` - Get building annexes
- **GET** `/api/buildings/:buildingId/network-costs` - Get network costs
- **POST** `/api/buildings/:buildingNumber/basic-data` - Add building basic data
- **POST** `/api/buildings/:buildingId/annexes` - Add building annex
- **POST** `/api/buildings/:buildingId/network-costs` - Add network costs

### Rentals
- **GET** `/api/rentals` - Get all rental buildings
- **GET** `/api/rentals/by-id-number/:identificationNumber` - Get by ID number
- **GET** `/api/rentals/:id` - Get by ID
- **POST** `/api/rentals/search` - Search rental buildings
- **POST** `/api/rentals` - Create rental building
- **PUT** `/api/rentals/:id` - Update rental building
- **DELETE** `/api/rentals/:id` - Delete rental building
- **GET** `/api/rentals/:buildingId/location` - Get rental location
- **GET** `/api/rentals/:buildingId/decisions` - Get rental decisions
- **GET** `/api/rentals/status-flags/all` - Get all status flags
- **POST** `/api/rentals/:buildingId/location` - Add rental location

### School Maps
- **GET** `/api/school-maps/study-periods/:buildingCode` - Get study periods
- **GET** `/api/school-maps/roads/:buildingId` - Get school roads
- **GET** `/api/school-maps/annexes/:buildingId` - Get school annexes
- **GET** `/api/school-maps/spaces/:buildingId` - Get school spaces
- **GET** `/api/school-maps/educational-buildings/:buildingCode` - Get educational building
- **GET** `/api/school-maps/educational-buildings` - Get all educational buildings
- **POST** `/api/school-maps/study-periods` - Add study period
- **POST** `/api/school-maps/roads` - Add school road
- **POST** `/api/school-maps/annexes` - Add school annex
- **POST** `/api/school-maps/spaces` - Add school space
- **POST** `/api/school-maps/educational-buildings` - Create educational building
- **PUT** `/api/school-maps/educational-buildings/:id` - Update educational building

### Displacements
- **GET** `/api/displacements` - Get all displacement records
- **GET** `/api/displacements/by-reference/:referenceNumber` - Get by reference number
- **GET** `/api/displacements/:id` - Get by ID
- **POST** `/api/displacements/search` - Search displacements
- **POST** `/api/displacements` - Create displacement record
- **PUT** `/api/displacements/:id` - Update displacement record
- **DELETE** `/api/displacements/:id` - Delete displacement record
- **GET** `/api/displacements/:displacementId/compensation` - Get compensation records
- **GET** `/api/displacements/:displacementId/council-approvals` - Get council approvals
- **POST** `/api/displacements/:displacementId/compensation` - Add compensation record
- **POST** `/api/displacements/:displacementId/council-approvals` - Add council approval

## Database Schema

The system uses 18 tables:

**Core Tables:**
- `Lands` - Land parcel information
- `Buildings` - Educational building data
- `RentalBuildings` - Rental building information
- `EducationalBuildings` - Educational facility details
- `DisplacementRecords` - Displacement process data

**Related Tables:**
- `LandCoordinates` - Geographic coordinates
- `BuildingLocations` - Buildings on land parcels
- `BuildingBasicData` - Detailed building information
- `BuildingAnnexes` - Building annexes
- `NetworkCosts` - Utility costs
- `RentalBuildingLocations` - Rental locations
- `RentalStatusFlags` - Status indicators
- `RentalDecisions` - Approval decisions
- `StudyPeriods` - Educational period data
- `SchoolRoads` - Roads surrounding schools
- `SchoolAnnexes` - School annexes
- `SchoolSpaces` - School facilities
- `DisplacementCompensation` - Compensation payments
- `CouncilApprovals` - Council approvals

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection configuration
├── routes/
│   ├── land.routes.js       # Land endpoints
│   ├── building.routes.js   # Building endpoints
│   ├── rental.routes.js     # Rental endpoints
│   ├── school-map.routes.js # School map endpoints
│   └── displacement.routes.js # Displacement endpoints
├── scripts/
│   └── init-database.js     # Database initialization script
├── .env                     # Environment variables (not in git)
├── .env.example            # Example environment file
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
└── server.js               # Express server entry point
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment (development/production) | development |
| `DB_SERVER` | SQL Server address | localhost |
| `DB_PORT` | SQL Server port | 1433 |
| `DB_DATABASE` | Database name | AngularProjectDB |
| `DB_USER` | Database username | - |
| `DB_PASSWORD` | Database password | - |
| `DB_ENCRYPT` | Enable encryption | true |
| `DB_TRUST_SERVER_CERTIFICATE` | Trust server certificate | true |
| `DB_POOL_MIN` | Min connection pool size | 2 |
| `DB_POOL_MAX` | Max connection pool size | 10 |
| `DB_POOL_IDLE_TIMEOUT` | Pool idle timeout (ms) | 30000 |

## Security

- ✅ Helmet.js for security headers
- ✅ CORS enabled for Angular app
- ✅ Parameterized SQL queries (SQL injection prevention)
- ✅ Environment-based configuration
- ✅ Connection pooling
- ⚠️ **TODO:** Add authentication/authorization
- ⚠️ **TODO:** Add rate limiting
- ⚠️ **TODO:** Add input validation middleware

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": {
    "message": "Error description",
    "status": 500
  }
}
```

## Testing

Test the API using:
- **Postman** - Import endpoints manually
- **cURL** - Command-line testing
- **Browser** - GET requests only

Example cURL request:
```bash
curl http://localhost:3000/api/health
```

## Logging

The server uses Morgan for HTTP request logging. Logs include:
- HTTP method
- URL
- Status code
- Response time

## Development

### Adding New Endpoints

1. Create route file in `routes/` directory
2. Define route handlers
3. Import and use in `server.js`

Example:
```javascript
// routes/example.routes.js
const express = require('express');
const router = express.Router();
const { sql, getPool } = require('../config/database');

router.get('/', async (req, res) => {
  // Implementation
});

module.exports = router;
```

```javascript
// server.js
const exampleRoutes = require('./routes/example.routes');
app.use('/api/examples', exampleRoutes);
```

### Database Queries

Use parameterized queries to prevent SQL injection:

```javascript
const result = await pool.request()
  .input('id', sql.UniqueIdentifier, req.params.id)
  .input('name', sql.NVarChar, req.body.name)
  .query('SELECT * FROM Table WHERE Id = @id AND Name = @name');
```

## Deployment

### Production Checklist

- [ ] Update `.env` with production credentials
- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS
- [ ] Enable database backups
- [ ] Set up monitoring
- [ ] Configure firewall rules
- [ ] Use process manager (PM2)
- [ ] Set up logging
- [ ] Implement authentication
- [ ] Add rate limiting

### PM2 Deployment

```powershell
# Install PM2
npm install -g pm2

# Start server
pm2 start server.js --name "angular-backend"

# View logs
pm2 logs

# Restart
pm2 restart angular-backend

# Stop
pm2 stop angular-backend
```

## Troubleshooting

### Connection Errors

**Problem:** `ConnectionError: Failed to connect to localhost:1433`

**Solutions:**
1. Verify SQL Server is running
2. Check TCP/IP is enabled
3. Verify port 1433 is open
4. Test with SSMS/Azure Data Studio

### Authentication Errors

**Problem:** `Login failed for user 'username'`

**Solutions:**
1. Verify Mixed Mode authentication is enabled
2. Check username and password
3. Grant database permissions to user

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F

# Or change PORT in .env
```

## License

This project is part of the Angular educational building management system.

## Support

For issues or questions:
1. Check the [DATABASE_MIGRATION_GUIDE.md](../DATABASE_MIGRATION_GUIDE.md)
2. Review server console logs
3. Check database connectivity
4. Verify environment variables
