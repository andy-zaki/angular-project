# UI Testing with Database Data Guide

This guide helps you test the Angular UI using the populated database with dummy data.

## Prerequisites

- Backend server running on `http://localhost:5000`
- Frontend server running on `http://localhost:4200`
- Database populated with seed data (107 records)

## Quick Start

### 1. Start the Backend
```powershell
cd d:\repos\angular-project\backend-dotnet
dotnet run
```
Backend will run on: http://localhost:5000
Swagger UI: http://localhost:5000/swagger

### 2. Start the Frontend
```powershell
cd d:\repos\angular-project
npm start
```
Frontend will run on: http://localhost:4200

### 3. Login Credentials

Test users available in the database:

| Username | Password | Role | Arabic Name |
|----------|----------|------|-------------|
| admin | password123 | Admin | مدير النظام |
| manager | password123 | Manager | مدير الفرع |
| user1 | password123 | User | مستخدم عادي |

---

## Test Data Overview

### Educational Buildings (المباني التعليمية)
The system has **5 educational buildings** that serve as central hubs:

| Building Number | Arabic Name | City | Status |
|----------------|-------------|------|--------|
| EDU-001 | مدرسة الأمل الابتدائية | الرياض | نشط |
| EDU-002 | مدرسة النور المتوسطة | جدة | نشط |
| EDU-003 | مدرسة الفيصل الثانوية | الدمام | نشط |
| EDU-004 | مدرسة الملك عبدالله | مكة | نشط |
| EDU-005 | مدرسة الأندلس | المدينة | نشط |

### Lands (الأراضي)
**3 land parcels** available:

| Reference Number | Plot Number | Location | Area (m²) |
|-----------------|-------------|----------|-----------|
| LAND-2024-001 | 1234 | حي السلام - الرياض | 5000 |
| LAND-2024-002 | 5678 | حي النهضة - جدة | 3500 |
| LAND-2024-003 | 9012 | حي الفيحاء - الدمام | 4200 |

### Buildings (المباني)
**3 buildings** with complete data:

| Building Number | Ownership Type | Area (m²) | Status |
|----------------|----------------|-----------|--------|
| BLD-2024-001 | ملك | 2000 | مكتمل |
| BLD-2024-002 | إيجار | 1500 | قيد الإنشاء |
| BLD-2024-003 | ملك | 1800 | مكتمل |

### Rental Buildings (المباني المستأجرة)
**3 rental buildings** for testing:

| Building Number | Owner Name | Annual Rent | Contract Start | Status |
|----------------|------------|-------------|----------------|--------|
| RENT-2024-001 | أحمد محمد السعيد | 120000 SAR | 2024-01-01 | نشط |
| RENT-2024-002 | فاطمة علي الأحمد | 150000 SAR | 2024-02-01 | نشط |
| RENT-2024-003 | خالد عبدالله الغامدي | 100000 SAR | 2024-03-01 | منتهي |

### Displacements (الإزاحات)
**2 displacement requests** to test:

| Request Number | Project Name | Educational Building | Status |
|---------------|--------------|---------------------|--------|
| DISP-2024-001 | إزاحة مدرسة الأمل | مدرسة الأمل الابتدائية | قيد المراجعة |
| DISP-2024-002 | إزاحة مدرسة النور | مدرسة النور المتوسطة | معتمد من المجلس |

---

## UI Testing Scenarios

### 🏠 Scenario 1: Dashboard Overview
**Component:** `dashboard`
**Route:** `/dashboard`

**Test Steps:**
1. Navigate to dashboard after login
2. Verify statistics cards show:
   - 5 Educational Buildings
   - 3 Lands
   - 3 Buildings
   - 3 Rental Buildings
   - 2 Displacement Requests
3. Check recent activities list
4. Verify navigation cards work

**Expected Result:** All counts match database records, navigation works correctly

---

### 🏫 Scenario 2: Educational Buildings List
**Component:** `educational-building`
**API Endpoint:** `GET /api/schoolmaps/educational-buildings`

**Test Steps:**
1. Navigate to Educational Buildings list
2. Verify all 5 buildings appear (EDU-001 to EDU-005)
3. Check Arabic names display correctly
4. Filter by city (الرياض, جدة, الدمام)
5. Search by building number (e.g., "EDU-001")
6. Click on a building to view details

**Expected Result:** List shows 5 buildings with correct Arabic text and filtering works

---

### 📚 Scenario 3: Study Periods for Educational Building
**Component:** `school-map-study-period`
**API Endpoint:** `GET /api/schoolmaps/study-periods/{educationalBuildingId}`

**Test Steps:**
1. Go to Educational Building EDU-001 (مدرسة الأمل الابتدائية)
2. Navigate to Study Periods section
3. Verify 3 study periods show:
   - Morning Shift (الفترة الصباحية) - 600 students
   - Afternoon Shift (الفترة المسائية) - 450 students
   - Evening Shift (الفترة المسائية المتأخرة) - 300 students
4. Check total capacity sums correctly (1350 students)
5. Test adding a new study period
6. Test editing existing period

**Expected Result:** 3 study periods displayed with correct student counts

---

### 🛣️ Scenario 4: School Map Roads
**Component:** `school-map-roads`
**API Endpoint:** `GET /api/schoolmaps/roads/{educationalBuildingId}`

**Test Steps:**
1. Select Educational Building EDU-001
2. Navigate to Roads section
3. Verify 2 roads appear:
   - طريق الملك فهد (20m width, 500m length, أسفلت)
   - شارع العروبة (15m width, 300m length, أسفلت)
4. Check road specifications display correctly
5. Test adding a new road
6. Test updating road details

**Expected Result:** 2 roads with correct dimensions and surface types

---

### 🏗️ Scenario 5: Building Annexes
**Component:** `school-map-annexes`
**API Endpoint:** `GET /api/schoolmaps/annexes/{educationalBuildingId}`

**Test Steps:**
1. Select Educational Building EDU-001
2. View Building Annexes
3. Verify 2 annexes:
   - ملحق إداري - 200m² - مكاتب إدارية
   - ملحق رياضي - 300m² - صالة رياضية
4. Check area and purpose display
5. Test adding new annex
6. Test editing annex details

**Expected Result:** 2 annexes with correct areas and descriptions

---

### 📐 Scenario 6: School Map Spaces
**Component:** `school-map-spaces`
**API Endpoint:** `GET /api/schoolmaps/spaces/{educationalBuildingId}`

**Test Steps:**
1. Select Educational Building EDU-001
2. Navigate to Spaces section
3. Verify 3 spaces:
   - فصول دراسية - 1200m²
   - مختبرات علمية - 150m²
   - مكتبة - 100m²
4. Check space areas and counts
5. Verify total space calculation
6. Test CRUD operations on spaces

**Expected Result:** 3 spaces with correct areas, total = 1450m²

---

### 🌍 Scenario 7: Land Inquiry
**Component:** `land-inquiry`
**API Endpoint:** `GET /api/lands`

**Test Steps:**
1. Navigate to Land Inquiry
2. Verify 3 lands display
3. Search by reference number: "LAND-2024-001"
4. Filter by city: "الرياض"
5. Check land details show:
   - Plot number: 1234
   - Area: 5000m²
   - Ownership: ملك الدولة
   - Location: حي السلام
6. Click to view land coordinates

**Expected Result:** 3 lands appear, search and filter work, details correct

---

### 📍 Scenario 8: Land Coordinates
**Component:** `land-coordinates`
**API Endpoint:** `GET /api/lands/{landId}/coordinates`

**Test Steps:**
1. Select Land LAND-2024-001
2. View coordinates
3. Verify 4 corner coordinates:
   - شمال: 24.7136° N, 46.6753° E
   - جنوب: 24.7126° N, 46.6753° E
   - شرق: 24.7131° N, 46.6763° E
   - غرب: 24.7131° N, 46.6743° E
4. Check coordinates display on map (if map implemented)
5. Test adding/editing coordinates

**Expected Result:** 4 coordinates with correct lat/long values

---

### 🏢 Scenario 9: Building Basic Data
**Component:** `building-basic-data`
**API Endpoint:** `GET /api/buildings/{buildingId}/basic-data`

**Test Steps:**
1. Select Building BLD-2024-001
2. View basic data
3. Verify information:
   - Building Number: BLD-2024-001
   - Ownership Type: ملك
   - Total Area: 2000m²
   - Number of Floors: 3
   - Construction Date: 2020-01-15
   - Status: مكتمل
4. Check all fields populated correctly
5. Test editing basic data

**Expected Result:** Complete building information displays correctly

---

### 🏗️ Scenario 10: Building Annexes Data
**Component:** `building-annexes-data`
**API Endpoint:** `GET /api/buildings/{buildingId}/annexes`

**Test Steps:**
1. Select Building BLD-2024-001
2. Navigate to Building Annexes
3. Verify 2 annexes:
   - مبنى الخدمات - 150m² - خدمات إدارية
   - مستودع - 100m² - تخزين
4. Check annex details and purposes
5. Test CRUD operations

**Expected Result:** 2 building annexes with correct data

---

### 💰 Scenario 11: Network Costs
**Component:** `building-network-costs`
**API Endpoint:** `GET /api/buildings/{buildingId}/network-costs`

**Test Steps:**
1. Select Building BLD-2024-001
2. View network costs
3. Verify cost entries:
   - كهرباء (Electricity): 25000 SAR
   - مياه (Water): 15000 SAR
   - صرف صحي (Sewage): 20000 SAR
   - اتصالات (Telecom): 10000 SAR
4. Check total costs sum correctly (70000 SAR)
5. Test adding new cost item

**Expected Result:** 4 network cost items, total = 70000 SAR

---

### 🏘️ Scenario 12: Rental Buildings List
**Component:** `rental-buildings-list`
**API Endpoint:** `GET /api/rentals`

**Test Steps:**
1. Navigate to Rental Buildings
2. Verify 3 rental buildings display
3. Check details for RENT-2024-001:
   - Owner: أحمد محمد السعيد
   - Annual Rent: 120000 SAR
   - Contract Start: 2024-01-01
   - Status: نشط
4. Filter by status (نشط / منتهي)
5. Search by building number
6. Click to view rental details

**Expected Result:** 3 rentals with correct owner names and amounts

---

### 📋 Scenario 13: Rental Building Details
**Component:** `rental-building-details`
**API Endpoint:** `GET /api/rentals/{rentalId}`

**Test Steps:**
1. Select Rental RENT-2024-001
2. View complete details:
   - Building specifications
   - Owner information (أحمد محمد السعيد, 0501234567)
   - Contract details
   - Payment schedule
   - Status history
3. Verify all fields populated
4. Test editing rental information

**Expected Result:** Complete rental information displays correctly

---

### 📍 Scenario 14: Rental Building Location
**Component:** `rental-building-location`
**API Endpoint:** `GET /api/rentals/{rentalId}/location`

**Test Steps:**
1. Select Rental RENT-2024-001
2. View location details:
   - City: الرياض
   - District: حي الملز
   - Street: شارع الأمير محمد بن عبدالعزيز
   - Postal Code: 11564
   - Coordinates: 24.7136° N, 46.6753° E
3. Check map display (if implemented)
4. Test updating location

**Expected Result:** Complete location information with coordinates

---

### 📊 Scenario 15: Rental Status Report
**Component:** `rental-status-report`
**API Endpoint:** `GET /api/rentals/status-report`

**Test Steps:**
1. Navigate to Rental Status Report
2. Verify statistics:
   - Active Rentals: 2 (نشط)
   - Expired Rentals: 1 (منتهي)
   - Total Annual Cost: 370000 SAR
3. Check chart/graph displays correctly
4. Filter by date range
5. Export report (if available)

**Expected Result:** Accurate statistics and breakdown by status

---

### 🔄 Scenario 16: Modify Rental Status
**Component:** `rental-status-edit`
**API Endpoint:** `PUT /api/rentals/{rentalId}/status`

**Test Steps:**
1. Select Rental RENT-2024-003 (current status: منتهي)
2. Navigate to status modification
3. Change status to "نشط"
4. Add modification reason: "تجديد العقد"
5. Save changes
6. Verify status updated in list
7. Check status history logged

**Expected Result:** Status changes from منتهي to نشط with history entry

---

### 🚚 Scenario 17: Displacement Requests List
**Component:** `building-displacement-menu`
**API Endpoint:** `GET /api/displacements`

**Test Steps:**
1. Navigate to Displacement Requests
2. Verify 2 displacement requests:
   - DISP-2024-001 - مدرسة الأمل - قيد المراجعة
   - DISP-2024-002 - مدرسة النور - معتمد من المجلس
3. Filter by status
4. Search by request number
5. Click to view displacement details

**Expected Result:** 2 displacement requests with different statuses

---

### 📝 Scenario 18: Displacement Pre-Assessment
**Component:** `building-displacement-pre`
**API Endpoint:** `GET /api/displacements/{displacementId}/pre-assessment`

**Test Steps:**
1. Select Displacement DISP-2024-001
2. View pre-assessment data:
   - Current building condition assessment
   - Number of classrooms affected: 15
   - Estimated students to relocate: 600
   - Infrastructure evaluation
3. Check all assessment fields
4. Test editing pre-assessment

**Expected Result:** Pre-assessment data displays with 15 classrooms, 600 students

---

### 🏗️ Scenario 19: Displacement Post-Construction
**Component:** `building-displacement-post`
**API Endpoint:** `GET /api/displacements/{displacementId}/post-construction`

**Test Steps:**
1. Select Displacement DISP-2024-002 (معتمد من المجلس)
2. View post-construction data:
   - New building specifications
   - Completion status
   - Facilities comparison (old vs new)
3. Verify construction progress indicators
4. Test updating post-construction data

**Expected Result:** Post-construction details show completed status

---

### ✅ Scenario 20: Displacement Council Approval
**Component:** `displacement-council-approval`
**API Endpoint:** `GET /api/displacements/{displacementId}/council-approval`

**Test Steps:**
1. Select Displacement DISP-2024-002
2. View council approval details:
   - Approval Date: 2024-03-15
   - Council Decision: موافق
   - Approval Notes: تمت الموافقة على مشروع الإزاحة
3. Check approval document reference
4. Test submitting for approval (DISP-2024-001)

**Expected Result:** Approval details with date and decision

---

### 💵 Scenario 21: Final Compensation
**Component:** `displacement-final-compensation`
**API Endpoint:** `GET /api/displacements/{displacementId}/final-compensation`

**Test Steps:**
1. Select Displacement DISP-2024-002
2. View final compensation:
   - Total Compensation: 5000000 SAR
   - Payment Status: مدفوع
   - Payment Date: 2024-04-01
3. Check compensation breakdown
4. Verify payment history

**Expected Result:** Compensation amount 5,000,000 SAR, status paid

---

## Error Handling Tests

### Test 1: Invalid Building Number
**Test Steps:**
1. Search for building "BLD-9999" (doesn't exist)
2. Verify Arabic error message: "لم يتم العثور على البيانات المطلوبة"
3. Check console for error log

**Expected Result:** User-friendly Arabic error, no crash

---

### Test 2: Backend Down
**Test Steps:**
1. Stop backend server (Ctrl+C)
2. Try to load Educational Buildings list
3. Verify error message: "فشل الاتصال بالخادم"
4. Start backend again
5. Retry - should work

**Expected Result:** Connection error displays, recovers when backend restarts

---

### Test 3: Invalid GUID
**Test Steps:**
1. Try to access `/buildings/invalid-guid-format`
2. Verify validation error before API call
3. Check console shows validation message

**Expected Result:** Validation catches invalid GUID, prevents API call

---

### Test 4: Empty Response
**Test Steps:**
1. Query for building with no annexes
2. Verify empty state message: "لا توجد بيانات"
3. Check UI handles empty arrays gracefully

**Expected Result:** Empty state displays, no errors

---

## Performance Tests

### Test 1: Large List Loading
**Test Steps:**
1. Load Educational Buildings list (5 items)
2. Check loading spinner appears
3. Measure load time (should be < 1 second)
4. Verify pagination (if implemented)

**Expected Result:** Fast loading with visual feedback

---

### Test 2: Concurrent Requests
**Test Steps:**
1. Open dashboard (multiple API calls)
2. Verify all requests complete successfully
3. Check no race conditions
4. Confirm data consistency

**Expected Result:** All data loads correctly, no conflicts

---

## Data Integrity Checks

### Test 1: Educational Building as Central Hub
**Test Steps:**
1. Select Educational Building EDU-001
2. Verify can access:
   - Study Periods (3 records)
   - Roads (2 records)
   - Annexes (2 records)
   - Spaces (3 records)
3. Check all related data loads correctly

**Expected Result:** All child records accessible from parent building

---

### Test 2: Cross-Reference Validation
**Test Steps:**
1. View Building BLD-2024-001
2. Check if linked to any Educational Building
3. Verify relationships are correct
4. Test navigation between related entities

**Expected Result:** Relationships maintain data integrity

---

## Quick Verification Checklist

Before starting UI tests, verify:

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:4200
- [ ] Database connection successful
- [ ] Swagger UI accessible at http://localhost:5000/swagger
- [ ] Can login with admin/password123
- [ ] Browser console open (F12) for debugging
- [ ] Network tab open to monitor API calls

---

## Common Issues & Solutions

### Issue: "لم يتم العثور على البيانات المطلوبة" (404 Not Found)
**Solution:** Database may be empty. Re-run seed script:
```powershell
cd backend-dotnet
sqlcmd -S "ANDREW-SAMY\MSSQLSERVER2" -U sa -P 123 -i "seed-database.sql"
```

### Issue: CORS Error
**Solution:** Verify backend CORS is configured for http://localhost:4200 in Program.cs

### Issue: Connection Refused
**Solution:** Ensure backend is running. Check URL is http://localhost:5000 (not 5001)

### Issue: Arabic Text Not Displaying
**Solution:** Check browser encoding is set to UTF-8

### Issue: Empty Lists
**Solution:** Check console for API errors. Verify route matches backend controller (e.g., `/api/schoolmaps` not `/api/school-maps`)

---

## Next Steps

After completing these tests:

1. **Document Issues**: Note any bugs or UI problems
2. **Check Console Logs**: Review error messages and API responses
3. **Test Edge Cases**: Try invalid inputs, boundary conditions
4. **Performance Analysis**: Check slow queries or large data loads
5. **User Experience**: Evaluate Arabic text, navigation flow, error messages

---

## Contact & Support

If you encounter issues:
- Check browser console (F12) for error details
- Review backend logs in terminal
- Verify database records with SQL queries
- Check API responses in Swagger UI
- Ensure all services are running on correct ports

**Happy Testing! 🎉**
