-- Add new columns to BuildingBasicData table
USE AngularProjectDB;
GO

-- Check if columns don't exist before adding
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'UsagePeriods')
    ALTER TABLE BuildingBasicData ADD UsagePeriods NVARCHAR(100) NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'Gender')
    ALTER TABLE BuildingBasicData ADD Gender NVARCHAR(50) NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'SecondPeriodSchoolName')
    ALTER TABLE BuildingBasicData ADD SecondPeriodSchoolName NVARCHAR(255) NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'ThirdPeriodSchoolName')
    ALTER TABLE BuildingBasicData ADD ThirdPeriodSchoolName NVARCHAR(255) NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'TotalStudents')
    ALTER TABLE BuildingBasicData ADD TotalStudents INT NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'BoysCount')
    ALTER TABLE BuildingBasicData ADD BoysCount INT NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'GirlsCount')
    ALTER TABLE BuildingBasicData ADD GirlsCount INT NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'LandOwnership')
    ALTER TABLE BuildingBasicData ADD LandOwnership NVARCHAR(100) NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'AnnexesCount')
    ALTER TABLE BuildingBasicData ADD AnnexesCount INT NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'FenceType')
    ALTER TABLE BuildingBasicData ADD FenceType NVARCHAR(100) NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'ConstructionSystem')
    ALTER TABLE BuildingBasicData ADD ConstructionSystem NVARCHAR(100) NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'ConstructionMethod')
    ALTER TABLE BuildingBasicData ADD ConstructionMethod NVARCHAR(100) NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'PowerSource')
    ALTER TABLE BuildingBasicData ADD PowerSource NVARCHAR(100) NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'SewerageSystem')
    ALTER TABLE BuildingBasicData ADD SewerageSystem NVARCHAR(100) NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'WaterSupply')
    ALTER TABLE BuildingBasicData ADD WaterSupply NVARCHAR(100) NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'ClassroomsCount')
    ALTER TABLE BuildingBasicData ADD ClassroomsCount INT NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'EducationalSpacesCount')
    ALTER TABLE BuildingBasicData ADD EducationalSpacesCount INT NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'HostingStatus')
    ALTER TABLE BuildingBasicData ADD HostingStatus NVARCHAR(100) NULL;

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[BuildingBasicData]') AND name = 'ComplementarySpacesCount')
    ALTER TABLE BuildingBasicData ADD ComplementarySpacesCount INT NULL;

GO

PRINT 'New columns added successfully to BuildingBasicData table';
