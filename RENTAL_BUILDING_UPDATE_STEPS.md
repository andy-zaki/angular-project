# Rental Building Schema Update - Complete Guide

## Overview
This guide explains how to update the RentalBuildings table to include all required fields for the building inquiry feature.

## Changes Made

### 1. Backend (.NET)
- **File**: `backend-dotnet/Models/Rental.cs`
  - Added 30 new fields to `RentalBuilding` model
  - Fields include: Governorate, RegionalCenter, EducationalAdministration, etc.

### 2. Frontend (Angular)
- **File**: `src/app/models/rental.model.ts`
  - Updated `RentalBuildingDetails` interface with all new fields
  
- **File**: `src/app/components/rental-inquiry-building/rental-inquiry-building.html`
  - Updated template to display all 33 required fields

### 3. Database Scripts
- **File**: `backend-dotnet/add-rental-building-columns.sql`
  - Migration script to add new columns (CREATED)
  
- **File**: `backend-dotnet/seed-database.sql`
  - Updated INSERT statements with all new fields (UPDATED)

## Step-by-Step Execution

### Step 1: Run the Migration Script
```powershell
# Open PowerShell in backend-dotnet folder
cd d:\repos\angular-project\backend-dotnet

# Set UTF-8 encoding
chcp 65001

# Run the migration
sqlcmd -S ANDREW-SAMY\MSSQLSERVER2 -d AngularProjectDB -i add-rental-building-columns.sql
```

**Expected Output:**
```
✓ Added column: Governorate
✓ Added column: RegionalCenter
✓ Added column: EducationalAdministration
... (30 columns total)
Migration completed successfully!
```

### Step 2: Re-populate Data
```powershell
# Clear and re-insert data with all fields
sqlcmd -S ANDREW-SAMY\MSSQLSERVER2 -d AngularProjectDB -i seed-database.sql
```

**Expected Output:**
```
Database populated successfully with dummy data!
Default login credentials:
Username: admin, Password: password123
```

### Step 3: Restart Backend API
```powershell
# Stop the running API (Ctrl+C in terminal)
# Then restart it
cd d:\repos\angular-project\backend-dotnet
dotnet run
```

### Step 4: Test the Application
1. Navigate to: `http://localhost:4200/rental-inquiry-building`
2. Search using ID: `801234`, `802456`, or `803789`
3. Click "ℹ️ استعلام عن المبنى"
4. Verify all 33 fields are displayed:

#### Expected Fields to Display:
1. كود المبني (Building Code)
2. اسم المدرسة (School Name)
3. المحافظة (Governorate)
4. مركز (Regional Center)
5. الادارة التعليمية (Educational Administration)
6. نوعية التعليم (Education Type)
7. التبعية (Affiliation)
8. موقف الاستخدام (Usage Status)
9. المرحلة التعليمية (Educational Stage)
10. فترات الاستخدام (Usage Periods)
11. النوع (الجنس) (Gender)
12. اسم مدرسة الفترة الثانية (Second Period School)
13. اسم مدرسة الفترة الثالثة (Third Period School)
14. اجمالي تلاميذ المدرسة (Total Students)
15. بنين (Boys Count)
16. بنات (Girls Count)
17. ملكية الارض (Land Ownership)
18. ملكية المبني (Building Ownership)
19. اجمالي مساحة الموقع (Land Area)
20. مسطح المبني (Built Area)
21. عدد الملاحق (Annexes Count)
22. السور (Fence Type)
23. نظام الانشاء (Construction System)
24. طريقة الانشاء (Construction Method)
25. مصدر التيار (Power Source)
26. الصرف الصحي (Sewerage System)
27. التغذية (Water Supply)
28. عدد الفصول (Classrooms Count)
29. عدد الفراغات التعليمية (Educational Spaces Count)
30. حالة الاستضافة (Hosting Status)
31. عدد الفراغات التكميلية (Complementary Spaces Count)

## Sample Data
The seed script includes 3 rental buildings:

| ID | School Name | Governorate | Stage |
|----|------------|-------------|-------|
| 801234 | مدرسة عمر بن الخطاب الابتدائية | محافظة القاهرة | ابتدائي |
| 802456 | مدرسة طلعت حرب الإعدادية | محافظة القاهرة | إعدادي |
| 803789 | مدرسة الإسكندرية الثانوية بنات | محافظة الإسكندرية | ثانوي |

## Troubleshooting

### Issue: Migration script fails
**Solution**: Check if columns already exist. The script is safe to re-run.

### Issue: Data not showing all fields
**Solution**: 
1. Verify migration ran successfully
2. Check that seed script was run AFTER migration
3. Restart the .NET API
4. Clear browser cache

### Issue: TypeScript compile errors
**Solution**: 
1. Restart the Angular dev server
2. Run `npm install` if needed
3. Check that `rental.model.ts` has all fields

## Database Schema Reference

### RentalBuildings Table Structure (After Migration)
- **Total Columns**: 50+ fields
- **New Columns Added**: 30 fields
- **Data Type**: All Arabic text uses NVARCHAR
- **Nullable**: All new columns are NULL-able for backward compatibility

## Files Modified
1. `backend-dotnet/Models/Rental.cs` ✅
2. `src/app/models/rental.model.ts` ✅
3. `src/app/components/rental-inquiry-building/rental-inquiry-building.html` ✅
4. `backend-dotnet/seed-database.sql` ✅

## Files Created
1. `backend-dotnet/add-rental-building-columns.sql` ✅

## Verification Checklist
- [ ] Migration script executed successfully
- [ ] Seed data script executed successfully
- [ ] .NET API restarted
- [ ] Angular app shows all 33 fields
- [ ] All fields display correct Arabic data
- [ ] No console errors in browser
- [ ] No compilation errors in VS Code

## Notes
- The migration is non-destructive (all new columns are nullable)
- Existing data will remain intact
- The schema now matches all requirements from the specification
- All Arabic text is properly encoded using NVARCHAR

## Support
If you encounter issues, check:
1. SQL Server connection string
2. Database permissions
3. File encoding (UTF-8 with BOM for SQL files)
4. Node.js and Angular versions

---
**Last Updated**: October 31, 2025
**Status**: Ready for Testing ✅
