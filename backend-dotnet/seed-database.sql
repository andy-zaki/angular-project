-- SQL Script to Populate AngularProjectDB with Dummy Data
-- NOTE: Save this file as UTF-8 (with BOM). For correct Arabic rendering in sqlcmd:
--   1) In PowerShell: chcp 65001
--   2) Run: sqlcmd -S <server> -d AngularProjectDB -i seed-database.sql -u
--      (Optionally add -f 65001 if your sqlcmd version needs explicit input codepage)
-- Server: ANDREW-SAMY\MSSQLSERVER2
-- Database: AngularProjectDB
-- Execute this script after database creation

USE AngularProjectDB;
GO

-- Ensure Unicode-friendly session behavior for Arabic text
SET NOCOUNT ON;
SET LANGUAGE Arabic;

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
    (NEWID(), N'المكتبة المركزية', N'القاهرة - حي الزمالك', N'المكتبة الرئيسية للإدارة التعليمية', 1, GETUTCDATE()),
    (NEWID(), N'مكتبة الإسكندرية', N'الإسكندرية - حي الرمل', N'مكتبة محافظة الإسكندرية', 1, GETUTCDATE()),
    (NEWID(), N'مكتبة الجيزة', N'الجيزة - حي الهرم', N'مكتبة محافظة الجيزة', 1, GETUTCDATE());
GO

-- 2. Insert Programs (البرامج)
INSERT INTO [Programs] ([Id], [Name], [Description], [IsActive], [CreatedAt])
VALUES 
    (NEWID(), N'برنامج إدارة المباني', N'إدارة وصيانة المباني التعليمية', 1, GETUTCDATE()),
    (NEWID(), N'برنامج الأراضي', N'إدارة الأراضي والعقارات', 1, GETUTCDATE()),
    (NEWID(), N'برنامج الإيجارات', N'إدارة المباني المستأجرة', 1, GETUTCDATE());
GO

-- 3. Insert Menus (القوائم)
INSERT INTO [Menus] ([Id], [Name], [Description], [IsActive], [CreatedAt])
VALUES 
    (NEWID(), N'القائمة الرئيسية', N'قائمة الوصول الكامل', 1, GETUTCDATE()),
    (NEWID(), N'قائمة الاستعلامات', N'قائمة الاستعلام فقط', 1, GETUTCDATE()),
    (NEWID(), N'قائمة التقارير', N'قائمة إنشاء التقارير', 1, GETUTCDATE());
GO

-- 4. Insert Rental Status Flags (حالات الإيجار)
INSERT INTO [RentalStatusFlags] ([Id], [Code], [Label], [Category], [IsActive], [CreatedAt])
VALUES 
    (NEWID(), N'ACTIVE', N'نشط', N'حالة المبنى', 1, GETUTCDATE()),
    (NEWID(), N'PENDING', N'قيد الانتظار', N'حالة المبنى', 1, GETUTCDATE()),
    (NEWID(), N'EXPIRED', N'منتهي', N'حالة المبنى', 1, GETUTCDATE()),
    (NEWID(), N'MAINTENANCE', N'قيد الصيانة', N'حالة المبنى', 1, GETUTCDATE());
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
SELECT @StatusActive = Id FROM RentalStatusFlags WHERE Code = N'ACTIVE';
SELECT @StatusPending = Id FROM RentalStatusFlags WHERE Code = N'PENDING';
SELECT @StatusPending = Id FROM RentalStatusFlags WHERE Code = N'PENDING';

-- Get authentication IDs
SELECT TOP 1 @ProgramId = Id FROM Programs WHERE Name LIKE '%إدارة المباني%';
SELECT TOP 1 @MenuId = Id FROM Menus WHERE Name LIKE '%القائمة الرئيسية%';
SELECT TOP 1 @LibraryId = Id FROM Libraries WHERE Name LIKE '%المكتبة المركزية%';

-- Insert Educational Buildings (المباني التعليمية - المركز الرئيسي)
INSERT INTO [EducationalBuildings] ([Id], [BuildingCode], [BuildingName], [EducationType], [BuildingStatus], 
    [TotalArea], [NumberOfClassrooms], [NumberOfLabs], [HasLibrary], [HasGym], [HasCafeteria], 
    [ConstructionYear], [LastRenovationYear], [CreatedAt], [UpdatedAt])
VALUES 
    (@EduBuilding1, N'101234', N'مدرسة النيل الابتدائية', N'ابتدائي', N'نشط', 2500.00, 20, 2, 1, 1, 1, 2015, 2022, GETUTCDATE(), GETUTCDATE()),
    (@EduBuilding2, N'102456', N'مدرسة التحرير الإعدادية', N'إعدادي', N'نشط', 3000.00, 24, 3, 1, 1, 1, 2018, NULL, GETUTCDATE(), GETUTCDATE()),
    (@EduBuilding3, N'103789', N'مدرسة المنار الثانوية', N'ثانوي', N'نشط', 3500.00, 30, 5, 1, 1, 1, 2020, NULL, GETUTCDATE(), GETUTCDATE()),
    (@EduBuilding4, N'104512', N'مدرسة الورد الأولى', N'روضة', N'قيد الصيانة', 1500.00, 10, 0, 0, 0, 1, 2010, 2021, GETUTCDATE(), GETUTCDATE()),
    (@EduBuilding5, N'105678', N'مدرسة الشروق الابتدائية', N'ابتدائي', N'نشط', 2800.00, 22, 2, 1, 1, 1, 2019, NULL, GETUTCDATE(), GETUTCDATE());

-- 6. Insert Study Periods (الفترات الدراسية)
INSERT INTO [StudyPeriods] ([Id], [EducationalBuildingId], [BuildingCode], [SchoolName], [Period], 
    [StudentCount], [ClassroomCount], [TeacherCount], [EducationalLevel], [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), @EduBuilding1, N'101234', N'مدرسة النيل الابتدائية', N'الفترة الصباحية', 450, 20, 35, N'ابتدائي', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding1, N'101234', N'مدرسة النيل الابتدائية', N'الفترة المسائية', 380, 18, 28, N'ابتدائي', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding2, N'102456', N'مدرسة التحرير الإعدادية', N'الفترة الصباحية', 520, 24, 42, N'إعدادي', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding3, N'103789', N'مدرسة المنار الثانوية', N'الفترة الصباحية', 600, 30, 50, N'ثانوي', GETUTCDATE(), GETUTCDATE()),
        (NEWID(), @EduBuilding5, N'105678', N'مدرسة الشروق الابتدائية', N'الفترة الصباحية', 480, 22, 38, N'ابتدائي', GETUTCDATE(), GETUTCDATE());

-- 7. Insert School Roads (طرق المدرسة)

-- 7. Insert School Roads (طرق المدرسة)
INSERT INTO [SchoolRoads] ([Id], [EducationalBuildingId], [BuildingId], [Direction], [RoadName], 
    [RoadWidth], [RoadType], [Condition], [CreatedAt])
VALUES 
    (NEWID(), @EduBuilding1, N'101234', N'شمال', N'طريق النيل', 20.00, N'رئيسي', N'جيد', GETUTCDATE()),
    (NEWID(), @EduBuilding1, N'101234', N'جنوب', N'شارع النيل الجديد', 15.00, N'فرعي', N'جيد', GETUTCDATE()),
    (NEWID(), @EduBuilding2, N'102456', N'شرق', N'طريق التحرير', 25.00, N'رئيسي', N'ممتاز', GETUTCDATE()),
    (NEWID(), @EduBuilding3, N'103789', N'غرب', N'شارع الثورة', 18.00, N'فرعي', N'جيد', GETUTCDATE()),
    (NEWID(), @EduBuilding5, N'105678', N'شمال', N'طريق السادس من أكتوبر', 22.00, N'رئيسي', N'جيد', GETUTCDATE());

-- 8. Insert School Annexes (ملاحق المدرسة)
INSERT INTO [SchoolAnnexes] ([Id], [EducationalBuildingId], [BuildingId], [AnnexType], [Area], 
    [Capacity], [Condition], [Purpose], [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), @EduBuilding1, N'101234', N'مبنى إداري', 250.00, 20, N'جيد', N'الإدارة والمكاتب', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding1, N'101234', N'صالة رياضية', 400.00, 100, N'ممتاز', N'الأنشطة الرياضية', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding2, N'102456', N'مختبر علوم', 180.00, 30, N'جيد', N'التجارب العلمية', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding3, N'103789', N'مكتبة', 300.00, 50, N'ممتاز', N'المطالعة والبحث', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding5, N'105678', N'قاعة متعددة الأغراض', 350.00, 150, N'جيد', N'الفعاليات والاجتماعات', GETUTCDATE(), GETUTCDATE());

-- 9. Insert School Spaces (الفراغات المدرسية)
INSERT INTO [SchoolSpaces] ([Id], [EducationalBuildingId], [BuildingId], [SpaceType], [Area], 
    [Quantity], [Condition], [Usage], [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), @EduBuilding1, N'101234', N'فصول دراسية', 80.00, 20, N'جيد', N'التدريس', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding1, N'101234', N'مختبرات', 100.00, 2, N'جيد', N'التجارب العملية', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding2, N'102456', N'فصول دراسية', 85.00, 24, N'ممتاز', N'التدريس', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding3, N'103789', N'قاعات محاضرات', 120.00, 6, N'جيد', N'المحاضرات', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @EduBuilding5, N'105678', N'فصول دراسية', 82.00, 22, N'جيد', N'التدريس', GETUTCDATE(), GETUTCDATE());

-- 10. Insert Lands (الأراضي)

INSERT INTO [Lands] ([Id], [ReferenceNumber], [UsageStatus], [Headquarters], [ApprovalStatus], 
    [IdentificationNumber], [CenterDepartment], [TotalArea], [Phase], [Approval], [EducationalBuildingId],
    [Village], [CurrentOwner], [OriginalOwner], [LandCode], [Housing], [CommitteePricing], [PurchasePrice], 
    [SaleNegotiations], [Model], [Documents], [Plan], [BranchNotification], [RealEstateStatus],
    [BuildingBoundaries], [NetworkData], [NetworkObservations], [LandAreaFromTotal], [LandUseDatabase],
    [LandInspectionDatabase], [LandConstructionObstacles], [LandCreationObstacles], [LandConstructionData],
    [LandReceiptDatabase], [PaidAmountsDatabase], [DecisionData], [LandCommittees], [LandFacilities],
    [LandCoordinatesData], [EducationalStudies], [LandReviewCommittees], [CreatedAt], [UpdatedAt])
VALUES 
    -- مثال 1: أرض جاري الانشاء - ارض قضاء
    (@Land1, N'201234', N'جاري الانشاء', N'الرئيسي للهيئة', N'ارض قضاء', 
     N'132513', N'قسم عين شمس', 5000.00, 
     N'ثانوي عام', N'الارض معتمدة بالموافقة', @EduBuilding1, N'حي عين شمس', N'وزارة التعليم والتعليم الفني', N'وزارة التعليم والتعليم الفني', 
     N'301234', N'الارض مسكنة', N'2,500,000', N'2,500,000', N'مكتملة', N'نموذج A1', 
     N'صك ملكية، خرائط معتمدة', N'مخطط معتمد', N'تم إبلاغ الفرع', N'مسجل', N'غير موجود', N'موجود', 
     N'موجود', N'موجود', N'موجود', N'موجود', N'غير موجود',
     N'موجود', N'موجود', N'غير موجود', N'موجود', N'موجود', 
     N'موجود', N'موجود', N'موجود', N'موجود', N'موجود', GETUTCDATE(), GETUTCDATE()),
    -- مثال 2: أرض مستخدم - معتمد
    (@Land2, N'202456', N'مستخدم', N'إدارة التعليم بالإسكندرية', N'معتمد', N'284756', N'قسم الأراضي', 6500.00, 
     N'المرحلة الثانية', N'موافقة رقم 312456', @EduBuilding2, N'حي الرمل', N'وزارة التعليم والتعليم الفني', N'وزارة التعليم والتعليم الفني',
     N'302456', N'إسكان قيد الإنشاء', N'3,200,000', N'3,150,000', N'مكتملة', N'نموذج B2', 
     N'صك ملكية، خرائط معتمدة', N'مخطط معتمد', N'تم إبلاغ الفرع', N'مسجل', N'موجود', N'غير موجود', 
     N'موجود', N'موجود', N'موجود', N'غير موجود', N'موجود',
     N'موجود', N'غير موجود', N'موجود', N'موجود', N'موجود', 
     N'موجود', N'موجود', N'موجود', N'موجود', N'موجود', GETUTCDATE(), GETUTCDATE()),
    -- مثال 3: أرض مستخدم - ارض قضاء
    (@Land3, N'203789', N'مستخدم', N'إدارة التعليم بالجيزة', N'ارض قضاء', N'547821', N'قسم الأراضي', 7000.00, 
     N'المرحلة الأولى', N'موافقة رقم 312789', @EduBuilding3, N'حي الهرم', N'وزارة التعليم والتعليم الفني', N'وزارة التعليم والتعليم الفني',
     N'303789', N'إسكان متوفر', N'3,500,000', N'3,450,000', N'مكتملة', N'نموذج A2', 
     N'صك ملكية، خرائط معتمدة', N'مخطط معتمد', N'تم إبلاغ الفرع', N'مسجل', N'غير موجود', N'موجود', 
     N'موجود', N'موجود', N'غير موجود', N'موجود', N'موجود',
     N'موجود', N'موجود', N'موجود', N'موجود', N'موجود', 
     N'موجود', N'موجود', N'موجود', N'موجود', N'غير موجود', GETUTCDATE(), GETUTCDATE());

-- 11. Insert Land Coordinates (إحداثيات الأراضي)
INSERT INTO [LandCoordinates] ([Id], [LandId], [PointNumber], [Latitude], [Longitude], [Elevation], [CreatedAt])
VALUES 
    (NEWID(), @Land1, 1, 30.04420000, 31.23570000, 25.50, GETUTCDATE()),
    (NEWID(), @Land1, 2, 30.04430000, 31.23580000, 26.00, GETUTCDATE()),
    (NEWID(), @Land1, 3, 30.04440000, 31.23570000, 25.75, GETUTCDATE()),
    (NEWID(), @Land2, 1, 31.18530000, 29.95520000, 5.50, GETUTCDATE()),
    (NEWID(), @Land2, 2, 31.18540000, 29.95530000, 6.00, GETUTCDATE()),
    (NEWID(), @Land3, 1, 30.00790000, 31.20890000, 85.50, GETUTCDATE()),
    (NEWID(), @Land3, 2, 30.00800000, 31.20900000, 86.00, GETUTCDATE());

-- 12. Insert Building Locations (مواقع المباني على الأراضي - حدود وجوانب الأرض)
-- Land 1 Boundaries (مدرسة النيل الابتدائية - كود 201234)
INSERT INTO [BuildingLocations] ([Id], [LandId], [Code], [LocationName], [Coordinates], [Status], [RequiredStatus], [NeighborDescription], [CreatedAt])
VALUES 
    (NEWID(), @Land1, N'01', N'شمال', 35, N'يوجد', N'مطلوب', N'شارع النيل الرئيسي', GETUTCDATE()),
    (NEWID(), @Land1, N'02', N'شمال شرق', 42, N'يوجد', N'مطلوب', N'شارع النيل الفرعي', GETUTCDATE()),
    (NEWID(), @Land1, N'03', N'جنوب شرق', 38, N'يوجد', N'مطلوب', N'طريق التحرير', GETUTCDATE()),
    (NEWID(), @Land1, N'04', N'شمال غرب', 45, N'يوجد', N'مطلوب', N'شارع الزمالك', GETUTCDATE()),
    (NEWID(), @Land1, N'05', N'جنوب غرب', 40, N'يوجد', N'مطلوب', N'شارع النيل الجديد', GETUTCDATE()),
    (NEWID(), @Land1, N'06', N'جنوب', 48, N'يوجد', N'مطلوب', N'الطريق الساحلي', GETUTCDATE());
    
-- Land 2 Boundaries (مدرسة التحرير الإعدادية - كود 202456)
INSERT INTO [BuildingLocations] ([Id], [LandId], [Code], [LocationName], [Coordinates], [Status], [RequiredStatus], [NeighborDescription], [CreatedAt])
VALUES 
    (NEWID(), @Land2, N'01', N'شمال', 50, N'يوجد', N'مطلوب', N'شارع كورنيش الإسكندرية', GETUTCDATE()),
    (NEWID(), @Land2, N'02', N'شمال شرق', 55, N'يوجد', N'مطلوب', N'شارع الرمل', GETUTCDATE()),
    (NEWID(), @Land2, N'03', N'جنوب شرق', 52, N'يوجد', N'مطلوب', N'طريق الجيش', GETUTCDATE()),
    (NEWID(), @Land2, N'04', N'شمال غرب', 60, N'يوجد', N'مطلوب', N'شارع سعد زغلول', GETUTCDATE()),
    (NEWID(), @Land2, N'05', N'جنوب غرب', 58, N'يوجد', N'مطلوب', N'شارع الفاروقية', GETUTCDATE()),
    (NEWID(), @Land2, N'06', N'جنوب', 54, N'يوجد', N'مطلوب', N'الشارع الجديد', GETUTCDATE());

-- Land 3 Boundaries (مدرسة المنار الثانوية - كود 203789)
INSERT INTO [BuildingLocations] ([Id], [LandId], [Code], [LocationName], [Coordinates], [Status], [RequiredStatus], [NeighborDescription], [CreatedAt])
VALUES 
    (NEWID(), @Land3, N'01', N'شمال', 32, N'يوجد', N'مطلوب', N'شارع الهرم الرئيسي', GETUTCDATE()),
    (NEWID(), @Land3, N'02', N'شمال شرق', 28, N'يوجد', N'مطلوب', N'شارع السادس من أكتوبر', GETUTCDATE()),
    (NEWID(), @Land3, N'03', N'جنوب شرق', 36, N'يوجد', N'مطلوب', N'طريق الأهرام', GETUTCDATE()),
    (NEWID(), @Land3, N'04', N'شمال غرب', 30, N'يوجد', N'مطلوب', N'شارع النيل الأوسط', GETUTCDATE()),
    (NEWID(), @Land3, N'05', N'جنوب غرب', 34, N'يوجد', N'مطلوب', N'شارع الجيزة', GETUTCDATE()),
    (NEWID(), @Land3, N'06', N'جنوب', 26, N'يوجد', N'مطلوب', N'الطريق الزراعي', GETUTCDATE());

-- 13. Insert Buildings (المباني)

INSERT INTO [Buildings] ([Id], [BuildingNumber], [SchoolName], [UsageStatus], [Affiliation], [BuildingOwnership], 
    [Governorate], [RegionalCenter], [EducationalAdministration], [District], [Neighborhood], [Stage], [EducationType], 
    [EducationalBuildingId], [CreatedAt], [UpdatedAt])
VALUES 
    (@Building1, N'601234', N'مدرسة النيل الابتدائية', N'نشط', N'وزارة التعليم والتعليم الفني', N'حكومي', N'محافظة القاهرة', N'مركز القاهرة', 
     N'إدارة تعليم القاهرة', N'منطقة القاهرة', N'حي الزمالك', N'ابتدائي', N'تعليم عام', @EduBuilding1, GETUTCDATE(), GETUTCDATE()),
    (@Building2, N'602456', N'مدرسة التحرير الإعدادية', N'نشط', N'وزارة التعليم والتعليم الفني', N'حكومي', N'محافظة القاهرة', N'مركز القاهرة', 
     N'إدارة تعليم القاهرة', N'منطقة القاهرة', N'حي النيل', N'إعدادي', N'تعليم عام', @EduBuilding2, GETUTCDATE(), GETUTCDATE()),
    (@Building3, N'603789', N'مدرسة المنار الثانوية', N'نشط', N'وزارة التعليم والتعليم الفني', N'حكومي', N'محافظة الإسكندرية', N'مركز الإسكندرية', 
     N'إدارة تعليم الإسكندرية', N'محافظة الإسكندرية', N'حي الرمل', N'ثانوي', N'تعليم عام', @EduBuilding3, GETUTCDATE(), GETUTCDATE());

-- 14. Insert Building Basic Data (البيانات الأساسية للمبنى)
INSERT INTO [BuildingBasicData] ([Id], [BuildingId], [BuildingNumber], [SchoolName], [BuildingName], [LandArea], 
    [BuiltArea], [Floors], [ConstructionYear], [LastMaintenanceYear], [BuildingCondition], [OwnershipType], 
    [RentalStatus], [UsagePeriods], [Gender], [SecondPeriodSchoolName], [ThirdPeriodSchoolName], 
    [TotalStudents], [BoysCount], [GirlsCount], [LandOwnership], [AnnexesCount], [FenceType], 
    [ConstructionSystem], [ConstructionMethod], [PowerSource], [SewerageSystem], [WaterSupply], 
    [ClassroomsCount], [EducationalSpacesCount], [HostingStatus], [ComplementarySpacesCount], 
    [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), @Building1, N'601234', N'مدرسة النيل الابتدائية', N'مبنى رئيسي', 2500.00, 1800.00, 2, 2015, 2022, 
     N'جيد', N'ملك', N'غير مؤجر', N'فترة صباحية ومسائية', N'مشترك', N'مدرسة النيل المسائية', NULL,
     830, 450, 380, N'ملك حكومي', 2, N'سور خرساني', N'هيكل خرساني', N'طوب أحمر', N'كهرباء حكومية', 
     N'صرف صحي عام', N'مياه الشبكة', 20, 22, N'غير مستضيف', 5, GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Building2, N'602456', N'مدرسة التحرير الإعدادية', N'مبنى رئيسي', 3000.00, 2200.00, 3, 2018, NULL, 
     N'ممتاز', N'ملك', N'غير مؤجر', N'فترة صباحية', N'بنين', NULL, NULL,
     520, 520, 0, N'ملك حكومي', 3, N'سور خرساني', N'هيكل خرساني', N'طوب أحمر', N'كهرباء حكومية', 
     N'صرف صحي عام', N'مياه الشبكة', 24, 27, N'غير مستضيف', 6, GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Building3, N'603789', N'مدرسة المنار الثانوية', N'مبنى رئيسي', 3500.00, 2800.00, 3, 2020, NULL, 
     N'ممتاز', N'ملك', N'غير مؤجر', N'فترة صباحية', N'بنات', NULL, NULL,
     600, 0, 600, N'ملك حكومي', 4, N'سور خرساني', N'هيكل خرساني مسلح', N'طوب أحمر', N'كهرباء حكومية', 
     N'صرف صحي عام', N'مياه الشبكة', 30, 35, N'غير مستضيف', 8, GETUTCDATE(), GETUTCDATE());

-- 15. Insert Building Annexes (ملحقات المبنى)
INSERT INTO [BuildingAnnexes] ([Id], [BuildingId], [AnnexType], [Area], [ConstructionYear], [Condition], [Purpose], [CreatedAt])
VALUES 
    (NEWID(), @Building1, N'سور خارجي', 500.00, 2015, N'جيد', N'السلامة والأمن', GETUTCDATE()),
    (NEWID(), @Building1, N'ساحة خارجية', 800.00, 2015, N'جيد', N'الأنشطة الخارجية', GETUTCDATE()),
    (NEWID(), @Building2, N'مظلات خارجية', 300.00, 2018, N'ممتاز', N'الحماية من الشمس', GETUTCDATE()),
    (NEWID(), @Building3, N'موقف سيارات', 600.00, 2020, N'ممتاز', N'مواقف السيارات', GETUTCDATE());

-- 16. Insert Network Costs (تكاليف الشبكات)
INSERT INTO [NetworkCosts] ([Id], [BuildingId], [NetworkType], [InstallationCost], [MaintenanceCost], 
    [InstallationDate], [Provider], [ContractNumber], [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), @Building1, N'كهرباء', 150000.00, 5000.00, N'2015-03-15', N'الشركة المصرية لتوزيع الكهرباء', N'701234', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Building1, N'مياه', 80000.00, 3000.00, N'2015-03-20', N'شركة المياه الوطنية المصرية', N'702456', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Building2, N'كهرباء', 180000.00, 6000.00, N'2018-05-10', N'الشركة المصرية لتوزيع الكهرباء', N'703789', GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Building3, N'إنترنت', 50000.00, 4000.00, N'2020-08-01', N'شركة الاتصالات المصرية', N'704512', GETUTCDATE(), GETUTCDATE());

-- 17. Insert Rental Buildings (المباني المستأجرة)

INSERT INTO [RentalBuildings] ([Id], [IdentificationNumber], [Name], [StatusFlagId], [Status], [Substatus], [Tenant], 
    [Location], [MonthlyRent], [ContractStartDate], [ContractEndDate], [BuildingType], [TotalArea], [UsableArea], 
    [NumberOfRooms], [NumberOfFloors], [YearBuilt], [LastInspectionDate], [InspectionStatus], [MaintenanceRequired], 
    [EducationalBuildingId], [CreatedAt], [UpdatedAt])
VALUES 
    (@Rental1, N'801234', N'مبنى إداري مستأجر - حي الزمالك', @StatusActive, N'نشط', N'ساري', N'إدارة التعليم', 
     N'القاهرة - حي الزمالك - شارع النيل', 25000.00, N'2024-01-01', N'2025-12-31', N'إداري', 500.00, 450.00, 
     10, 2, 2018, N'2024-09-01', N'جيد', 0, @EduBuilding1, GETUTCDATE(), GETUTCDATE()),
    (@Rental2, N'802456', N'مبنى تعليمي مستأجر - حي النيل', @StatusActive, N'نشط', N'ساري', N'إدارة التعليم', 
     N'القاهرة - حي النيل - شارع التحرير', 35000.00, N'2024-02-01', N'2026-01-31', N'تعليمي', 800.00, 750.00, 
     15, 3, 2019, N'2024-08-15', N'ممتاز', 0, @EduBuilding2, GETUTCDATE(), GETUTCDATE()),
    (@Rental3, N'803789', N'مبنى مستأجر - حي الرمل', @StatusPending, N'قيد المراجعة', N'تجديد', N'إدارة التعليم', 
     N'الإسكندرية - حي الرمل - طريق الكورنيش', 30000.00, N'2023-06-01', N'2024-05-31', N'مختلط', 600.00, 550.00, 
     12, 2, 2020, N'2024-04-20', N'جيد', 1, @EduBuilding4, GETUTCDATE(), GETUTCDATE());

-- 18. Insert Rental Building Locations (مواقع المباني المستأجرة)
INSERT INTO [RentalBuildingLocations] ([Id], [BuildingId], [Governorate], [City], [District], [Neighborhood], 
    [Street], [BuildingNumber], [PostalCode], [Latitude], [Longitude], [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), @Rental1, N'محافظة القاهرة', N'القاهرة', N'وسط القاهرة', N'حي الزمالك', N'شارع النيل', N'1234', N'12345', 
     30.04420000, 31.23570000, GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Rental2, N'محافظة القاهرة', N'القاهرة', N'شمال القاهرة', N'حي النيل', N'شارع التحرير', N'5678', N'12346', 
     30.06000000, 31.24000000, GETUTCDATE(), GETUTCDATE()),
    (NEWID(), @Rental3, N'محافظة الإسكندرية', N'الإسكندرية', N'شمال الإسكندرية', N'حي الرمل', N'طريق الكورنيش', N'9012', N'23456', 
     31.18530000, 29.95520000, GETUTCDATE(), GETUTCDATE());

-- 19. Insert Rental Decisions (قرارات الإيجار)
INSERT INTO [RentalDecisions] ([Id], [BuildingId], [DecisionNumber], [DecisionDate], [DecisionType], 
    [ApprovedBy], [Notes], [CreatedAt])
VALUES 
    (NEWID(), @Rental1, N'901234', N'2024-01-01', N'عقد إيجار جديد', N'مدير إدارة التعليم', 
     N'تم الموافقة على استئجار المبنى لمدة عامين', GETUTCDATE()),
    (NEWID(), @Rental2, N'902456', N'2024-02-01', N'عقد إيجار جديد', N'مدير إدارة التعليم', 
     N'تم الموافقة على استئجار المبنى التعليمي', GETUTCDATE()),
    (NEWID(), @Rental3, N'903789', N'2023-06-01', N'تجديد عقد', N'مدير إدارة التعليم', 
     N'تجديد العقد تحت المراجعة', GETUTCDATE());

-- 20. Insert Displacement Records (سجلات الإحلال)

INSERT INTO [DisplacementRecords] ([Id], [ReferenceNumber], [BuildingCode], [DisplacementType], [Status], 
    [RequestDate], [ApprovalDate], [CompletionDate], [Reason], [Notes], [EducationalBuildingId], [CreatedAt], [UpdatedAt])
VALUES 
    (@Displacement1, N'101512', N'101234', N'إحلال كامل', N'معتمد', N'2024-03-01', N'2024-04-15', NULL, 
     N'البنية التحتية القديمة تحتاج إلى إحلال', N'مشروع إحلال شامل للمبنى', @EduBuilding1, GETUTCDATE(), GETUTCDATE()),
    (@Displacement2, N'102678', N'104512', N'صيانة وترميم', N'قيد التنفيذ', N'2024-05-10', N'2024-06-20', NULL, 
     N'أعمال صيانة دورية', N'صيانة المرافق والفصول الدراسية', @EduBuilding4, GETUTCDATE(), GETUTCDATE());

-- 21. Insert Displacement Compensations (التعويضات)
INSERT INTO [DisplacementCompensations] ([Id], [DisplacementId], [CompensationType], [Amount], [PaymentDate], 
    [PaymentStatus], [PaymentMethod], [Notes], [CreatedAt])
VALUES 
    (NEWID(), @Displacement1, N'تعويض مالي', 500000.00, N'2024-05-01', N'مدفوع', N'تحويل بنكي', 
     N'دفعة أولى من التعويض', GETUTCDATE()),
    (NEWID(), @Displacement1, N'تعويض إضافي', 200000.00, NULL, N'قيد الانتظار', N'تحويل بنكي', 
     N'دفعة ثانية بعد اكتمال المشروع', GETUTCDATE()),
    (NEWID(), @Displacement2, N'تعويض صيانة', 150000.00, N'2024-07-01', N'مدفوع', N'شيك', 
     N'تعويض أعمال الصيانة', GETUTCDATE());

-- 22. Insert Council Approvals (موافقات المجلس)
INSERT INTO [CouncilApprovals] ([Id], [DisplacementId], [CouncilName], [ApprovalNumber], [ApprovalDate], 
    [ApprovalStatus], [DecisionDetails], [CreatedAt])
VALUES 
    (NEWID(), @Displacement1, N'مجلس إدارة التعليم', N'201234', N'2024-04-15', N'معتمد', 
     N'تمت الموافقة على مشروع الإحلال بالإجماع', GETUTCDATE()),
    (NEWID(), @Displacement1, N'اللجنة المالية', N'202456', N'2024-04-20', N'معتمد', 
     N'تمت الموافقة على الميزانية المقترحة', GETUTCDATE()),
    (NEWID(), @Displacement2, N'لجنة الصيانة', N'203789', N'2024-06-20', N'معتمد', 
     N'الموافقة على خطة الصيانة والترميم', GETUTCDATE());

-- 23. Insert Users (المستخدمون)
-- Password hash for "password123" using SHA256

INSERT INTO [Users] ([Id], [Username], [PasswordHash], [Email], [FullName], [Role], [IsActive], 
    [LastLoginDate], [ProgramId], [MenuId], [LibraryId], [CreatedAt], [UpdatedAt])
VALUES 
    (NEWID(), N'admin', N'EF92B778BAFE771E89245B89ECBC08A44A4E166C06659911881F383D4473E94F', 
     'admin@education.gov.eg', N'أحمد محمد السيد', N'Admin', 1, NULL, @ProgramId, @MenuId, @LibraryId, 
     GETUTCDATE(), GETUTCDATE()),
    (NEWID(), N'manager', N'EF92B778BAFE771E89245B89ECBC08A44A4E166C06659911881F383D4473E94F', 
     'manager@education.gov.eg', N'فاطمة أحمد الدين', N'Manager', 1, NULL, @ProgramId, @MenuId, @LibraryId, 
     GETUTCDATE(), GETUTCDATE()),
    (NEWID(), N'user1', N'EF92B778BAFE771E89245B89ECBC08A44A4E166C06659911881F383D4473E94F', 
     'user1@education.gov.eg', N'خالد عبدالله محمود', N'User', 1, NULL, @ProgramId, @MenuId, @LibraryId, 
     GETUTCDATE(), GETUTCDATE());
GO

-- Display summary of inserted data
SELECT N'EducationalBuildings' AS TableName, COUNT(*) AS RecordCount FROM EducationalBuildings
UNION ALL SELECT N'StudyPeriods', COUNT(*) FROM StudyPeriods
UNION ALL SELECT N'SchoolRoads', COUNT(*) FROM SchoolRoads
UNION ALL SELECT N'SchoolAnnexes', COUNT(*) FROM SchoolAnnexes
UNION ALL SELECT N'SchoolSpaces', COUNT(*) FROM SchoolSpaces
UNION ALL SELECT N'Lands', COUNT(*) FROM Lands
UNION ALL SELECT N'LandCoordinates', COUNT(*) FROM LandCoordinates
UNION ALL SELECT N'BuildingLocations', COUNT(*) FROM BuildingLocations
UNION ALL SELECT N'Buildings', COUNT(*) FROM Buildings
UNION ALL SELECT N'BuildingBasicData', COUNT(*) FROM BuildingBasicData
UNION ALL SELECT N'BuildingAnnexes', COUNT(*) FROM BuildingAnnexes
UNION ALL SELECT N'NetworkCosts', COUNT(*) FROM NetworkCosts
UNION ALL SELECT N'RentalBuildings', COUNT(*) FROM RentalBuildings
UNION ALL SELECT N'RentalBuildingLocations', COUNT(*) FROM RentalBuildingLocations
UNION ALL SELECT N'RentalDecisions', COUNT(*) FROM RentalDecisions
UNION ALL SELECT N'RentalStatusFlags', COUNT(*) FROM RentalStatusFlags
UNION ALL SELECT N'DisplacementRecords', COUNT(*) FROM DisplacementRecords
UNION ALL SELECT N'DisplacementCompensations', COUNT(*) FROM DisplacementCompensations
UNION ALL SELECT N'CouncilApprovals', COUNT(*) FROM CouncilApprovals
UNION ALL SELECT N'Users', COUNT(*) FROM Users
UNION ALL SELECT N'Programs', COUNT(*) FROM Programs
UNION ALL SELECT N'Menus', COUNT(*) FROM Menus
UNION ALL SELECT N'Libraries', COUNT(*) FROM Libraries
ORDER BY TableName;

PRINT 'Database populated successfully with dummy data!';
PRINT 'Default login credentials:';
PRINT 'Username: admin, Password: password123';
PRINT 'Username: manager, Password: password123';
PRINT 'Username: user1, Password: password123';
GO

