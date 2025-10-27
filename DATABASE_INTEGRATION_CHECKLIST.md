# Database Integration Checklist

Use this checklist to track your progress in migrating from mock services to SQL database.

## 📋 Phase 1: Setup & Installation

### SQL Server Setup
- [ ] Download SQL Server or SQL Server Express
- [ ] Install SQL Server
- [ ] Enable TCP/IP protocol in SQL Server Configuration Manager
- [ ] Set authentication mode to "Mixed Mode"
- [ ] Create database login with username/password
- [ ] Test connection with SSMS or Azure Data Studio

### Backend Setup
- [ ] Navigate to `backend/` directory
- [ ] Run `npm install` to install dependencies
- [ ] Copy `.env.example` to `.env`
- [ ] Edit `.env` with your SQL Server credentials
  - [ ] Set `DB_SERVER` (e.g., localhost or localhost\SQLEXPRESS)
  - [ ] Set `DB_USER`
  - [ ] Set `DB_PASSWORD`
  - [ ] Set `DB_DATABASE=AngularProjectDB`
- [ ] Run `npm run init-db` to create database tables
- [ ] Verify 18 tables were created successfully

### Backend Testing
- [ ] Run `npm run dev` to start backend server
- [ ] Verify "Connected to SQL Server successfully" message
- [ ] Verify "Server running on port 3000" message
- [ ] Open browser to http://localhost:3000/api/health
- [ ] Verify health check returns "OK" status

## 📋 Phase 2: Angular Configuration

### Verify Files Created
- [ ] Check `src/environments/environment.ts` exists
- [ ] Check `src/environments/environment.development.ts` exists
- [ ] Check `src/app/app.config.ts` includes `provideHttpClient`
- [ ] Verify API services exist:
  - [ ] `src/app/services/land-api.service.ts`
  - [ ] `src/app/services/building-api.service.ts`
  - [ ] `src/app/services/rental-api.service.ts`
  - [ ] `src/app/services/school-map-api.service.ts`
  - [ ] `src/app/services/displacement-api.service.ts`

## 📋 Phase 3: Component Migration

### Land Components
- [ ] `land-inquiry` component
- [ ] `land-inquiry-id` component
- [ ] `land-coordinates` component

### Building Components
- [ ] `building-inquiry` component
- [ ] `building-basic-data` component
- [ ] `building-data-completion` component
- [ ] `building-annexes-data` component
- [ ] `building-network-costs` component
- [ ] `building-property-handover` component
- [ ] `building-temporary-fulfillment` component

### Rental Components
- [ ] `rental-inquiry-building` component
- [ ] `rental-buildings-list` component
- [ ] `rental-building-details` component
- [ ] `rental-building-location` component
- [ ] `rental-buildings-status` component
- [ ] `rental-status-menu` component
- [ ] `rental-status-edit` component
- [ ] `rental-status-report` component
- [ ] `rental-decision-buildings` component
- [ ] `rental-building-modify-status` component

### School Map Components
- [ ] `school-map-inquiry` component
- [ ] `school-map-study-period` component
- [ ] `school-map-roads` component
- [ ] `school-map-annexes` component
- [ ] `school-map-spaces` component
- [ ] `educational-building` component

### Displacement Components
- [ ] `displacement-final-compensation` component
- [ ] `displacement-council-approval` component
- [ ] `building-displacement-menu` component
- [ ] `building-displacement-pre` component
- [ ] `building-displacement-post` component

## 📋 Phase 4: Testing

### Backend Testing
- [ ] Test health endpoint: `GET http://localhost:3000/api/health`
- [ ] Test lands endpoint: `GET http://localhost:3000/api/lands`
- [ ] Test buildings endpoint: `GET http://localhost:3000/api/buildings`
- [ ] Test rentals endpoint: `GET http://localhost:3000/api/rentals`
- [ ] Test POST request (create data)
- [ ] Test PUT request (update data)
- [ ] Test DELETE request (delete data)
- [ ] Check backend console logs for errors
- [ ] Verify SQL Server has data

### Frontend Testing
- [ ] Start Angular dev server: `npm start`
- [ ] Navigate to each migrated component
- [ ] Test data loading (Read operations)
- [ ] Test data creation (Create operations)
- [ ] Test data updates (Update operations)
- [ ] Test data deletion (Delete operations)
- [ ] Check browser console for errors
- [ ] Check Network tab for API calls
- [ ] Verify no CORS errors

### Integration Testing
- [ ] Verify data persists after server restart
- [ ] Test with multiple browser tabs
- [ ] Test concurrent operations
- [ ] Test error handling (disconnect database, invalid data, etc.)
- [ ] Test loading states
- [ ] Test error messages display

## 📋 Phase 5: Data Migration (Optional)

### If You Have Existing Mock Data
- [ ] Export mock data from components to JSON
- [ ] Create data seeding script in `backend/scripts/`
- [ ] Import data via API endpoints
- [ ] Verify data integrity in database
- [ ] Test application with real data

## 📋 Phase 6: Cleanup

### Remove Mock Services (Optional - Keep for backup)
- [ ] Consider keeping mock services for development/testing
- [ ] If removing, delete mock service files
- [ ] Update any remaining references
- [ ] Remove unused imports

### Code Review
- [ ] Review all changed files
- [ ] Check for console.log statements
- [ ] Check for TODO comments
- [ ] Verify error handling
- [ ] Check TypeScript types
- [ ] Run `ng build` to check for build errors

## 📋 Phase 7: Performance Optimization

### Database
- [ ] Add indexes to frequently queried columns
- [ ] Analyze slow queries with SQL Server Profiler
- [ ] Optimize complex queries
- [ ] Set up database maintenance plans

### Backend
- [ ] Implement caching for frequently accessed data
- [ ] Add request rate limiting
- [ ] Optimize response sizes
- [ ] Monitor memory usage

### Frontend
- [ ] Implement loading spinners
- [ ] Add pagination for large lists
- [ ] Implement virtual scrolling if needed
- [ ] Optimize bundle size

## 📋 Phase 8: Security Hardening

### Backend Security
- [ ] Implement authentication (JWT, OAuth, etc.)
- [ ] Add authorization checks
- [ ] Validate all input data
- [ ] Sanitize user inputs
- [ ] Add rate limiting
- [ ] Implement request throttling
- [ ] Set up security headers (Helmet is already configured)
- [ ] Use HTTPS in production
- [ ] Regular security audits: `npm audit`

### Database Security
- [ ] Use principle of least privilege for DB user
- [ ] Enable SQL Server encryption
- [ ] Set up database firewall rules
- [ ] Regular backups
- [ ] Implement backup encryption
- [ ] Monitor for suspicious activity

### Frontend Security
- [ ] Implement authentication guards
- [ ] Store tokens securely
- [ ] Validate all API responses
- [ ] Sanitize displayed data
- [ ] Implement CSRF protection

## 📋 Phase 9: Production Deployment

### Backend Deployment
- [ ] Choose hosting platform (Azure, AWS, Heroku, VPS)
- [ ] Update `.env` with production values
- [ ] Set `NODE_ENV=production`
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure firewall rules
- [ ] Set up monitoring (Application Insights, etc.)
- [ ] Set up logging
- [ ] Configure backups
- [ ] Set up CI/CD pipeline
- [ ] Test production deployment

### Frontend Deployment
- [ ] Update `src/environments/environment.ts` with production API URL
- [ ] Build production: `ng build --configuration production`
- [ ] Test production build locally
- [ ] Choose hosting (Azure Static Web Apps, Netlify, Vercel)
- [ ] Deploy to hosting service
- [ ] Configure custom domain (if needed)
- [ ] Set up CDN
- [ ] Test deployed application

### Database Deployment
- [ ] Set up production SQL Server (Azure SQL, AWS RDS, etc.)
- [ ] Run database initialization script
- [ ] Migrate data from development
- [ ] Configure backups
- [ ] Set up monitoring
- [ ] Configure alerts
- [ ] Test disaster recovery

## 📋 Phase 10: Monitoring & Maintenance

### Set Up Monitoring
- [ ] Backend API monitoring
- [ ] Database performance monitoring
- [ ] Frontend error tracking
- [ ] User analytics
- [ ] Set up alerts for errors
- [ ] Set up uptime monitoring

### Documentation
- [ ] Document API endpoints
- [ ] Document deployment process
- [ ] Document database schema
- [ ] Create troubleshooting guide
- [ ] Document environment setup

### Maintenance Schedule
- [ ] Weekly: Review logs for errors
- [ ] Weekly: Check database performance
- [ ] Monthly: Update dependencies
- [ ] Monthly: Security audit
- [ ] Quarterly: Review and optimize
- [ ] As needed: Apply security patches

## 📋 Quick Reference

### Key Files
- **Backend Config:** `backend/.env`
- **Backend Server:** `backend/server.js`
- **Database Init:** `backend/scripts/init-database.js`
- **Angular Config:** `src/app/app.config.ts`
- **Environment:** `src/environments/environment.ts`

### Key Commands
```powershell
# Backend
cd backend
npm install
npm run init-db
npm run dev

# Angular
npm start
ng build --configuration production

# Database
sqlcmd -S localhost -U username -P password
```

### Key URLs
- Backend Health: http://localhost:3000/api/health
- Backend API: http://localhost:3000/api
- Angular App: http://localhost:4200

## 📋 Documentation Reference

Refer to these guides for detailed information:

1. **QUICK_START_DATABASE.md** - Quick start guide
2. **DATABASE_MIGRATION_GUIDE.md** - Complete migration guide
3. **COMPONENT_MIGRATION_EXAMPLE.md** - Code examples
4. **backend/README.md** - Backend API documentation
5. **IMPLEMENTATION_SUMMARY_DATABASE.md** - Complete summary

## ✅ Completion Criteria

You're done when:
- ✅ All 18 database tables created
- ✅ Backend server runs without errors
- ✅ All components migrated to API services
- ✅ All features tested and working
- ✅ No errors in browser/backend console
- ✅ Data persists across restarts
- ✅ Application deployed to production (if ready)

## 📊 Progress Tracking

**Phase 1 (Setup):** __ / 17 items completed  
**Phase 2 (Configuration):** __ / 6 items completed  
**Phase 3 (Migration):** __ / 26 items completed  
**Phase 4 (Testing):** __ / 20 items completed  
**Phase 5 (Data Migration):** __ / 5 items completed  
**Phase 6 (Cleanup):** __ / 6 items completed  
**Phase 7 (Optimization):** __ / 10 items completed  
**Phase 8 (Security):** __ / 17 items completed  
**Phase 9 (Deployment):** __ / 18 items completed  
**Phase 10 (Monitoring):** __ / 10 items completed  

**Total Progress:** __ / 135 items completed

---

**Start Date:** _______________  
**Target Completion:** _______________  
**Actual Completion:** _______________

**Notes:**
_________________________________
_________________________________
_________________________________
