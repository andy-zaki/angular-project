using Microsoft.EntityFrameworkCore;
using AngularProjectApi.Models;

namespace AngularProjectApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // Land entities
    public DbSet<Land> Lands { get; set; }
    public DbSet<LandCoordinate> LandCoordinates { get; set; }
    public DbSet<BuildingLocation> BuildingLocations { get; set; }

    // Building entities
    public DbSet<Building> Buildings { get; set; }
    public DbSet<BuildingBasicData> BuildingBasicData { get; set; }
    public DbSet<BuildingAnnex> BuildingAnnexes { get; set; }
    public DbSet<NetworkCost> NetworkCosts { get; set; }

    // Rental entities
    public DbSet<RentalBuilding> RentalBuildings { get; set; }
    public DbSet<RentalBuildingLocation> RentalBuildingLocations { get; set; }
    public DbSet<RentalStatusFlag> RentalStatusFlags { get; set; }
    public DbSet<RentalDecision> RentalDecisions { get; set; }

    // School Map entities
    public DbSet<StudyPeriod> StudyPeriods { get; set; }
    public DbSet<SchoolRoad> SchoolRoads { get; set; }
    public DbSet<SchoolAnnex> SchoolAnnexes { get; set; }
    public DbSet<SchoolSpace> SchoolSpaces { get; set; }
    public DbSet<EducationalBuilding> EducationalBuildings { get; set; }

    // Displacement entities
    public DbSet<DisplacementRecord> DisplacementRecords { get; set; }
    public DbSet<DisplacementCompensation> DisplacementCompensations { get; set; }
    public DbSet<CouncilApproval> CouncilApprovals { get; set; }

    // User and Authentication entities
    public DbSet<User> Users { get; set; }
    public DbSet<UserProgram> Programs { get; set; }
    public DbSet<UserMenu> Menus { get; set; }
    public DbSet<UserLibrary> Libraries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Ensure Arabic-aware comparisons/sorting at the model level
        // Note: This does not change existing column collations, but applies to EF Core queries it generates
        modelBuilder.UseCollation("Arabic_CI_AS");

        // Configure all string properties to use Unicode (NVARCHAR) for Arabic support
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(string))
                {
                    property.SetIsUnicode(true);
                }
            }
        }

        // Configure unique indexes
        modelBuilder.Entity<Land>()
            .HasIndex(l => l.ReferenceNumber)
            .IsUnique();

        modelBuilder.Entity<Building>()
            .HasIndex(b => b.BuildingNumber)
            .IsUnique();

        modelBuilder.Entity<RentalBuilding>()
            .HasIndex(r => r.IdentificationNumber)
            .IsUnique();

        modelBuilder.Entity<RentalStatusFlag>()
            .HasIndex(r => r.Code)
            .IsUnique();

        modelBuilder.Entity<EducationalBuilding>()
            .HasIndex(e => e.BuildingNumber)
            .IsUnique();

        modelBuilder.Entity<DisplacementRecord>()
            .HasIndex(d => d.ReferenceNumber)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();

        // Configure relationships
        modelBuilder.Entity<Land>()
            .HasMany(l => l.Coordinates)
            .WithOne(c => c.Land)
            .HasForeignKey(c => c.LandId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Land>()
            .HasMany(l => l.BuildingLocations)
            .WithOne(b => b.Land)
            .HasForeignKey(b => b.LandId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Building>()
            .HasMany(b => b.Annexes)
            .WithOne(a => a.Building)
            .HasForeignKey(a => a.BuildingId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Building>()
            .HasMany(b => b.NetworkCosts)
            .WithOne(n => n.Building)
            .HasForeignKey(n => n.BuildingId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Building>()
            .HasOne(b => b.BasicData)
            .WithOne(bd => bd.Building)
            .HasForeignKey<BuildingBasicData>(bd => bd.BuildingId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<EducationalBuilding>()
            .HasMany(e => e.StudyPeriods)
            .WithOne(s => s.EducationalBuilding)
            .HasForeignKey(s => s.EducationalBuildingId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<EducationalBuilding>()
            .HasMany(e => e.SchoolRoads)
            .WithOne(r => r.EducationalBuilding)
            .HasForeignKey(r => r.EducationalBuildingId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<EducationalBuilding>()
            .HasMany(e => e.SchoolAnnexes)
            .WithOne(a => a.EducationalBuilding)
            .HasForeignKey(a => a.EducationalBuildingId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<EducationalBuilding>()
            .HasMany(e => e.SchoolSpaces)
            .WithOne(s => s.EducationalBuilding)
            .HasForeignKey(s => s.EducationalBuildingId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<EducationalBuilding>()
            .HasMany(e => e.Buildings)
            .WithOne(b => b.EducationalBuilding)
            .HasForeignKey(b => b.EducationalBuildingId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<EducationalBuilding>()
            .HasMany(e => e.Lands)
            .WithOne(l => l.EducationalBuilding)
            .HasForeignKey(l => l.EducationalBuildingId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<EducationalBuilding>()
            .HasMany(e => e.RentalBuildings)
            .WithOne(r => r.EducationalBuilding)
            .HasForeignKey(r => r.EducationalBuildingId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<EducationalBuilding>()
            .HasMany(e => e.DisplacementRecords)
            .WithOne(d => d.EducationalBuilding)
            .HasForeignKey(d => d.EducationalBuildingId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<RentalBuilding>()
            .HasMany(r => r.Decisions)
            .WithOne(d => d.RentalBuilding)
            .HasForeignKey(d => d.BuildingId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<RentalBuilding>()
            .HasOne(r => r.StatusFlag)
            .WithMany(s => s.RentalBuildings)
            .HasForeignKey(r => r.StatusFlagId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<DisplacementRecord>()
            .HasMany(d => d.Compensations)
            .WithOne(c => c.DisplacementRecord)
            .HasForeignKey(c => c.DisplacementId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<DisplacementRecord>()
            .HasMany(d => d.CouncilApprovals)
            .WithOne(c => c.DisplacementRecord)
            .HasForeignKey(c => c.DisplacementId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<User>()
            .HasOne(u => u.UserProgram)
            .WithMany(p => p.Users)
            .HasForeignKey(u => u.ProgramId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<User>()
            .HasOne(u => u.UserMenu)
            .WithMany(m => m.Users)
            .HasForeignKey(u => u.MenuId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<User>()
            .HasOne(u => u.UserLibrary)
            .WithMany(l => l.Users)
            .HasForeignKey(u => u.LibraryId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
