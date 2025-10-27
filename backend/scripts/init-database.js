const { sql, getPool, closePool } = require('../config/database');

const createTables = async () => {
  try {
    const pool = await getPool();

    console.log('Creating database tables...');

    // Lands Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Lands' AND xtype='U')
      CREATE TABLE Lands (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        ReferenceNumber NVARCHAR(50) UNIQUE NOT NULL,
        UsageStatus NVARCHAR(50),
        Headquarters NVARCHAR(100),
        ApprovalStatus NVARCHAR(50),
        IdentificationNumber NVARCHAR(50),
        CenterDepartment NVARCHAR(100),
        TotalArea DECIMAL(18,2),
        Phase NVARCHAR(50),
        Approval NVARCHAR(100),
        Housing NVARCHAR(100),
        CommitteePricing NVARCHAR(100),
        PurchasePrice NVARCHAR(100),
        SaleNegotiations NVARCHAR(255),
        LandCode NVARCHAR(50),
        Village NVARCHAR(100),
        CurrentOwner NVARCHAR(255),
        OriginalOwner NVARCHAR(255),
        Model NVARCHAR(100),
        Documents NVARCHAR(255),
        PlanInfo NVARCHAR(255),
        BranchNotification NVARCHAR(255),
        RealEstateStatus NVARCHAR(100),
        BuildingBoundaries NVARCHAR(100),
        NetworkData NVARCHAR(100),
        NetworkObservations NVARCHAR(MAX),
        LandAreaFromTotal NVARCHAR(100),
        LandUseDatabase NVARCHAR(100),
        LandInspectionDatabase NVARCHAR(100),
        LandConstructionObstacles NVARCHAR(MAX),
        LandCreationObstacles NVARCHAR(MAX),
        LandConstructionData NVARCHAR(MAX),
        LandReceiptDatabase NVARCHAR(100),
        PaidAmountsDatabase NVARCHAR(100),
        DecisionData NVARCHAR(MAX),
        LandCommittees NVARCHAR(MAX),
        LandFacilities NVARCHAR(MAX),
        LandCoordinatesData NVARCHAR(100),
        EducationalStudies NVARCHAR(MAX),
        LandReviewCommittees NVARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
      )
    `);
    console.log('✓ Lands table created');

    // Land Coordinates Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='LandCoordinates' AND xtype='U')
      CREATE TABLE LandCoordinates (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        LandId UNIQUEIDENTIFIER NOT NULL,
        PointNumber INT NOT NULL,
        Latitude DECIMAL(10,8) NOT NULL,
        Longitude DECIMAL(11,8) NOT NULL,
        Elevation DECIMAL(10,2),
        CreatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (LandId) REFERENCES Lands(Id) ON DELETE CASCADE
      )
    `);
    console.log('✓ LandCoordinates table created');

    // Building Location Data Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='BuildingLocations' AND xtype='U')
      CREATE TABLE BuildingLocations (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        LandId UNIQUEIDENTIFIER NOT NULL,
        Code NVARCHAR(50) NOT NULL,
        LocationName NVARCHAR(255),
        Coordinates INT,
        Status NVARCHAR(50),
        RequiredStatus NVARCHAR(50),
        CreatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (LandId) REFERENCES Lands(Id) ON DELETE CASCADE
      )
    `);
    console.log('✓ BuildingLocations table created');

    // Buildings Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Buildings' AND xtype='U')
      CREATE TABLE Buildings (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        BuildingNumber NVARCHAR(50) UNIQUE NOT NULL,
        SchoolName NVARCHAR(255) NOT NULL,
        UsageStatus NVARCHAR(50),
        Affiliation NVARCHAR(100),
        BuildingOwnership NVARCHAR(50),
        Governorate NVARCHAR(100),
        RegionalCenter NVARCHAR(100),
        EducationalAdministration NVARCHAR(100),
        District NVARCHAR(100),
        Neighborhood NVARCHAR(100),
        Stage NVARCHAR(50),
        EducationType NVARCHAR(50),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
      )
    `);
    console.log('✓ Buildings table created');

    // Building Basic Data Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='BuildingBasicData' AND xtype='U')
      CREATE TABLE BuildingBasicData (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        BuildingNumber NVARCHAR(50) NOT NULL,
        SchoolName NVARCHAR(255) NOT NULL,
        BuildingName NVARCHAR(255),
        LandArea DECIMAL(18,2),
        BuiltArea DECIMAL(18,2),
        Floors INT,
        ConstructionYear INT,
        LastMaintenanceYear INT,
        BuildingCondition NVARCHAR(50),
        OwnershipType NVARCHAR(50),
        RentalStatus NVARCHAR(50),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (BuildingNumber) REFERENCES Buildings(BuildingNumber) ON DELETE CASCADE
      )
    `);
    console.log('✓ BuildingBasicData table created');

    // Building Annexes Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='BuildingAnnexes' AND xtype='U')
      CREATE TABLE BuildingAnnexes (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        BuildingId UNIQUEIDENTIFIER NOT NULL,
        AnnexType NVARCHAR(100),
        Area DECIMAL(18,2),
        ConstructionYear INT,
        Condition NVARCHAR(50),
        Purpose NVARCHAR(255),
        CreatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (BuildingId) REFERENCES Buildings(Id) ON DELETE CASCADE
      )
    `);
    console.log('✓ BuildingAnnexes table created');

    // Network Costs Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='NetworkCosts' AND xtype='U')
      CREATE TABLE NetworkCosts (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        BuildingId UNIQUEIDENTIFIER NOT NULL,
        NetworkType NVARCHAR(50) NOT NULL,
        InstallationCost DECIMAL(18,2),
        MaintenanceCost DECIMAL(18,2),
        InstallationDate DATE,
        Provider NVARCHAR(255),
        ContractNumber NVARCHAR(100),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (BuildingId) REFERENCES Buildings(Id) ON DELETE CASCADE
      )
    `);
    console.log('✓ NetworkCosts table created');

    // Rental Buildings Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='RentalBuildings' AND xtype='U')
      CREATE TABLE RentalBuildings (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        IdentificationNumber NVARCHAR(50) UNIQUE NOT NULL,
        Name NVARCHAR(255) NOT NULL,
        Status NVARCHAR(50),
        Substatus NVARCHAR(50),
        Tenant NVARCHAR(255),
        Location NVARCHAR(255),
        MonthlyRent DECIMAL(18,2),
        ContractStartDate DATE,
        ContractEndDate DATE,
        BuildingType NVARCHAR(100),
        TotalArea DECIMAL(18,2),
        UsableArea DECIMAL(18,2),
        NumberOfRooms INT,
        NumberOfFloors INT,
        YearBuilt INT,
        LastInspectionDate DATE,
        InspectionStatus NVARCHAR(50),
        MaintenanceRequired BIT DEFAULT 0,
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
      )
    `);
    console.log('✓ RentalBuildings table created');

    // Rental Building Locations Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='RentalBuildingLocations' AND xtype='U')
      CREATE TABLE RentalBuildingLocations (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        BuildingId UNIQUEIDENTIFIER NOT NULL,
        Governorate NVARCHAR(100),
        City NVARCHAR(100),
        District NVARCHAR(100),
        Neighborhood NVARCHAR(100),
        Street NVARCHAR(255),
        BuildingNumber NVARCHAR(50),
        PostalCode NVARCHAR(20),
        Latitude DECIMAL(10,8),
        Longitude DECIMAL(11,8),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (BuildingId) REFERENCES RentalBuildings(Id) ON DELETE CASCADE
      )
    `);
    console.log('✓ RentalBuildingLocations table created');

    // Rental Status Flags Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='RentalStatusFlags' AND xtype='U')
      CREATE TABLE RentalStatusFlags (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        Code NVARCHAR(50) UNIQUE NOT NULL,
        Label NVARCHAR(255) NOT NULL,
        Category NVARCHAR(100),
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME DEFAULT GETDATE()
      )
    `);
    console.log('✓ RentalStatusFlags table created');

    // Rental Decisions Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='RentalDecisions' AND xtype='U')
      CREATE TABLE RentalDecisions (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        BuildingId UNIQUEIDENTIFIER NOT NULL,
        DecisionNumber NVARCHAR(100) NOT NULL,
        DecisionDate DATE NOT NULL,
        DecisionType NVARCHAR(100),
        ApprovedBy NVARCHAR(255),
        Notes NVARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (BuildingId) REFERENCES RentalBuildings(Id) ON DELETE CASCADE
      )
    `);
    console.log('✓ RentalDecisions table created');

    // Study Periods Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='StudyPeriods' AND xtype='U')
      CREATE TABLE StudyPeriods (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        BuildingCode NVARCHAR(50) NOT NULL,
        SchoolName NVARCHAR(255),
        Period NVARCHAR(100),
        StudentCount INT,
        ClassroomCount INT,
        TeacherCount INT,
        EducationalLevel NVARCHAR(100),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
      )
    `);
    console.log('✓ StudyPeriods table created');

    // School Roads Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SchoolRoads' AND xtype='U')
      CREATE TABLE SchoolRoads (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        BuildingId NVARCHAR(50) NOT NULL,
        Direction NVARCHAR(50),
        RoadName NVARCHAR(255),
        RoadWidth DECIMAL(10,2),
        RoadType NVARCHAR(100),
        Condition NVARCHAR(50),
        CreatedAt DATETIME DEFAULT GETDATE()
      )
    `);
    console.log('✓ SchoolRoads table created');

    // School Annexes Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SchoolAnnexes' AND xtype='U')
      CREATE TABLE SchoolAnnexes (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        BuildingId NVARCHAR(50) NOT NULL,
        AnnexType NVARCHAR(100),
        Area DECIMAL(18,2),
        Capacity INT,
        Condition NVARCHAR(50),
        Purpose NVARCHAR(255),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
      )
    `);
    console.log('✓ SchoolAnnexes table created');

    // School Spaces Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SchoolSpaces' AND xtype='U')
      CREATE TABLE SchoolSpaces (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        BuildingId NVARCHAR(50) NOT NULL,
        SpaceType NVARCHAR(100),
        Area DECIMAL(18,2),
        Quantity INT,
        Condition NVARCHAR(50),
        Usage NVARCHAR(255),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
      )
    `);
    console.log('✓ SchoolSpaces table created');

    // Educational Buildings Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='EducationalBuildings' AND xtype='U')
      CREATE TABLE EducationalBuildings (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        BuildingCode NVARCHAR(50) UNIQUE NOT NULL,
        BuildingName NVARCHAR(255),
        EducationType NVARCHAR(100),
        BuildingStatus NVARCHAR(50),
        TotalArea DECIMAL(18,2),
        NumberOfClassrooms INT,
        NumberOfLabs INT,
        HasLibrary BIT DEFAULT 0,
        HasGym BIT DEFAULT 0,
        HasCafeteria BIT DEFAULT 0,
        ConstructionYear INT,
        LastRenovationYear INT,
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
      )
    `);
    console.log('✓ EducationalBuildings table created');

    // Displacement Records Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DisplacementRecords' AND xtype='U')
      CREATE TABLE DisplacementRecords (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        ReferenceNumber NVARCHAR(50) UNIQUE NOT NULL,
        BuildingCode NVARCHAR(50),
        DisplacementType NVARCHAR(100),
        Status NVARCHAR(50),
        RequestDate DATE,
        ApprovalDate DATE,
        CompletionDate DATE,
        Reason NVARCHAR(MAX),
        Notes NVARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
      )
    `);
    console.log('✓ DisplacementRecords table created');

    // Displacement Compensation Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='DisplacementCompensation' AND xtype='U')
      CREATE TABLE DisplacementCompensation (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        DisplacementId UNIQUEIDENTIFIER NOT NULL,
        CompensationType NVARCHAR(100),
        Amount DECIMAL(18,2),
        PaymentDate DATE,
        PaymentStatus NVARCHAR(50),
        PaymentMethod NVARCHAR(100),
        Notes NVARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (DisplacementId) REFERENCES DisplacementRecords(Id) ON DELETE CASCADE
      )
    `);
    console.log('✓ DisplacementCompensation table created');

    // Council Approvals Table
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CouncilApprovals' AND xtype='U')
      CREATE TABLE CouncilApprovals (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        DisplacementId UNIQUEIDENTIFIER NOT NULL,
        CouncilName NVARCHAR(255),
        ApprovalNumber NVARCHAR(100),
        ApprovalDate DATE,
        ApprovalStatus NVARCHAR(50),
        DecisionDetails NVARCHAR(MAX),
        CreatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (DisplacementId) REFERENCES DisplacementRecords(Id) ON DELETE CASCADE
      )
    `);
    console.log('✓ CouncilApprovals table created');

    console.log('\n✓ All tables created successfully!');
    console.log('\nYou can now start using the database.');

  } catch (err) {
    console.error('Error creating tables:', err);
    throw err;
  } finally {
    await closePool();
  }
};

// Run the script
createTables()
  .then(() => {
    console.log('\nDatabase initialization completed!');
    process.exit(0);
  })
  .catch(err => {
    console.error('\nDatabase initialization failed:', err);
    process.exit(1);
  });
