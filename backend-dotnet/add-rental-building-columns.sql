-- Migration Script: Add Missing Columns to RentalBuildings Table
-- Database: AngularProjectDB
-- Server: ANDREW-SAMY\MSSQLSERVER2
-- Execute this script to add all required fields from Buildings and BuildingBasicData tables
-- NOTE: Run this with: sqlcmd -S ANDREW-SAMY\MSSQLSERVER2 -d AngularProjectDB -i add-rental-building-columns.sql

USE AngularProjectDB;
GO

PRINT 'Starting migration: Adding columns to RentalBuildings table...';
GO

-- Add columns from Buildings table
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'Governorate')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [Governorate] NVARCHAR(100) NULL;
    PRINT '✓ Added column: Governorate';
END
ELSE
    PRINT '- Column already exists: Governorate';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'RegionalCenter')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [RegionalCenter] NVARCHAR(100) NULL;
    PRINT '✓ Added column: RegionalCenter';
END
ELSE
    PRINT '- Column already exists: RegionalCenter';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'EducationalAdministration')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [EducationalAdministration] NVARCHAR(100) NULL;
    PRINT '✓ Added column: EducationalAdministration';
END
ELSE
    PRINT '- Column already exists: EducationalAdministration';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'EducationType')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [EducationType] NVARCHAR(50) NULL;
    PRINT '✓ Added column: EducationType';
END
ELSE
    PRINT '- Column already exists: EducationType';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'Affiliation')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [Affiliation] NVARCHAR(100) NULL;
    PRINT '✓ Added column: Affiliation';
END
ELSE
    PRINT '- Column already exists: Affiliation';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'UsageStatus')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [UsageStatus] NVARCHAR(50) NULL;
    PRINT '✓ Added column: UsageStatus';
END
ELSE
    PRINT '- Column already exists: UsageStatus';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'Stage')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [Stage] NVARCHAR(50) NULL;
    PRINT '✓ Added column: Stage';
END
ELSE
    PRINT '- Column already exists: Stage';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'BuildingOwnership')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [BuildingOwnership] NVARCHAR(50) NULL;
    PRINT '✓ Added column: BuildingOwnership';
END
ELSE
    PRINT '- Column already exists: BuildingOwnership';

-- Add columns from BuildingBasicData table
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'UsagePeriods')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [UsagePeriods] NVARCHAR(100) NULL;
    PRINT '✓ Added column: UsagePeriods';
END
ELSE
    PRINT '- Column already exists: UsagePeriods';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'Gender')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [Gender] NVARCHAR(50) NULL;
    PRINT '✓ Added column: Gender';
END
ELSE
    PRINT '- Column already exists: Gender';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'SecondPeriodSchoolName')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [SecondPeriodSchoolName] NVARCHAR(255) NULL;
    PRINT '✓ Added column: SecondPeriodSchoolName';
END
ELSE
    PRINT '- Column already exists: SecondPeriodSchoolName';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'ThirdPeriodSchoolName')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [ThirdPeriodSchoolName] NVARCHAR(255) NULL;
    PRINT '✓ Added column: ThirdPeriodSchoolName';
END
ELSE
    PRINT '- Column already exists: ThirdPeriodSchoolName';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'TotalStudents')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [TotalStudents] INT NULL;
    PRINT '✓ Added column: TotalStudents';
END
ELSE
    PRINT '- Column already exists: TotalStudents';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'BoysCount')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [BoysCount] INT NULL;
    PRINT '✓ Added column: BoysCount';
END
ELSE
    PRINT '- Column already exists: BoysCount';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'GirlsCount')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [GirlsCount] INT NULL;
    PRINT '✓ Added column: GirlsCount';
END
ELSE
    PRINT '- Column already exists: GirlsCount';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'LandOwnership')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [LandOwnership] NVARCHAR(50) NULL;
    PRINT '✓ Added column: LandOwnership';
END
ELSE
    PRINT '- Column already exists: LandOwnership';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'LandArea')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [LandArea] DECIMAL(18,2) NULL;
    PRINT '✓ Added column: LandArea';
END
ELSE
    PRINT '- Column already exists: LandArea';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'BuiltArea')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [BuiltArea] DECIMAL(18,2) NULL;
    PRINT '✓ Added column: BuiltArea';
END
ELSE
    PRINT '- Column already exists: BuiltArea';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'AnnexesCount')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [AnnexesCount] INT NULL;
    PRINT '✓ Added column: AnnexesCount';
END
ELSE
    PRINT '- Column already exists: AnnexesCount';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'FenceType')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [FenceType] NVARCHAR(100) NULL;
    PRINT '✓ Added column: FenceType';
END
ELSE
    PRINT '- Column already exists: FenceType';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'ConstructionSystem')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [ConstructionSystem] NVARCHAR(100) NULL;
    PRINT '✓ Added column: ConstructionSystem';
END
ELSE
    PRINT '- Column already exists: ConstructionSystem';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'ConstructionMethod')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [ConstructionMethod] NVARCHAR(100) NULL;
    PRINT '✓ Added column: ConstructionMethod';
END
ELSE
    PRINT '- Column already exists: ConstructionMethod';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'PowerSource')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [PowerSource] NVARCHAR(100) NULL;
    PRINT '✓ Added column: PowerSource';
END
ELSE
    PRINT '- Column already exists: PowerSource';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'SewerageSystem')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [SewerageSystem] NVARCHAR(100) NULL;
    PRINT '✓ Added column: SewerageSystem';
END
ELSE
    PRINT '- Column already exists: SewerageSystem';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'WaterSupply')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [WaterSupply] NVARCHAR(100) NULL;
    PRINT '✓ Added column: WaterSupply';
END
ELSE
    PRINT '- Column already exists: WaterSupply';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'ClassroomsCount')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [ClassroomsCount] INT NULL;
    PRINT '✓ Added column: ClassroomsCount';
END
ELSE
    PRINT '- Column already exists: ClassroomsCount';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'EducationalSpacesCount')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [EducationalSpacesCount] INT NULL;
    PRINT '✓ Added column: EducationalSpacesCount';
END
ELSE
    PRINT '- Column already exists: EducationalSpacesCount';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'HostingStatus')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [HostingStatus] NVARCHAR(50) NULL;
    PRINT '✓ Added column: HostingStatus';
END
ELSE
    PRINT '- Column already exists: HostingStatus';

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[RentalBuildings]') AND name = 'ComplementarySpacesCount')
BEGIN
    ALTER TABLE [RentalBuildings] ADD [ComplementarySpacesCount] INT NULL;
    PRINT '✓ Added column: ComplementarySpacesCount';
END
ELSE
    PRINT '- Column already exists: ComplementarySpacesCount';

GO

PRINT '';
PRINT '========================================';
PRINT 'Migration completed successfully!';
PRINT 'All required columns have been added to RentalBuildings table.';
PRINT '========================================';
PRINT '';
PRINT 'Next steps:';
PRINT '1. Re-run the seed-database.sql script to populate data with all fields';
PRINT '2. Restart your .NET API application';
PRINT '3. Test the rental inquiry functionality';
GO
