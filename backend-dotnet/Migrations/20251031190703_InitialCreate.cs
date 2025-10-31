using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularProjectApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EducationalBuildings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BuildingNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UsageStatus = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    AddressNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Street = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LandOwnership = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    BuildingOwnership = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    FenceCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    FenceHeight = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    FenceCondition = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    NorthSide = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    SouthSide = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    EastSide = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    WestSide = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NorthEast = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    SouthEast = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NorthWest = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    SouthWest = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    BuildingMaterial = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CoordinateX = table.Column<decimal>(type: "decimal(18,6)", nullable: true),
                    CoordinateY = table.Column<decimal>(type: "decimal(18,6)", nullable: true),
                    CoordinateZ = table.Column<decimal>(type: "decimal(18,6)", nullable: true),
                    PositiveEnvironment = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NegativeEnvironment = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EducationalBuildings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Libraries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Location = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Libraries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Menus",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Programs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Programs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RentalStatusFlags",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Label = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalStatusFlags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Buildings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BuildingNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SchoolName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    UsageStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Affiliation = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    BuildingOwnership = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Governorate = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    RegionalCenter = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    EducationalAdministration = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    District = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Neighborhood = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Stage = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    EducationType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EducationalBuildingId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Buildings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Buildings_EducationalBuildings_EducationalBuildingId",
                        column: x => x.EducationalBuildingId,
                        principalTable: "EducationalBuildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "DisplacementRecords",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReferenceNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BuildingCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DisplacementType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RequestDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ApprovalDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CompletionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EducationalBuildingId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DisplacementRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DisplacementRecords_EducationalBuildings_EducationalBuildingId",
                        column: x => x.EducationalBuildingId,
                        principalTable: "EducationalBuildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Lands",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReferenceNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UsageStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Headquarters = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ApprovalStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IdentificationNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CenterDepartment = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TotalArea = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Phase = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Approval = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Housing = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CommitteePricing = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PurchasePrice = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    SaleNegotiations = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    LandCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Village = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CurrentOwner = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    OriginalOwner = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Model = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Documents = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Plan = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    BranchNotification = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    RealEstateStatus = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    BuildingBoundaries = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    NetworkData = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    NetworkObservations = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LandAreaFromTotal = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    LandUseDatabase = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    LandInspectionDatabase = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    LandConstructionObstacles = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LandCreationObstacles = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LandConstructionData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LandReceiptDatabase = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PaidAmountsDatabase = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    DecisionData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LandCommittees = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LandFacilities = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LandCoordinatesData = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    EducationalStudies = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LandReviewCommittees = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EducationalBuildingId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lands", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lands_EducationalBuildings_EducationalBuildingId",
                        column: x => x.EducationalBuildingId,
                        principalTable: "EducationalBuildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "SchoolAnnexes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalBuildingId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    BuildingId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    AnnexType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Area = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Capacity = table.Column<int>(type: "int", nullable: true),
                    Condition = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Purpose = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolAnnexes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolAnnexes_EducationalBuildings_EducationalBuildingId",
                        column: x => x.EducationalBuildingId,
                        principalTable: "EducationalBuildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "SchoolRoads",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalBuildingId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    BuildingId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Direction = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RoadName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    RoadWidth = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    RoadType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Condition = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolRoads", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolRoads_EducationalBuildings_EducationalBuildingId",
                        column: x => x.EducationalBuildingId,
                        principalTable: "EducationalBuildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "SchoolSpaces",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalBuildingId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    BuildingId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SpaceType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Area = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: true),
                    Condition = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Usage = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolSpaces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolSpaces_EducationalBuildings_EducationalBuildingId",
                        column: x => x.EducationalBuildingId,
                        principalTable: "EducationalBuildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "StudyPeriods",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalBuildingId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    BuildingNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SchoolName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Period = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    StudentCount = table.Column<int>(type: "int", nullable: true),
                    ClassroomCount = table.Column<int>(type: "int", nullable: true),
                    TeacherCount = table.Column<int>(type: "int", nullable: true),
                    EducationalLevel = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyPeriods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudyPeriods_EducationalBuildings_EducationalBuildingId",
                        column: x => x.EducationalBuildingId,
                        principalTable: "EducationalBuildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Role = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    LastLoginDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProgramId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    MenuId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LibraryId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Libraries_LibraryId",
                        column: x => x.LibraryId,
                        principalTable: "Libraries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Users_Menus_MenuId",
                        column: x => x.MenuId,
                        principalTable: "Menus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Users_Programs_ProgramId",
                        column: x => x.ProgramId,
                        principalTable: "Programs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "RentalBuildings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdentificationNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    StatusFlagId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Substatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Tenant = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Location = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    MonthlyRent = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ContractStartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ContractEndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    BuildingType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TotalArea = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    UsableArea = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    NumberOfRooms = table.Column<int>(type: "int", nullable: true),
                    NumberOfFloors = table.Column<int>(type: "int", nullable: true),
                    YearBuilt = table.Column<int>(type: "int", nullable: true),
                    LastInspectionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    InspectionStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MaintenanceRequired = table.Column<bool>(type: "bit", nullable: false),
                    Governorate = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    RegionalCenter = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    EducationalAdministration = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    EducationType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Affiliation = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    UsageStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Stage = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    BuildingOwnership = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UsagePeriods = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SecondPeriodSchoolName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ThirdPeriodSchoolName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TotalStudents = table.Column<int>(type: "int", nullable: true),
                    BoysCount = table.Column<int>(type: "int", nullable: true),
                    GirlsCount = table.Column<int>(type: "int", nullable: true),
                    LandOwnership = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LandArea = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BuiltArea = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    AnnexesCount = table.Column<int>(type: "int", nullable: true),
                    FenceType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ConstructionSystem = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ConstructionMethod = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PowerSource = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    SewerageSystem = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    WaterSupply = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ClassroomsCount = table.Column<int>(type: "int", nullable: true),
                    EducationalSpacesCount = table.Column<int>(type: "int", nullable: true),
                    HostingStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ComplementarySpacesCount = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EducationalBuildingId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalBuildings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentalBuildings_EducationalBuildings_EducationalBuildingId",
                        column: x => x.EducationalBuildingId,
                        principalTable: "EducationalBuildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_RentalBuildings_RentalStatusFlags_StatusFlagId",
                        column: x => x.StatusFlagId,
                        principalTable: "RentalStatusFlags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "BuildingAnnexes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BuildingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AnnexType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Area = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ConstructionYear = table.Column<int>(type: "int", nullable: true),
                    Condition = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Purpose = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingAnnexes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BuildingAnnexes_Buildings_BuildingId",
                        column: x => x.BuildingId,
                        principalTable: "Buildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BuildingBasicData",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BuildingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BuildingNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SchoolName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    BuildingName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    LandArea = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BuiltArea = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Floors = table.Column<int>(type: "int", nullable: true),
                    ConstructionYear = table.Column<int>(type: "int", nullable: true),
                    LastMaintenanceYear = table.Column<int>(type: "int", nullable: true),
                    BuildingCondition = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    OwnershipType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RentalStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UsagePeriods = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SecondPeriodSchoolName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ThirdPeriodSchoolName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TotalStudents = table.Column<int>(type: "int", nullable: true),
                    BoysCount = table.Column<int>(type: "int", nullable: true),
                    GirlsCount = table.Column<int>(type: "int", nullable: true),
                    LandOwnership = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    AnnexesCount = table.Column<int>(type: "int", nullable: true),
                    FenceType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ConstructionSystem = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ConstructionMethod = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PowerSource = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    SewerageSystem = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    WaterSupply = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ClassroomsCount = table.Column<int>(type: "int", nullable: true),
                    EducationalSpacesCount = table.Column<int>(type: "int", nullable: true),
                    HostingStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ComplementarySpacesCount = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingBasicData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BuildingBasicData_Buildings_BuildingId",
                        column: x => x.BuildingId,
                        principalTable: "Buildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NetworkCosts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BuildingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NetworkType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    InstallationCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MaintenanceCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    InstallationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Provider = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ContractNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NetworkCosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NetworkCosts_Buildings_BuildingId",
                        column: x => x.BuildingId,
                        principalTable: "Buildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CouncilApprovals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DisplacementId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CouncilName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ApprovalNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ApprovalDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ApprovalStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DecisionDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CouncilApprovals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CouncilApprovals_DisplacementRecords_DisplacementId",
                        column: x => x.DisplacementId,
                        principalTable: "DisplacementRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DisplacementCompensations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DisplacementId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompensationType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PaymentStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PaymentMethod = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DisplacementCompensations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DisplacementCompensations_DisplacementRecords_DisplacementId",
                        column: x => x.DisplacementId,
                        principalTable: "DisplacementRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BuildingLocations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LandId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LocationName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Coordinates = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RequiredStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    NeighborDescription = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingLocations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BuildingLocations_Lands_LandId",
                        column: x => x.LandId,
                        principalTable: "Lands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LandCoordinates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LandId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PointNumber = table.Column<int>(type: "int", nullable: false),
                    Latitude = table.Column<decimal>(type: "decimal(10,8)", nullable: false),
                    Longitude = table.Column<decimal>(type: "decimal(11,8)", nullable: false),
                    Elevation = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LandCoordinates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LandCoordinates_Lands_LandId",
                        column: x => x.LandId,
                        principalTable: "Lands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RentalBuildingLocations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BuildingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Governorate = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    City = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    District = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Neighborhood = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Street = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    BuildingNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Latitude = table.Column<decimal>(type: "decimal(10,8)", nullable: true),
                    Longitude = table.Column<decimal>(type: "decimal(11,8)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalBuildingLocations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentalBuildingLocations_RentalBuildings_BuildingId",
                        column: x => x.BuildingId,
                        principalTable: "RentalBuildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RentalDecisions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BuildingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DecisionNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DecisionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DecisionType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ApprovedBy = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalDecisions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RentalDecisions_RentalBuildings_BuildingId",
                        column: x => x.BuildingId,
                        principalTable: "RentalBuildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BuildingAnnexes_BuildingId",
                table: "BuildingAnnexes",
                column: "BuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_BuildingBasicData_BuildingId",
                table: "BuildingBasicData",
                column: "BuildingId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BuildingLocations_LandId",
                table: "BuildingLocations",
                column: "LandId");

            migrationBuilder.CreateIndex(
                name: "IX_Buildings_BuildingNumber",
                table: "Buildings",
                column: "BuildingNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Buildings_EducationalBuildingId",
                table: "Buildings",
                column: "EducationalBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_CouncilApprovals_DisplacementId",
                table: "CouncilApprovals",
                column: "DisplacementId");

            migrationBuilder.CreateIndex(
                name: "IX_DisplacementCompensations_DisplacementId",
                table: "DisplacementCompensations",
                column: "DisplacementId");

            migrationBuilder.CreateIndex(
                name: "IX_DisplacementRecords_EducationalBuildingId",
                table: "DisplacementRecords",
                column: "EducationalBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_DisplacementRecords_ReferenceNumber",
                table: "DisplacementRecords",
                column: "ReferenceNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EducationalBuildings_BuildingNumber",
                table: "EducationalBuildings",
                column: "BuildingNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LandCoordinates_LandId",
                table: "LandCoordinates",
                column: "LandId");

            migrationBuilder.CreateIndex(
                name: "IX_Lands_EducationalBuildingId",
                table: "Lands",
                column: "EducationalBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_Lands_ReferenceNumber",
                table: "Lands",
                column: "ReferenceNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_NetworkCosts_BuildingId",
                table: "NetworkCosts",
                column: "BuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_RentalBuildingLocations_BuildingId",
                table: "RentalBuildingLocations",
                column: "BuildingId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RentalBuildings_EducationalBuildingId",
                table: "RentalBuildings",
                column: "EducationalBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_RentalBuildings_IdentificationNumber",
                table: "RentalBuildings",
                column: "IdentificationNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RentalBuildings_StatusFlagId",
                table: "RentalBuildings",
                column: "StatusFlagId");

            migrationBuilder.CreateIndex(
                name: "IX_RentalDecisions_BuildingId",
                table: "RentalDecisions",
                column: "BuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_RentalStatusFlags_Code",
                table: "RentalStatusFlags",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SchoolAnnexes_EducationalBuildingId",
                table: "SchoolAnnexes",
                column: "EducationalBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolRoads_EducationalBuildingId",
                table: "SchoolRoads",
                column: "EducationalBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolSpaces_EducationalBuildingId",
                table: "SchoolSpaces",
                column: "EducationalBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_StudyPeriods_EducationalBuildingId",
                table: "StudyPeriods",
                column: "EducationalBuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_LibraryId",
                table: "Users",
                column: "LibraryId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_MenuId",
                table: "Users",
                column: "MenuId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_ProgramId",
                table: "Users",
                column: "ProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuildingAnnexes");

            migrationBuilder.DropTable(
                name: "BuildingBasicData");

            migrationBuilder.DropTable(
                name: "BuildingLocations");

            migrationBuilder.DropTable(
                name: "CouncilApprovals");

            migrationBuilder.DropTable(
                name: "DisplacementCompensations");

            migrationBuilder.DropTable(
                name: "LandCoordinates");

            migrationBuilder.DropTable(
                name: "NetworkCosts");

            migrationBuilder.DropTable(
                name: "RentalBuildingLocations");

            migrationBuilder.DropTable(
                name: "RentalDecisions");

            migrationBuilder.DropTable(
                name: "SchoolAnnexes");

            migrationBuilder.DropTable(
                name: "SchoolRoads");

            migrationBuilder.DropTable(
                name: "SchoolSpaces");

            migrationBuilder.DropTable(
                name: "StudyPeriods");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "DisplacementRecords");

            migrationBuilder.DropTable(
                name: "Lands");

            migrationBuilder.DropTable(
                name: "Buildings");

            migrationBuilder.DropTable(
                name: "RentalBuildings");

            migrationBuilder.DropTable(
                name: "Libraries");

            migrationBuilder.DropTable(
                name: "Menus");

            migrationBuilder.DropTable(
                name: "Programs");

            migrationBuilder.DropTable(
                name: "EducationalBuildings");

            migrationBuilder.DropTable(
                name: "RentalStatusFlags");
        }
    }
}
