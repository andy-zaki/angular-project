-- SQL Script to Populate AngularProjectDB with Dummy Data
-- Server: ANDREW-SAMY\MSSQLSERVER2
-- Database: AngularProjectDB
-- Execute this script after database creation

USE AngularProjectDB;
GO

-- Clear existing data (in reverse order of dependencies)
DELETE FROM [RentalDecisions];
DELETE FROM [RentalBuildingLocations];
DELETE FROM [CouncilApprovals];
DELETE FROM [DisplacementCompensations];
DELETE FROM [BuildingAnnexes];
DELETE FROM [BuildingBasicData];
DELETE FROM [NetworkCosts];
DELETE FROM [LandCoordinates];
DELETE FROM [BuildingLocations];
DELETE FROM [Users];
DELETE FROM [RentalBuildings];
DELETE FROM [DisplacementRecords];
DELETE FROM [Buildings];
DELETE FROM [Lands];
DELETE FROM [SchoolAnnexes];
DELETE FROM [SchoolRoads];
DELETE FROM [SchoolSpaces];
DELETE FROM [StudyPeriods];
DELETE FROM [EducationalBuildings];
DELETE FROM [RentalStatusFlags];
DELETE FROM [Programs];
DELETE FROM [Menus];
DELETE FROM [Libraries];
GO

-- 1. Insert Libraries (المكتبات)
INSERT INTO [Libraries] ([Id], [Name], [Location], [Description], [IsActive], [CreatedAt])
VALUES 
    (NEWID(), 'المكتبة المركزية', 'الرياض - حي الملز', 'المكتبة الرئيسية للإدارة التعليمية', 1, GETUTCDATE()),
    (NEWID(), 'مكتبة الشرقية', 'الدمام - حي الفيصلية', 'مكتبة المنطقة الشرقية', 1, GETUTCDATE()),
    (NEWID(), 'مكتبة الغربية', 'جدة - حي الروضة', 'مكتبة المنطقة الغربية', 1, GETUTCDATE());
GO

-- 2. Insert Programs (البرامج)
INSERT INTO [Programs] ([Id], [Name], [Description], [IsActive], [CreatedAt])
VALUES 
    (NEWID(), 'برنامج إدارة المباني', 'إدارة وصيانة المباني التعليمية', 1, GETUTCDATE()),
    (NEWID(), 'برنامج الأراضي', 'إدارة الأراضي والعقارات', 1, GETUTCDATE()),
    (NEWID(), 'برنامج الإيجارات', 'إدارة المباني المستأجرة', 1, GETUTCDATE());
GO

-- 3. Insert Menus (القوائم)
INSERT INTO [Menus] ([Id], [Name], [Description], [IsActive], [CreatedAt])
VALUES 
    (NEWID(), 'القائمة الرئيسية', 'قائمة الوصول الكامل', 1, GETUTCDATE()),
    (NEWID(), 'قائمة الاستعلامات', 'قائمة الاستعلام فقط', 1, GETUTCDATE()),
    (NEWID(), 'قائمة التقارير', 'قائمة إنشاء التقارير', 1, GETUTCDATE());
GO

-- 4. Insert Rental Status Flags (حالات الإيجار)
INSERT INTO [RentalStatusFlags] ([Id], [Code], [Label], [Category], [IsActive], [CreatedAt])
VALUES 
    (NEWID(), 'ACTIVE', 'نشط', 'حالة المبنى', 1, GETUTCDATE()),
    (NEWID(), 'PENDING', 'قيد الانتظار', 'حالة المبنى', 1, GETUTCDATE()),
    (NEWID(), 'EXPIRED', 'منتهي', 'حالة المبنى', 1, GETUTCDATE()),
    (NEWID(), 'MAINTENANCE', 'قيد الصيانة', 'حالة المبنى', 1, GETUTCDATE());
GO

-- 5. Insert Educational Buildings and all related data in single transaction
DECLARE @EduBuilding1 UNIQUEIDENTIFIER = NEWID();
DECLARE @EduBuilding2 UNIQUEIDENTIFIER = NEWID();
DECLARE @EduBuilding3 UNIQUEIDENTIFIER = NEWID();
DECLARE @EduBuilding4 UNIQUEIDENTIFIER = NEWID();
DECLARE @EduBuilding5 UNIQUEIDENTIFIER = NEWID();
DECLARE @Land1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Land2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Land3 UNIQUEIDENTIFIER = NEWID();
DECLARE @Building1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Building2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Building3 UNIQUEIDENTIFIER = NEWID();
DECLARE @StatusActive UNIQUEIDENTIFIER;
DECLARE @StatusPending UNIQUEIDENTIFIER;
DECLARE @Rental1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Rental2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Rental3 UNIQUEIDENTIFIER = NEWID();
DECLARE @Displacement1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Displacement2 UNIQUEIDENTIFIER = NEWID();
DECLARE @ProgramId UNIQUEIDENTIFIER;
DECLARE @MenuId UNIQUEIDENTIFIER;
DECLARE @LibraryId UNIQUEIDENTIFIER;

-- Get status flag IDs
SELECT @StatusActive = Id FROM RentalStatusFlags WHERE Code = 'ACTIVE';
SELECT @StatusPending = Id FROM RentalStatusFlags WHERE Code = 'PENDING';

-- Get authentication IDs
SELECT TOP 1 @ProgramId = Id FROM Programs WHERE Name LIKE '%إدارة المباني%';
SELECT TOP 1 @MenuId = Id FROM Menus WHERE Name LIKE '%القائمة الرئيسية%';
SELECT TOP 1 @LibraryId = Id FROM Libraries WHERE Name LIKE '%المكتبة المركزية%';

-- Insert Educational Buildings (المباني التعليمية - المركز الرئيسي)
INSERT INTO [EducationalBuildings] ([Id], [BuildingCode], [BuildingName], [EducationType], [BuildingStatus], 
    [TotalArea], [NumberOfClassrooms], [NumberOfLabs], [HasLibrary], [HasGym], [HasCafeteria], 
    [ConstructionYear], [LastRenovationYear], [CreatedAt], [UpdatedAt])
VALUES 
    (@EduBuilding1, 'EDU-001', 'مدرسة النور الابتدائية', 'ابتدائي', 'نشط', 2500.00, 20, 2, 1, 1, 1, 2015, 2022, GETUTCDATE(), GETUTCDATE()),
    (@EduBuilding2, 'EDU-002', 'مدرسة الأمل المتوسطة', 'متوسط', 'نشط', 3000.00, 24, 3, 1, 1, 1, 2018, NULL, GETUTCDATE(), GETUTCDATE()),
    (@EduBuilding3, 'EDU-003', 'مدرسة الفيصلية الثانوية', 'ثانوي', 'نشط', 3500.00, 30, 5, 1, 1, 1, 2020, NULL, GETUTCDATE(), GETUTCDATE()),
    (@EduBuilding4, 'EDU-004', 'مدرسة الروضة الأولى', 'روضة', 'قيد الصيانة', 1500.00, 10, 0, 0, 0, 1, 2010, 2021, GETUTCDATE(), GETUTCDATE()),
    (@EduBuilding5, 'EDU-005', 'مدرسة الإبداع الابتدائية', 'ابتدائي', 'نشط', 2800.00, 22, 2, 1, 1, 1, 2019, NULL, GETUTCDATE(), GETUTCDATE());

-- 6. Insert Study Periods (الفترات الدراسية)
INSERT INTO [StudyPeriods] ([Id], [EducationalBuildingId], [BuildingCode], [SchoolName], [Period], 
    [StudentCount], [ClassroomCount], [TeacherCount], [EducationalLevel], [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), @EduBuilding1, 'EDU-001', 'مدرسة النور الابتدائية', 'الفترة الصباحية', 450, 20, 35, 'ابتدائي', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding1, 'EDU-001', 'مدرسة النور الابتدائية', 'الفترة المسائية', 380, 18, 28, 'ابتدائي', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding2, 'EDU-002', 'مدرسة الأمل المتوسطة', 'الفترة الصباحية', 520, 24, 42, 'متوسط', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding3, 'EDU-003', 'مدرسة الفيصلية الثانوية', 'الفترة الصباحية', 600, 30, 50, 'ثانوي', GETUTCDATE(), GETUTCDATE()),
        (NEWID(), @EduBuilding5, 'EDU-005', 'مدرسة الإبداع الابتدائية', 'الفترة الصباحية', 480, 22, 38, 'ابتدائي', GETUTCDATE(), GETUTCDATE());

-- 7. Insert School Roads (طرق المدرسة)

-- 7. Insert School Roads (طرق المدرسة)
INSERT INTO [SchoolRoads] ([Id], [EducationalBuildingId], [BuildingId], [Direction], [RoadName], 
    [RoadWidth], [RoadType], [Condition], [CreatedAt])
VALUES 
    (NEWID(), @EduBuilding1, 'EDU-001', 'شمال', 'طريق الملك فهد', 20.00, 'رئيسي', 'جيد', GETUTCDATE()),
    (NEWID(), @EduBuilding1, 'EDU-001', 'جنوب', 'شارع العليا', 15.00, 'فرعي', 'جيد', GETUTCDATE()),
    (NEWID(), @EduBuilding2, 'EDU-002', 'شرق', 'طريق الأمير سلطان', 25.00, 'رئيسي', 'ممتاز', GETUTCDATE()),
    (NEWID(), @EduBuilding3, 'EDU-003', 'غرب', 'شارع التحلية', 18.00, 'فرعي', 'جيد', GETUTCDATE()),
    (NEWID(), @EduBuilding5, 'EDU-005', 'شمال', 'طريق المدينة المنورة', 22.00, 'رئيسي', 'جيد', GETUTCDATE());

-- 8. Insert School Annexes (ملاحق المدرسة)
INSERT INTO [SchoolAnnexes] ([Id], [EducationalBuildingId], [BuildingId], [AnnexType], [Area], 
    [Capacity], [Condition], [Purpose], [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), @EduBuilding1, 'EDU-001', 'مبنى إداري', 250.00, 20, 'جيد', 'الإدارة والمكاتب', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding1, 'EDU-001', 'صالة رياضية', 400.00, 100, 'ممتاز', 'الأنشطة الرياضية', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding2, 'EDU-002', 'مختبر علوم', 180.00, 30, 'جيد', 'التجارب العلمية', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding3, 'EDU-003', 'مكتبة', 300.00, 50, 'ممتاز', 'المطالعة والبحث', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding5, 'EDU-005', 'قاعة متعددة الأغراض', 350.00, 150, 'جيد', 'الفعاليات والاجتماعات', GETUTCDATE(), GETUTCDATE());

-- 9. Insert School Spaces (الفراغات المدرسية)
INSERT INTO [SchoolSpaces] ([Id], [EducationalBuildingId], [BuildingId], [SpaceType], [Area], 
    [Quantity], [Condition], [Usage], [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), @EduBuilding1, 'EDU-001', 'فصول دراسية', 80.00, 20, 'جيد', 'التدريس', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding1, 'EDU-001', 'مختبرات', 100.00, 2, 'جيد', 'التجارب العملية', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding2, 'EDU-002', 'فصول دراسية', 85.00, 24, 'ممتاز', 'التدريس', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding3, 'EDU-003', 'قاعات محاضرات', 120.00, 6, 'جيد', 'المحاضرات', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding5, 'EDU-005', 'فصول دراسية', 82.00, 22, 'جيد', 'التدريس', GETUTCDATE(), GETUTCDATE());

-- 10. Insert Lands (الأراضي)

INSERT INTO [Lands] ([Id], [ReferenceNumber], [UsageStatus], [Headquarters], [ApprovalStatus], 
    [IdentificationNumber], [CenterDepartment], [TotalArea], [Phase], [Approval], [EducationalBuildingId],
    [Village], [CurrentOwner], [OriginalOwner], [CreatedAt], [UpdatedAt])
VALUES 
    (@Land1, 'LAND-2024-001', 'مستخدم', 'إدارة التعليم بالرياض', 'معتمد', 'ID-001-2024', 'قسم الأراضي', 5000.00, 
     'المرحلة الأولى', 'موافقة رقم 12345', @EduBuilding1, 'حي الملز', 'وزارة التعليم', 'وزارة التعليم', GETUTCDATE(), GETUTCDATE()),
    (@Land2, 'LAND-2024-002', 'غير مستخدم', 'إدارة التعليم بجدة', 'قيد المراجعة', 'ID-002-2024', 'قسم الأراضي', 6500.00, 
     'المرحلة الثانية', 'قيد الانتظار', @EduBuilding2, 'حي الروضة', 'وزارة التعليم', 'وزارة التعليم', GETUTCDATE(), GETUTCDATE()),
    (@Land3, 'LAND-2024-003', 'مستخدم', 'إدارة التعليم بالدمام', 'معتمد', 'ID-003-2024', 'قسم الأراضي', 7000.00, 
     'المرحلة الأولى', 'موافقة رقم 54321', @EduBuilding3, 'حي الفيصلية', 'وزارة التعليم', 'وزارة التعليم', GETUTCDATE(), GETUTCDATE());

-- 11. Insert Land Coordinates (إحداثيات الأراضي)
INSERT INTO [LandCoordinates] ([Id], [LandId], [PointNumber], [Latitude], [Longitude], [Elevation], [CreatedAt])
VALUES 
    (NEWID(), @Land1, 1, 24.71270000, 46.67520000, 612.50, GETUTCDATE()),
    (NEWID(), @Land1, 2, 24.71280000, 46.67530000, 613.00, GETUTCDATE()),
    (NEWID(), @Land1, 3, 24.71290000, 46.67520000, 612.75, GETUTCDATE()),
    (NEWID(), @Land2, 1, 21.54230000, 39.17210000, 12.50, GETUTCDATE()),
    (NEWID(), @Land2, 2, 21.54240000, 39.17220000, 13.00, GETUTCDATE()),
    (NEWID(), @Land3, 1, 26.42640000, 50.08890000, 5.50, GETUTCDATE()),
    (NEWID(), @Land3, 2, 26.42650000, 50.08900000, 6.00, GETUTCDATE());

-- 12. Insert Building Locations (مواقع المباني على الأراضي)
INSERT INTO [BuildingLocations] ([Id], [LandId], [Code], [LocationName], [Coordinates], [Status], [RequiredStatus], [CreatedAt])
VALUES 
    (NEWID(), @Land1, 'LOC-001', 'الموقع الشمالي الشرقي', 1, 'متاح', 'قيد الإنشاء', GETUTCDATE()),
    (NEWID(), @Land1, 'LOC-002', 'الموقع الجنوبي الغربي', 2, 'محجوز', 'معتمد', GETUTCDATE()),
    (NEWID(), @Land2, 'LOC-003', 'الموقع المركزي', 1, 'متاح', 'قيد الدراسة', GETUTCDATE()),
    (NEWID(), @Land3, 'LOC-004', 'الموقع الشرقي', 1, 'محجوز', 'معتمد', GETUTCDATE());

-- 13. Insert Buildings (المباني)

INSERT INTO [Buildings] ([Id], [BuildingNumber], [SchoolName], [UsageStatus], [Affiliation], [BuildingOwnership], 
    [Governorate], [RegionalCenter], [EducationalAdministration], [District], [Neighborhood], [Stage], [EducationType], 
    [EducationalBuildingId], [CreatedAt], [UpdatedAt])
VALUES 
    (@Building1, 'BLD-001', 'مدرسة النور الابتدائية', 'نشط', 'وزارة التعليم', 'حكومي', 'الرياض', 'مركز الرياض', 
     'إدارة تعليم الرياض', 'منطقة الرياض', 'حي الملز', 'ابتدائي', 'تعليم عام', @EduBuilding1, GETUTCDATE(), GETUTCDATE()),
    (@Building2, 'BLD-002', 'مدرسة الأمل المتوسطة', 'نشط', 'وزارة التعليم', 'حكومي', 'الرياض', 'مركز الرياض', 
     'إدارة تعليم الرياض', 'منطقة الرياض', 'حي النخيل', 'متوسط', 'تعليم عام', @EduBuilding2, GETUTCDATE(), GETUTCDATE()),
    (@Building3, 'BLD-003', 'مدرسة الفيصلية الثانوية', 'نشط', 'وزارة التعليم', 'حكومي', 'المنطقة الشرقية', 'مركز الدمام', 
     'إدارة تعليم الشرقية', 'المنطقة الشرقية', 'حي الفيصلية', 'ثانوي', 'تعليم عام', @EduBuilding3, GETUTCDATE(), GETUTCDATE());

-- 14. Insert Building Basic Data (البيانات الأساسية للمبنى)
INSERT INTO [BuildingBasicData] ([Id], [BuildingId], [BuildingNumber], [SchoolName], [BuildingName], [LandArea], 
    [BuiltArea], [Floors], [ConstructionYear], [LastMaintenanceYear], [BuildingCondition], [OwnershipType], 
    [RentalStatus], [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), @Building1, 'BLD-001', 'مدرسة النور الابتدائية', 'مبنى رئيسي', 2500.00, 1800.00, 2, 2015, 2022, 
     'جيد', 'ملك', 'غير مؤجر', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Building2, 'BLD-002', 'مدرسة الأمل المتوسطة', 'مبنى رئيسي', 3000.00, 2200.00, 3, 2018, NULL, 
     'ممتاز', 'ملك', 'غير مؤجر', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Building3, 'BLD-003', 'مدرسة الفيصلية الثانوية', 'مبنى رئيسي', 3500.00, 2800.00, 3, 2020, NULL, 
     'ممتاز', 'ملك', 'غير مؤجر', GETUTCDATE(), GETUTCDATE());

-- 15. Insert Building Annexes (ملحقات المبنى)
INSERT INTO [BuildingAnnexes] ([Id], [BuildingId], [AnnexType], [Area], [ConstructionYear], [Condition], [Purpose], [CreatedAt])
VALUES 
    (NEWID(), @Building1, 'سور خارجي', 500.00, 2015, 'جيد', 'السلامة والأمن', GETUTCDATE()),
    (NEWID(), @Building1, 'ساحة خارجية', 800.00, 2015, 'جيد', 'الأنشطة الخارجية', GETUTCDATE()),
    (NEWID(), @Building2, 'مظلات خارجية', 300.00, 2018, 'ممتاز', 'الحماية من الشمس', GETUTCDATE()),
    (NEWID(), @Building3, 'موقف سيارات', 600.00, 2020, 'ممتاز', 'مواقف السيارات', GETUTCDATE());

-- 16. Insert Network Costs (تكاليف الشبكات)
INSERT INTO [NetworkCosts] ([Id], [BuildingId], [NetworkType], [InstallationCost], [MaintenanceCost], 
    [InstallationDate], [Provider], [ContractNumber], [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), @Building1, 'كهرباء', 150000.00, 5000.00, '2015-03-15', 'شركة الكهرباء السعودية', 'ELEC-2015-001', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Building1, 'مياه', 80000.00, 3000.00, '2015-03-20', 'شركة المياه الوطنية', 'WATER-2015-001', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Building2, 'كهرباء', 180000.00, 6000.00, '2018-05-10', 'شركة الكهرباء السعودية', 'ELEC-2018-002', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Building3, 'إنترنت', 50000.00, 4000.00, '2020-08-01', 'شركة الاتصالات السعودية', 'NET-2020-003', GETUTCDATE(), GETUTCDATE());

-- 17. Insert Rental Buildings (المباني المستأجرة)

INSERT INTO [RentalBuildings] ([Id], [IdentificationNumber], [Name], [StatusFlagId], [Status], [Substatus], [Tenant], 
    [Location], [MonthlyRent], [ContractStartDate], [ContractEndDate], [BuildingType], [TotalArea], [UsableArea], 
    [NumberOfRooms], [NumberOfFloors], [YearBuilt], [LastInspectionDate], [InspectionStatus], [MaintenanceRequired], 
    [EducationalBuildingId], [CreatedAt], [UpdatedAt])
VALUES 
    (@Rental1, 'RB-2024-001', 'مبنى إداري مستأجر - حي الملز', @StatusActive, 'نشط', 'ساري', 'إدارة التعليم', 
     'الرياض - حي الملز - شارع الملك فهد', 25000.00, '2024-01-01', '2025-12-31', 'إداري', 500.00, 450.00, 
     10, 2, 2018, '2024-09-01', 'جيد', 0, @EduBuilding1, GETUTCDATE(), GETUTCDATE()),
    (@Rental2, 'RB-2024-002', 'مبنى تعليمي مستأجر - حي النخيل', @StatusActive, 'نشط', 'ساري', 'إدارة التعليم', 
     'الرياض - حي النخيل - شارع العليا', 35000.00, '2024-02-01', '2026-01-31', 'تعليمي', 800.00, 750.00, 
     15, 3, 2019, '2024-08-15', 'ممتاز', 0, @EduBuilding2, GETUTCDATE(), GETUTCDATE()),
    (@Rental3, 'RB-2024-003', 'مبنى مستأجر - حي الروضة', @StatusPending, 'قيد المراجعة', 'تجديد', 'إدارة التعليم', 
     'جدة - حي الروضة - طريق المدينة', 30000.00, '2023-06-01', '2024-05-31', 'مختلط', 600.00, 550.00, 
     12, 2, 2020, '2024-04-20', 'جيد', 1, @EduBuilding4, GETUTCDATE(), GETUTCDATE());

-- 18. Insert Rental Building Locations (مواقع المباني المستأجرة)
INSERT INTO [RentalBuildingLocations] ([Id], [BuildingId], [Governorate], [City], [District], [Neighborhood], 
    [Street], [BuildingNumber], [PostalCode], [Latitude], [Longitude], [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), @Rental1, 'منطقة الرياض', 'الرياض', 'وسط الرياض', 'حي الملز', 'شارع الملك فهد', '1234', '12345', 
     24.71270000, 46.67520000, GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Rental2, 'منطقة الرياض', 'الرياض', 'شمال الرياض', 'حي النخيل', 'شارع العليا', '5678', '12346', 
     24.75000000, 46.68000000, GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Rental3, 'منطقة مكة المكرمة', 'جدة', 'شمال جدة', 'حي الروضة', 'طريق المدينة', '9012', '23456', 
     21.54230000, 39.17210000, GETUTCDATE(), GETUTCDATE());

-- 19. Insert Rental Decisions (قرارات الإيجار)
INSERT INTO [RentalDecisions] ([Id], [BuildingId], [DecisionNumber], [DecisionDate], [DecisionType], 
    [ApprovedBy], [Notes], [CreatedAt])
VALUES 
    (NEWID(), @Rental1, 'DEC-2024-001', '2024-01-01', 'عقد إيجار جديد', 'مدير إدارة التعليم', 
     'تم الموافقة على استئجار المبنى لمدة عامين', GETUTCDATE()),
    (NEWID(), @Rental2, 'DEC-2024-002', '2024-02-01', 'عقد إيجار جديد', 'مدير إدارة التعليم', 
     'تم الموافقة على استئجار المبنى التعليمي', GETUTCDATE()),
    (NEWID(), @Rental3, 'DEC-2023-015', '2023-06-01', 'تجديد عقد', 'مدير إدارة التعليم', 
     'تجديد العقد تحت المراجعة', GETUTCDATE());

-- 20. Insert Displacement Records (سجلات الإحلال)

INSERT INTO [DisplacementRecords] ([Id], [ReferenceNumber], [BuildingCode], [DisplacementType], [Status], 
    [RequestDate], [ApprovalDate], [CompletionDate], [Reason], [Notes], [EducationalBuildingId], [CreatedAt], [UpdatedAt])
VALUES 
    (@Displacement1, 'DISP-2024-001', 'EDU-001', 'إحلال كامل', 'معتمد', '2024-03-01', '2024-04-15', NULL, 
     'البنية التحتية القديمة تحتاج إلى إحلال', 'مشروع إحلال شامل للمبنى', @EduBuilding1, GETUTCDATE(), GETUTCDATE()),
    (@Displacement2, 'DISP-2024-002', 'EDU-004', 'صيانة وترميم', 'قيد التنفيذ', '2024-05-10', '2024-06-20', NULL, 
     'أعمال صيانة دورية', 'صيانة المرافق والفصول الدراسية', @EduBuilding4, GETUTCDATE(), GETUTCDATE());

-- 21. Insert Displacement Compensations (التعويضات)
INSERT INTO [DisplacementCompensations] ([Id], [DisplacementId], [CompensationType], [Amount], [PaymentDate], 
    [PaymentStatus], [PaymentMethod], [Notes], [CreatedAt])
VALUES 
    (NEWID(), @Displacement1, 'تعويض مالي', 500000.00, '2024-05-01', 'مدفوع', 'تحويل بنكي', 
     'دفعة أولى من التعويض', GETUTCDATE()),
    (NEWID(), @Displacement1, 'تعويض إضافي', 200000.00, NULL, 'قيد الانتظار', 'تحويل بنكي', 
     'دفعة ثانية بعد اكتمال المشروع', GETUTCDATE()),
    (NEWID(), @Displacement2, 'تعويض صيانة', 150000.00, '2024-07-01', 'مدفوع', 'شيك', 
     'تعويض أعمال الصيانة', GETUTCDATE());

-- 22. Insert Council Approvals (موافقات المجلس)
INSERT INTO [CouncilApprovals] ([Id], [DisplacementId], [CouncilName], [ApprovalNumber], [ApprovalDate], 
    [ApprovalStatus], [DecisionDetails], [CreatedAt])
VALUES 
    (NEWID(), @Displacement1, 'مجلس إدارة التعليم', 'APP-2024-001', '2024-04-15', 'معتمد', 
     'تمت الموافقة على مشروع الإحلال بالإجماع', GETUTCDATE()),
    (NEWID(), @Displacement1, 'اللجنة المالية', 'APP-2024-002', '2024-04-20', 'معتمد', 
     'تمت الموافقة على الميزانية المقترحة', GETUTCDATE()),
    (NEWID(), @Displacement2, 'لجنة الصيانة', 'APP-2024-010', '2024-06-20', 'معتمد', 
     'الموافقة على خطة الصيانة والترميم', GETUTCDATE());

-- 23. Insert Users (المستخدمون)
-- Password hash for "password123" using SHA256

INSERT INTO [Users] ([Id], [Username], [PasswordHash], [Email], [FullName], [Role], [IsActive], 
    [LastLoginDate], [ProgramId], [MenuId], [LibraryId], [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), 'admin', 'EF92B778BAFE771E89245B89ECBC08A44A4E166C06659911881F383D4473E94F', 
     'admin@education.gov.sa', 'أحمد محمد العلي', 'Admin', 1, NULL, @ProgramId, @MenuId, @LibraryId, 
     GETUTCDATE(), GETUTCDATE()),
    (NEWID(), 'manager', 'EF92B778BAFE771E89245B89ECBC08A44A4E166C06659911881F383D4473E94F', 
     'manager@education.gov.sa', 'فاطمة أحمد السعيد', 'Manager', 1, NULL, @ProgramId, @MenuId, @LibraryId, 
     GETUTCDATE(), GETUTCDATE()),
    (NEWID(), 'user1', 'EF92B778BAFE771E89245B89ECBC08A44A4E166C06659911881F383D4473E94F', 
     'user1@education.gov.sa', 'خالد عبدالله الحربي', 'User', 1, NULL, @ProgramId, @MenuId, @LibraryId, 
     GETUTCDATE(), GETUTCDATE());
GO

-- Display summary of inserted data
SELECT 'EducationalBuildings' AS TableName, COUNT(*) AS RecordCount FROM EducationalBuildings
UNION ALL SELECT 'StudyPeriods', COUNT(*) FROM StudyPeriods
UNION ALL SELECT 'SchoolRoads', COUNT(*) FROM SchoolRoads
UNION ALL SELECT 'SchoolAnnexes', COUNT(*) FROM SchoolAnnexes
UNION ALL SELECT 'SchoolSpaces', COUNT(*) FROM SchoolSpaces
UNION ALL SELECT 'Lands', COUNT(*) FROM Lands
UNION ALL SELECT 'LandCoordinates', COUNT(*) FROM LandCoordinates
UNION ALL SELECT 'BuildingLocations', COUNT(*) FROM BuildingLocations
UNION ALL SELECT 'Buildings', COUNT(*) FROM Buildings
UNION ALL SELECT 'BuildingBasicData', COUNT(*) FROM BuildingBasicData
UNION ALL SELECT 'BuildingAnnexes', COUNT(*) FROM BuildingAnnexes
UNION ALL SELECT 'NetworkCosts', COUNT(*) FROM NetworkCosts
UNION ALL SELECT 'RentalBuildings', COUNT(*) FROM RentalBuildings
UNION ALL SELECT 'RentalBuildingLocations', COUNT(*) FROM RentalBuildingLocations
UNION ALL SELECT 'RentalDecisions', COUNT(*) FROM RentalDecisions
UNION ALL SELECT 'RentalStatusFlags', COUNT(*) FROM RentalStatusFlags
UNION ALL SELECT 'DisplacementRecords', COUNT(*) FROM DisplacementRecords
UNION ALL SELECT 'DisplacementCompensations', COUNT(*) FROM DisplacementCompensations
UNION ALL SELECT 'CouncilApprovals', COUNT(*) FROM CouncilApprovals
UNION ALL SELECT 'Users', COUNT(*) FROM Users
UNION ALL SELECT 'Programs', COUNT(*) FROM Programs
UNION ALL SELECT 'Menus', COUNT(*) FROM Menus
UNION ALL SELECT 'Libraries', COUNT(*) FROM Libraries
ORDER BY TableName;

PRINT 'Database populated successfully with dummy data!';
PRINT 'Default login credentials:';
PRINT 'Username: admin, Password: password123';
PRINT 'Username: manager, Password: password123';
PRINT 'Username: user1, Password: password123';
GO
