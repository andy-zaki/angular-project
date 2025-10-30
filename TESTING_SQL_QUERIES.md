# Testing SQL Queries

This document contains SQL SELECT statements to verify data changes after insert or update operations in the database.

## Table of Contents
- [Lands](#lands)
- [Buildings](#buildings)
- [Rentals](#rentals)
- [Displacements](#displacements)
- [School Maps](#school-maps)

---

## Lands

### View All Lands
```sql
SELECT 
    Id,
    LandCode,
    Governorate,
    RegionalCenter,
    EducationalAdministration,
    District,
    Neighborhood,
    Housing,
    Model,
    Documents,
    CreatedAt,
    UpdatedAt
FROM Lands
ORDER BY CreatedAt DESC;
```

### View Specific Land by Code
```sql
SELECT * FROM Lands
WHERE LandCode = 'LAND-2024-001';
```

### View Recently Updated Lands (Last 24 Hours)
```sql
SELECT 
    Id,
    LandCode,
    Governorate,
    District,
    Neighborhood,
    UpdatedAt
FROM Lands
WHERE UpdatedAt >= DATEADD(day, -1, GETDATE())
ORDER BY UpdatedAt DESC;
```

---

## Buildings

### View All Buildings
```sql
SELECT 
    Id,
    BuildingNumber,
    SchoolName,
    Governorate,
    RegionalCenter,
    EducationalAdministration,
    District,
    Neighborhood,
    UsageStatus,
    BuildingOwnership,
    CreatedAt,
    UpdatedAt
FROM Buildings
ORDER BY CreatedAt DESC;
```

### View Specific Building by Number
```sql
SELECT * FROM Buildings
WHERE BuildingNumber = 'B001';
```

### View Building with Basic Data
```sql
SELECT 
    b.Id,
    b.BuildingNumber,
    b.SchoolName,
    b.UsageStatus,
    bb.LandArea,
    bb.BuiltArea,
    bb.Floors,
    bb.ConstructionYear,
    bb.LastMaintenanceYear,
    bb.BuildingCondition,
    bb.OwnershipType,
    bb.RentalStatus
FROM Buildings b
LEFT JOIN BuildingBasicData bb ON b.Id = bb.BuildingId
WHERE b.BuildingNumber = 'B001';
```

### View Building Annexes
```sql
SELECT 
    a.Id,
    b.BuildingNumber,
    a.AnnexNumber,
    a.TotalFloors,
    a.TotalArea,
    a.StructureCondition,
    a.ConstructionDate,
    a.ExpansionCapability
FROM BuildingAnnexes a
INNER JOIN Buildings b ON a.BuildingId = b.Id
WHERE b.BuildingNumber = 'B001'
ORDER BY a.AnnexNumber;
```

### View Building Network Costs
```sql
SELECT 
    nc.Id,
    b.BuildingNumber,
    nc.NetworkType,
    nc.TotalCost,
    nc.InstallationDate,
    nc.CostDescription
FROM NetworkCosts nc
INNER JOIN Buildings b ON nc.BuildingId = b.Id
WHERE b.BuildingNumber = 'B001'
ORDER BY nc.InstallationDate DESC;
```

### View Recently Added Buildings (Last 7 Days)
```sql
SELECT 
    BuildingNumber,
    SchoolName,
    Governorate,
    District,
    CreatedAt
FROM Buildings
WHERE CreatedAt >= DATEADD(day, -7, GETDATE())
ORDER BY CreatedAt DESC;
```

---

## Rentals

### View All Rental Buildings
```sql
SELECT 
    Id,
    BuildingNumber,
    SchoolName,
    RentalStatus,
    RentalSubstatus,
    MonthlyRent,
    ContractStartDate,
    ContractEndDate,
    LandlordName,
    LandlordPhone,
    CreatedAt,
    UpdatedAt
FROM RentalBuildings
ORDER BY UpdatedAt DESC;
```

### View Specific Rental Building
```sql
SELECT * FROM RentalBuildings
WHERE BuildingNumber = 'R001';
```

### View Rental Buildings by Status
```sql
SELECT 
    BuildingNumber,
    SchoolName,
    RentalStatus,
    RentalSubstatus,
    MonthlyRent,
    UpdatedAt
FROM RentalBuildings
WHERE RentalStatus LIKE '%تم التجديد%'
ORDER BY UpdatedAt DESC;
```

### View Recently Updated Rental Status (Last 24 Hours)
```sql
SELECT 
    BuildingNumber,
    SchoolName,
    RentalStatus,
    RentalSubstatus,
    UpdatedAt
FROM RentalBuildings
WHERE UpdatedAt >= DATEADD(day, -1, GETDATE())
ORDER BY UpdatedAt DESC;
```

### Count Rental Buildings by Status
```sql
SELECT 
    CASE 
        WHEN RentalStatus LIKE '%تم التجديد%' THEN 'تم التجديد'
        WHEN RentalStatus LIKE '%تحت الإجراء%' THEN 'تحت الإجراء'
        WHEN RentalStatus LIKE '%منتهي%' THEN 'منتهي'
        ELSE 'غير محدد'
    END AS StatusCategory,
    COUNT(*) AS Count
FROM RentalBuildings
GROUP BY 
    CASE 
        WHEN RentalStatus LIKE '%تم التجديد%' THEN 'تم التجديد'
        WHEN RentalStatus LIKE '%تحت الإجراء%' THEN 'تحت الإجراء'
        WHEN RentalStatus LIKE '%منتهي%' THEN 'منتهي'
        ELSE 'غير محدد'
    END;
```

---

## Displacements

### View All Displacement Records
```sql
SELECT 
    Id,
    RecordNumber,
    PropertyNumber,
    LandCode,
    OwnerName,
    DisplacementType,
    PropertyValue,
    CompensationAmount,
    PaymentDate,
    PaymentMethod,
    Status,
    Notes,
    CreatedAt,
    UpdatedAt
FROM DisplacementRecords
ORDER BY CreatedAt DESC;
```

### View Displacement Records by Type
```sql
-- Pre-Organization
SELECT 
    RecordNumber,
    PropertyNumber,
    OwnerName,
    PropertyValue,
    CompensationAmount,
    Status,
    CreatedAt
FROM DisplacementRecords
WHERE DisplacementType = N'قبل التنظيم'
ORDER BY CreatedAt DESC;

-- Post-Organization
SELECT 
    RecordNumber,
    PropertyNumber,
    OwnerName,
    PropertyValue,
    CompensationAmount,
    Status,
    CreatedAt
FROM DisplacementRecords
WHERE DisplacementType = N'بعد التنظيم'
ORDER BY CreatedAt DESC;

-- Final Compensation
SELECT 
    RecordNumber,
    PropertyNumber,
    OwnerName,
    PropertyValue,
    CompensationAmount,
    PaymentMethod,
    Status,
    CreatedAt
FROM DisplacementRecords
WHERE DisplacementType = 'final_compensation'
ORDER BY CreatedAt DESC;

-- Temporary Fulfillment
SELECT 
    RecordNumber,
    PropertyNumber,
    PropertyValue,
    CompensationAmount,
    Status,
    Notes,
    CreatedAt
FROM DisplacementRecords
WHERE DisplacementType = 'temporary_fulfillment'
ORDER BY CreatedAt DESC;
```

### View Recent Displacements (Last 7 Days)
```sql
SELECT 
    RecordNumber,
    DisplacementType,
    OwnerName,
    PropertyValue,
    CompensationAmount,
    Status,
    CreatedAt
FROM DisplacementRecords
WHERE CreatedAt >= DATEADD(day, -7, GETDATE())
ORDER BY CreatedAt DESC;
```

### Displacement Statistics
```sql
SELECT 
    DisplacementType,
    COUNT(*) AS TotalRecords,
    SUM(PropertyValue) AS TotalPropertyValue,
    SUM(CompensationAmount) AS TotalCompensation,
    AVG(CompensationAmount) AS AverageCompensation
FROM DisplacementRecords
GROUP BY DisplacementType;
```

---

## School Maps

### View All School Maps
```sql
SELECT 
    Id,
    BuildingCode,
    CenterCode,
    BranchCode,
    SchoolName,
    Governorate,
    District,
    CreatedAt,
    UpdatedAt
FROM SchoolMaps
ORDER BY CreatedAt DESC;
```

### View School Map Study Periods
```sql
SELECT 
    sp.Id,
    sm.BuildingCode,
    sm.SchoolName,
    sp.PeriodType,
    sp.StartTime,
    sp.EndTime,
    sp.StudentCount,
    sp.ClassCount
FROM StudyPeriods sp
INNER JOIN SchoolMaps sm ON sp.SchoolMapId = sm.Id
WHERE sm.BuildingCode = 'SCH001'
ORDER BY sp.StartTime;
```

### View School Roads
```sql
SELECT 
    sr.Id,
    sm.BuildingCode,
    sm.SchoolName,
    sr.MainRoadTypeCode,
    sr.RoadWidth,
    sr.MovementDirectionCode
FROM SchoolRoads sr
INNER JOIN SchoolMaps sm ON sr.SchoolMapId = sm.Id
WHERE sm.BuildingCode = 'SCH001';
```

### View School Annexes
```sql
SELECT 
    sa.Id,
    sm.BuildingCode,
    sm.SchoolName,
    sa.AnnexNumber,
    sa.FloorsCount,
    sa.TotalArea,
    sa.StructuralCondition
FROM SchoolAnnexes sa
INNER JOIN SchoolMaps sm ON sa.SchoolMapId = sm.Id
WHERE sm.BuildingCode = 'SCH001'
ORDER BY sa.AnnexNumber;
```

### View School Spaces
```sql
SELECT 
    ss.Id,
    sm.BuildingCode,
    sm.SchoolName,
    ss.SpaceType,
    ss.FloorNumber,
    ss.SpaceArea,
    ss.Capacity,
    ss.CurrentUsage
FROM SchoolSpaces ss
INNER JOIN SchoolMaps sm ON ss.SchoolMapId = sm.Id
WHERE sm.BuildingCode = 'SCH001'
ORDER BY ss.FloorNumber, ss.SpaceType;
```

---

## Quick Verification Queries

### Check Latest 10 Records Across All Tables
```sql
-- Latest Lands
SELECT TOP 10 'Land' AS TableName, LandCode AS Code, CreatedAt 
FROM Lands 
ORDER BY CreatedAt DESC;

-- Latest Buildings
SELECT TOP 10 'Building' AS TableName, BuildingNumber AS Code, CreatedAt 
FROM Buildings 
ORDER BY CreatedAt DESC;

-- Latest Rentals
SELECT TOP 10 'Rental' AS TableName, BuildingNumber AS Code, UpdatedAt AS CreatedAt 
FROM RentalBuildings 
ORDER BY UpdatedAt DESC;

-- Latest Displacements
SELECT TOP 10 'Displacement' AS TableName, RecordNumber AS Code, CreatedAt 
FROM DisplacementRecords 
ORDER BY CreatedAt DESC;

-- Latest School Maps
SELECT TOP 10 'SchoolMap' AS TableName, BuildingCode AS Code, CreatedAt 
FROM SchoolMaps 
ORDER BY CreatedAt DESC;
```

### Count Records in All Tables
```sql
SELECT 'Lands' AS TableName, COUNT(*) AS RecordCount FROM Lands
UNION ALL
SELECT 'Buildings', COUNT(*) FROM Buildings
UNION ALL
SELECT 'BuildingBasicData', COUNT(*) FROM BuildingBasicData
UNION ALL
SELECT 'BuildingAnnexes', COUNT(*) FROM BuildingAnnexes
UNION ALL
SELECT 'NetworkCosts', COUNT(*) FROM NetworkCosts
UNION ALL
SELECT 'RentalBuildings', COUNT(*) FROM RentalBuildings
UNION ALL
SELECT 'DisplacementRecords', COUNT(*) FROM DisplacementRecords
UNION ALL
SELECT 'SchoolMaps', COUNT(*) FROM SchoolMaps
UNION ALL
SELECT 'StudyPeriods', COUNT(*) FROM StudyPeriods
UNION ALL
SELECT 'SchoolRoads', COUNT(*) FROM SchoolRoads
UNION ALL
SELECT 'SchoolAnnexes', COUNT(*) FROM SchoolAnnexes
UNION ALL
SELECT 'SchoolSpaces', COUNT(*) FROM SchoolSpaces;
```

---

## Testing After Form Submission

### After Adding Building Basic Data
```sql
-- Check the building was created
SELECT * FROM Buildings 
WHERE BuildingNumber = 'YOUR_BUILDING_NUMBER'
ORDER BY CreatedAt DESC;
```

### After Adding Building Annexes
```sql
-- Check annexes were added
SELECT 
    b.BuildingNumber,
    a.AnnexNumber,
    a.TotalFloors,
    a.TotalArea,
    a.CreatedAt
FROM BuildingAnnexes a
INNER JOIN Buildings b ON a.BuildingId = b.Id
WHERE b.BuildingNumber = 'YOUR_BUILDING_NUMBER'
ORDER BY a.CreatedAt DESC;
```

### After Updating Rental Status
```sql
-- Check rental status was updated
SELECT 
    BuildingNumber,
    RentalStatus,
    RentalSubstatus,
    UpdatedAt
FROM RentalBuildings
WHERE BuildingNumber = 'YOUR_RENTAL_NUMBER'
ORDER BY UpdatedAt DESC;
```

### After Adding Displacement Record
```sql
-- Check displacement was created
SELECT 
    RecordNumber,
    DisplacementType,
    PropertyValue,
    CompensationAmount,
    Status,
    CreatedAt
FROM DisplacementRecords
WHERE RecordNumber = 'YOUR_RECORD_NUMBER'
ORDER BY CreatedAt DESC;
```

### After Adding School Road Data
```sql
-- Check school road was created
SELECT 
    sm.BuildingCode,
    sr.MainRoadTypeCode,
    sr.RoadWidth,
    sr.MovementDirectionCode,
    sr.CreatedAt
FROM SchoolRoads sr
INNER JOIN SchoolMaps sm ON sr.SchoolMapId = sm.Id
WHERE sm.BuildingCode = 'YOUR_BUILDING_CODE'
ORDER BY sr.CreatedAt DESC;
```

---

## Database Cleanup (Use with Caution)

### Delete Test Records
```sql
-- Delete test buildings (example)
DELETE FROM Buildings 
WHERE BuildingNumber LIKE 'TEST%';

-- Delete test displacements
DELETE FROM DisplacementRecords 
WHERE RecordNumber LIKE 'TEST%';

-- Delete recent test entries (last hour)
DELETE FROM Buildings 
WHERE CreatedAt >= DATEADD(hour, -1, GETDATE()) 
AND BuildingNumber LIKE '%test%';
```

### Reset Specific Table (Use with EXTREME Caution)
```sql
-- This will delete ALL data from the table
-- TRUNCATE TABLE Buildings; -- Uncomment to use
-- TRUNCATE TABLE DisplacementRecords; -- Uncomment to use
```

---

## Using SQL Server Management Studio (SSMS)

1. Connect to: `(localdb)\MSSQLLocalDB`
2. Find database: `AngularProjectDb`
3. Open New Query window
4. Copy and paste any query above
5. Execute (F5 or click Execute button)

## Using Visual Studio / VS Code SQL Tools

1. Install SQL Server extension
2. Connect to: `(localdb)\MSSQLLocalDB`
3. Select database: `AngularProjectDb`
4. Run queries from this file

## Testing Workflow

1. **Before Form Submission**: Note the current record count
2. **Submit Form**: Use the Angular application
3. **Run Verification Query**: Use appropriate SELECT statement
4. **Verify Data**: Check that new/updated records appear with correct values
5. **Check Timestamps**: Ensure `CreatedAt` or `UpdatedAt` are current

---

**Note**: All queries use proper SQL Server syntax. Adjust table/column names if your schema differs.
