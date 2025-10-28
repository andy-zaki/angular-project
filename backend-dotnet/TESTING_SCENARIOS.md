# Testing Scenarios - AngularProjectDB

## Overview
This document provides comprehensive testing scenarios for the Angular Project database and API endpoints. The database is populated with realistic dummy data for testing all features.

---

## Test Environment Setup

### Database Connection
- **Server:** ANDREW-SAMY\MSSQLSERVER2
- **Database:** AngularProjectDB
- **User:** sa
- **Password:** 123

### API Endpoints
- **Base URL:** http://localhost:5000
- **Swagger UI:** http://localhost:5000/swagger

### Test Users
```
Username: admin     | Password: password123 | Role: Admin
Username: manager   | Password: password123 | Role: Manager
Username: user1     | Password: password123 | Role: User
```

---

## 1. Authentication Testing Scenarios

### Scenario 1.1: User Login
**Objective:** Test successful user authentication

**Endpoint:** `POST /api/auth/login`

**Test Data:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Expected Result:**
- Status: 200 OK
- Response contains user details with token
- User role: Admin

**Validation:**
- Password hash matches
- User account is active
- Last login date is updated

### Scenario 1.2: Failed Login - Invalid Credentials
**Endpoint:** `POST /api/auth/login`

**Test Data:**
```json
{
  "username": "admin",
  "password": "wrongpassword"
}
```

**Expected Result:**
- Status: 401 Unauthorized
- Error message returned

### Scenario 1.3: User Registration
**Endpoint:** `POST /api/auth/register`

**Test Data:**
```json
{
  "username": "testuser",
  "password": "TestPass123",
  "email": "testuser@education.gov.sa",
  "fullName": "مستخدم اختبار",
  "role": "User"
}
```

**Expected Result:**
- Status: 201 Created
- New user created with hashed password
- User is active by default

### Scenario 1.4: Get User Programs, Menus, Libraries
**Endpoints:** 
- `GET /api/auth/programs`
- `GET /api/auth/menus`
- `GET /api/auth/libraries`

**Expected Result:**
- Status: 200 OK
- Returns 3 programs, 3 menus, 3 libraries
- All items have Arabic names

---

## 2. Educational Buildings Testing Scenarios

### Scenario 2.1: Get All Educational Buildings
**Objective:** Retrieve all educational buildings (المباني التعليمية)

**Endpoint:** `GET /api/schoolmaps/educational-buildings`

**Expected Result:**
- Status: 200 OK
- Returns 5 educational buildings:
  - EDU-001: مدرسة النور الابتدائية (Elementary)
  - EDU-002: مدرسة الأمل المتوسطة (Middle School)
  - EDU-003: مدرسة الفيصلية الثانوية (High School)
  - EDU-004: مدرسة الروضة الأولى (Kindergarten - Under Maintenance)
  - EDU-005: مدرسة الإبداع الابتدائية (Elementary)

**Validation:**
- All buildings have BuildingCode, BuildingName
- Status is either "نشط" or "قيد الصيانة"
- EducationType matches: ابتدائي, متوسط, ثانوي, روضة

### Scenario 2.2: Get Educational Building by Code
**Endpoint:** `GET /api/schoolmaps/educational-buildings/code/EDU-001`

**Expected Result:**
- Status: 200 OK
- Returns مدرسة النور الابتدائية
- Total Area: 2500.00
- Number of Classrooms: 20
- Has Library, Gym, and Cafeteria

### Scenario 2.3: Get Educational Building with Related Entities
**Objective:** Test central hub relationships

**Endpoint:** `GET /api/schoolmaps/educational-buildings/{id}`

**Expected Result:**
- Status: 200 OK
- Response includes:
  - Study Periods (الفترات الدراسية)
  - School Roads (طرق المدرسة)
  - School Annexes (ملاحق المدرسة)
  - School Spaces (الفراغات المدرسية)
  - Related Buildings
  - Related Lands
  - Related Rental Buildings
  - Related Displacement Records

---

## 3. Study Periods Testing Scenarios

### Scenario 3.1: Get Study Periods by Building Code
**Endpoint:** `GET /api/schoolmaps/study-periods/building/EDU-001`

**Expected Result:**
- Status: 200 OK
- Returns 2 periods:
  - الفترة الصباحية (450 students, 35 teachers)
  - الفترة المسائية (380 students, 28 teachers)

**Validation:**
- StudentCount > 0
- ClassroomCount > 0
- TeacherCount > 0
- EducationalLevel: ابتدائي

### Scenario 3.2: Create New Study Period
**Endpoint:** `POST /api/schoolmaps/study-periods`

**Test Data:**
```json
{
  "educationalBuildingId": "{guid-of-EDU-002}",
  "buildingCode": "EDU-002",
  "schoolName": "مدرسة الأمل المتوسطة",
  "period": "الفترة المسائية",
  "studentCount": 350,
  "classroomCount": 20,
  "teacherCount": 30,
  "educationalLevel": "متوسط"
}
```

**Expected Result:**
- Status: 201 Created
- New study period created
- Linked to educational building

---

## 4. Lands Testing Scenarios

### Scenario 4.1: Get All Lands
**Endpoint:** `GET /api/lands`

**Expected Result:**
- Status: 200 OK
- Returns 3 lands:
  - LAND-2024-001 (Used, Connected to EDU-001)
  - LAND-2024-002 (Unused, Connected to EDU-002)
  - LAND-2024-003 (Used, Connected to EDU-003)

### Scenario 4.2: Get Land by Reference Number
**Endpoint:** `GET /api/lands/reference/LAND-2024-001`

**Expected Result:**
- Status: 200 OK
- UsageStatus: مستخدم
- TotalArea: 5000.00
- ApprovalStatus: معتمد
- EducationalBuildingId: {guid-of-EDU-001}

### Scenario 4.3: Get Land Coordinates
**Endpoint:** `GET /api/lands/{landId}/coordinates`

**Expected Result:**
- Status: 200 OK
- Returns GPS coordinates with:
  - PointNumber
  - Latitude (decimal 10,8)
  - Longitude (decimal 11,8)
  - Elevation

**Validation:**
- Latitude between 16-32 (Saudi Arabia bounds)
- Longitude between 34-56 (Saudi Arabia bounds)

### Scenario 4.4: Get Building Locations on Land
**Endpoint:** `GET /api/lands/{landId}/locations`

**Expected Result:**
- Status: 200 OK
- Returns building locations with status
- Status: متاح or محجوز

---

## 5. Buildings Testing Scenarios

### Scenario 5.1: Get All Buildings
**Endpoint:** `GET /api/buildings`

**Expected Result:**
- Status: 200 OK
- Returns 3 buildings:
  - BLD-001: مدرسة النور الابتدائية
  - BLD-002: مدرسة الأمل المتوسطة
  - BLD-003: مدرسة الفيصلية الثانوية

### Scenario 5.2: Get Building Basic Data
**Endpoint:** `GET /api/buildings/{buildingId}/basic-data`

**Expected Result:**
- Status: 200 OK
- One-to-one relationship data:
  - LandArea
  - BuiltArea
  - Floors
  - ConstructionYear
  - BuildingCondition: جيد or ممتاز

### Scenario 5.3: Get Building Annexes
**Endpoint:** `GET /api/buildings/{buildingId}/annexes`

**Expected Result:**
- Status: 200 OK
- Returns annexes like:
  - سور خارجي (External fence)
  - ساحة خارجية (Outdoor yard)
  - مظلات خارجية (Shades)
  - موقف سيارات (Parking)

### Scenario 5.4: Get Network Costs
**Endpoint:** `GET /api/buildings/{buildingId}/network-costs`

**Expected Result:**
- Status: 200 OK
- Returns network installations:
  - كهرباء (Electricity)
  - مياه (Water)
  - إنترنت (Internet)
- Each with InstallationCost and MaintenanceCost

---

## 6. Rental Buildings Testing Scenarios

### Scenario 6.1: Get All Rental Buildings
**Endpoint:** `GET /api/rentals`

**Expected Result:**
- Status: 200 OK
- Returns 3 rental buildings with different statuses:
  - RB-2024-001: نشط (Active)
  - RB-2024-002: نشط (Active)
  - RB-2024-003: قيد المراجعة (Under Review)

### Scenario 6.2: Get Rental Building by Status
**Endpoint:** `GET /api/rentals/status/نشط`

**Expected Result:**
- Status: 200 OK
- Returns 2 active rental buildings
- Both have StatusFlagId linked to "ACTIVE" flag

### Scenario 6.3: Get Rental Building Location
**Endpoint:** `GET /api/rentals/{rentalId}/location`

**Expected Result:**
- Status: 200 OK
- Returns detailed location:
  - Governorate (منطقة الرياض, منطقة مكة المكرمة)
  - City (الرياض, جدة)
  - District, Neighborhood, Street
  - GPS coordinates

### Scenario 6.4: Get Rental Decisions
**Endpoint:** `GET /api/rentals/{rentalId}/decisions`

**Expected Result:**
- Status: 200 OK
- Returns rental decisions with:
  - DecisionNumber
  - DecisionType: عقد إيجار جديد, تجديد عقد
  - ApprovedBy
  - DecisionDate

### Scenario 6.5: Update Rental Status
**Endpoint:** `PUT /api/rentals/{id}`

**Test Data:**
```json
{
  "status": "منتهي",
  "substatus": "انتهى العقد",
  "statusFlagId": "{guid-of-EXPIRED-flag}"
}
```

**Expected Result:**
- Status: 200 OK
- Rental status updated
- StatusFlagId changed to EXPIRED

---

## 7. Displacement Records Testing Scenarios

### Scenario 7.1: Get All Displacement Records
**Endpoint:** `GET /api/displacements`

**Expected Result:**
- Status: 200 OK
- Returns 2 displacement records:
  - DISP-2024-001: إحلال كامل (معتمد)
  - DISP-2024-002: صيانة وترميم (قيد التنفيذ)

### Scenario 7.2: Get Displacement by Reference Number
**Endpoint:** `GET /api/displacements/reference/DISP-2024-001`

**Expected Result:**
- Status: 200 OK
- BuildingCode: EDU-001
- DisplacementType: إحلال كامل
- Status: معتمد
- EducationalBuildingId: {guid-of-EDU-001}

### Scenario 7.3: Get Displacement Compensations
**Endpoint:** `GET /api/displacements/{displacementId}/compensations`

**Expected Result:**
- Status: 200 OK
- Returns compensations with:
  - CompensationType: تعويض مالي, تعويض إضافي
  - Amount (decimal)
  - PaymentStatus: مدفوع, قيد الانتظار
  - PaymentMethod: تحويل بنكي, شيك

### Scenario 7.4: Get Council Approvals
**Endpoint:** `GET /api/displacements/{displacementId}/approvals`

**Expected Result:**
- Status: 200 OK
- Returns council approvals:
  - CouncilName: مجلس إدارة التعليم, اللجنة المالية
  - ApprovalNumber
  - ApprovalStatus: معتمد
  - DecisionDetails

---

## 8. School Map Components Testing Scenarios

### Scenario 8.1: Get School Roads
**Endpoint:** `GET /api/schoolmaps/school-roads/building/EDU-001`

**Expected Result:**
- Status: 200 OK
- Returns roads surrounding the school:
  - Direction: شمال, جنوب, شرق, غرب
  - RoadName: طريق الملك فهد, شارع العليا
  - RoadWidth (decimal)
  - RoadType: رئيسي, فرعي
  - Condition: جيد, ممتاز

### Scenario 8.2: Get School Annexes
**Endpoint:** `GET /api/schoolmaps/school-annexes/building/EDU-001`

**Expected Result:**
- Status: 200 OK
- Returns school annexes:
  - AnnexType: مبنى إداري, صالة رياضية, مختبر علوم
  - Area (decimal)
  - Capacity
  - Purpose

### Scenario 8.3: Get School Spaces
**Endpoint:** `GET /api/schoolmaps/school-spaces/building/EDU-001`

**Expected Result:**
- Status: 200 OK
- Returns school spaces:
  - SpaceType: فصول دراسية, مختبرات, قاعات محاضرات
  - Area per unit
  - Quantity
  - Usage

---

## 9. Central Hub Relationship Testing

### Scenario 9.1: Test Educational Building as Central Hub
**Objective:** Verify all entities connect to EducationalBuilding

**Steps:**
1. Get EducationalBuilding EDU-001
2. Verify it has related:
   - Buildings (BLD-001)
   - Lands (LAND-2024-001)
   - RentalBuildings (RB-2024-001)
   - DisplacementRecords (DISP-2024-001)
   - StudyPeriods (2 periods)
   - SchoolRoads (2 roads)
   - SchoolAnnexes (2 annexes)
   - SchoolSpaces (2 spaces)

**Expected Result:**
- All foreign key relationships work correctly
- Navigation properties return related data
- Central hub pattern is maintained

### Scenario 9.2: Test Cascade Delete with SET NULL
**Objective:** Verify that deleting an EducationalBuilding sets FKs to NULL

**Steps:**
1. Create a test EducationalBuilding
2. Create related Building with EducationalBuildingId
3. Delete the EducationalBuilding
4. Query the Building

**Expected Result:**
- Building still exists
- EducationalBuildingId is NULL
- No cascade delete occurred

---

## 10. Search and Filter Testing Scenarios

### Scenario 10.1: Search Buildings by School Name
**Endpoint:** `GET /api/buildings/school/النور`

**Expected Result:**
- Status: 200 OK
- Returns building with "النور" in school name

### Scenario 10.2: Filter Lands by Usage Status
**Endpoint:** `GET /api/lands/status/مستخدم`

**Expected Result:**
- Status: 200 OK
- Returns 2 lands with UsageStatus = "مستخدم"

### Scenario 10.3: Filter Rental Buildings by Educational Building
**Endpoint:** `GET /api/rentals/educational-building/{eduBuildingId}`

**Expected Result:**
- Status: 200 OK
- Returns all rental buildings linked to specific educational building

---

## 11. Performance Testing Scenarios

### Scenario 11.1: Load Test - Get All Educational Buildings
**Objective:** Test performance with multiple requests

**Steps:**
1. Send 100 concurrent requests to `GET /api/schoolmaps/educational-buildings`
2. Measure response times

**Expected Result:**
- Average response time < 100ms
- No failed requests
- All requests return 5 buildings

### Scenario 11.2: Complex Query Test
**Objective:** Test query performance with joins

**Endpoint:** `GET /api/schoolmaps/educational-buildings/{id}` (with includes)

**Expected Result:**
- Response time < 500ms
- All related entities loaded
- No N+1 query problems

---

## 12. Data Integrity Testing Scenarios

### Scenario 12.1: Unique Constraint - BuildingCode
**Objective:** Test unique constraint on EducationalBuildings.BuildingCode

**Steps:**
1. Try to create new EducationalBuilding with code "EDU-001"

**Expected Result:**
- Status: 400 Bad Request or 409 Conflict
- Error message about duplicate BuildingCode

### Scenario 12.2: Foreign Key Constraint
**Objective:** Test FK constraint on RentalBuildings.StatusFlagId

**Steps:**
1. Try to create RentalBuilding with non-existent StatusFlagId

**Expected Result:**
- Status: 400 Bad Request
- Foreign key constraint violation error

### Scenario 12.3: Required Field Validation
**Endpoint:** `POST /api/buildings`

**Test Data (Missing required fields):**
```json
{
  "schoolName": "مدرسة اختبار"
}
```

**Expected Result:**
- Status: 400 Bad Request
- Validation errors for missing BuildingNumber

---

## 13. Error Handling Testing Scenarios

### Scenario 13.1: Not Found - Invalid ID
**Endpoint:** `GET /api/buildings/{invalid-guid}`

**Expected Result:**
- Status: 404 Not Found
- Error message indicating building not found

### Scenario 13.2: Bad Request - Invalid Data Type
**Endpoint:** `POST /api/lands`

**Test Data:**
```json
{
  "totalArea": "invalid-number"
}
```

**Expected Result:**
- Status: 400 Bad Request
- Validation error for totalArea field

---

## 14. SQL Direct Query Testing

### Test Query 1: Educational Buildings with Counts
```sql
SELECT 
    eb.BuildingCode,
    eb.BuildingName,
    COUNT(DISTINCT b.Id) AS BuildingCount,
    COUNT(DISTINCT l.Id) AS LandCount,
    COUNT(DISTINCT rb.Id) AS RentalBuildingCount,
    COUNT(DISTINCT sp.Id) AS StudyPeriodCount
FROM EducationalBuildings eb
LEFT JOIN Buildings b ON b.EducationalBuildingId = eb.Id
LEFT JOIN Lands l ON l.EducationalBuildingId = eb.Id
LEFT JOIN RentalBuildings rb ON rb.EducationalBuildingId = eb.Id
LEFT JOIN StudyPeriods sp ON sp.EducationalBuildingId = eb.Id
GROUP BY eb.BuildingCode, eb.BuildingName
ORDER BY eb.BuildingCode;
```

### Test Query 2: Rental Buildings Summary
```sql
SELECT 
    rb.IdentificationNumber,
    rb.Name,
    rsf.Label AS StatusLabel,
    rb.MonthlyRent,
    DATEDIFF(day, rb.ContractStartDate, rb.ContractEndDate) AS ContractDays
FROM RentalBuildings rb
INNER JOIN RentalStatusFlags rsf ON rb.StatusFlagId = rsf.Id
ORDER BY rb.MonthlyRent DESC;
```

### Test Query 3: Displacement with Compensations
```sql
SELECT 
    dr.ReferenceNumber,
    dr.DisplacementType,
    dr.Status,
    COUNT(dc.Id) AS CompensationCount,
    SUM(dc.Amount) AS TotalCompensation
FROM DisplacementRecords dr
LEFT JOIN DisplacementCompensations dc ON dc.DisplacementId = dr.Id
GROUP BY dr.ReferenceNumber, dr.DisplacementType, dr.Status;
```

---

## 15. Integration Testing Checklist

- [ ] Authentication flow works end-to-end
- [ ] Educational buildings can be created and retrieved
- [ ] Study periods link correctly to educational buildings
- [ ] Lands can be created with coordinates
- [ ] Buildings link to educational buildings and lands
- [ ] Rental buildings link to status flags and educational buildings
- [ ] Displacement records link to educational buildings
- [ ] All cascade deletes work as expected (CASCADE or SET NULL)
- [ ] All unique constraints are enforced
- [ ] All indexes are created and improve query performance
- [ ] Arabic text is stored and retrieved correctly
- [ ] Decimal numbers are precise (18,2)
- [ ] GPS coordinates are precise (Lat: 10,8, Lon: 11,8)
- [ ] Dates are stored in UTC format
- [ ] CORS allows Angular frontend requests

---

## 16. Test Data Reference

### Educational Buildings
- EDU-001: مدرسة النور الابتدائية (Elementary, Active, 20 classrooms)
- EDU-002: مدرسة الأمل المتوسطة (Middle, Active, 24 classrooms)
- EDU-003: مدرسة الفيصلية الثانوية (High School, Active, 30 classrooms)
- EDU-004: مدرسة الروضة الأولى (Kindergarten, Maintenance, 10 classrooms)
- EDU-005: مدرسة الإبداع الابتدائية (Elementary, Active, 22 classrooms)

### Rental Status Flags
- ACTIVE: نشط
- PENDING: قيد الانتظار
- EXPIRED: منتهي
- MAINTENANCE: قيد الصيانة

### Cities
- Riyadh (الرياض): حي الملز, حي النخيل
- Jeddah (جدة): حي الروضة
- Dammam (الدمام): حي الفيصلية

---

## Notes
- All test data is in Arabic to match real-world usage
- GPS coordinates are realistic for Saudi Arabia locations
- All monetary values use decimal(18,2) precision
- All dates are stored as datetime2 in UTC
- Password hashes use SHA256 (not production-ready, use bcrypt/Identity for production)
