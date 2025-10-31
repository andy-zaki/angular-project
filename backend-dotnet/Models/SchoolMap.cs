using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularProjectApi.Models;

public class StudyPeriod
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [ForeignKey("EducationalBuilding")]
    public Guid? EducationalBuildingId { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string BuildingNumber { get; set; } = string.Empty;
    
    [MaxLength(255)]
    public string? SchoolName { get; set; }
    
    [MaxLength(100)]
    public string? Period { get; set; }
    
    public int? StudentCount { get; set; }
    
    public int? ClassroomCount { get; set; }
    
    public int? TeacherCount { get; set; }
    
    [MaxLength(100)]
    public string? EducationalLevel { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    public EducationalBuilding? EducationalBuilding { get; set; }
}

public class SchoolRoad
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [ForeignKey("EducationalBuilding")]
    public Guid? EducationalBuildingId { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string BuildingId { get; set; } = string.Empty;
    
    [MaxLength(50)]
    public string? Direction { get; set; }
    
    [MaxLength(255)]
    public string? RoadName { get; set; }
    
    [Column(TypeName = "decimal(10,2)")]
    public decimal? RoadWidth { get; set; }
    
    [MaxLength(100)]
    public string? RoadType { get; set; }
    
    [MaxLength(50)]
    public string? Condition { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    public EducationalBuilding? EducationalBuilding { get; set; }
}

public class SchoolAnnex
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [ForeignKey("EducationalBuilding")]
    public Guid? EducationalBuildingId { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string BuildingId { get; set; } = string.Empty;
    
    [MaxLength(100)]
    public string? AnnexType { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? Area { get; set; }
    
    public int? Capacity { get; set; }
    
    [MaxLength(50)]
    public string? Condition { get; set; }
    
    [MaxLength(255)]
    public string? Purpose { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    public EducationalBuilding? EducationalBuilding { get; set; }
}

public class SchoolSpace
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [ForeignKey("EducationalBuilding")]
    public Guid? EducationalBuildingId { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string BuildingId { get; set; } = string.Empty;
    
    [MaxLength(100)]
    public string? SpaceType { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? Area { get; set; }
    
    public int? Quantity { get; set; }
    
    [MaxLength(50)]
    public string? Condition { get; set; }
    
    [MaxLength(255)]
    public string? Usage { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    public EducationalBuilding? EducationalBuilding { get; set; }
}

public class EducationalBuilding
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    [MaxLength(50)]
    public string BuildingNumber { get; set; } = string.Empty;
    
    [MaxLength(100)]
    public string? UsageStatus { get; set; }
    
    [MaxLength(50)]
    public string? AddressNumber { get; set; }
    
    [MaxLength(255)]
    public string? Street { get; set; }
    
    [MaxLength(50)]
    public string? PhoneNumber { get; set; }
    
    [MaxLength(100)]
    public string? LandOwnership { get; set; }
    
    [MaxLength(100)]
    public string? BuildingOwnership { get; set; }
    
    [MaxLength(50)]
    public string? FenceCode { get; set; }
    
    [Column(TypeName = "decimal(10,2)")]
    public decimal? FenceHeight { get; set; }
    
    [MaxLength(100)]
    public string? FenceCondition { get; set; }
    
    [MaxLength(255)]
    public string? NorthSide { get; set; }
    
    [MaxLength(255)]
    public string? SouthSide { get; set; }
    
    [MaxLength(255)]
    public string? EastSide { get; set; }
    
    [MaxLength(255)]
    public string? WestSide { get; set; }
    
    [MaxLength(255)]
    public string? NorthEast { get; set; }
    
    [MaxLength(255)]
    public string? SouthEast { get; set; }
    
    [MaxLength(255)]
    public string? NorthWest { get; set; }
    
    [MaxLength(255)]
    public string? SouthWest { get; set; }
    
    [MaxLength(100)]
    public string? BuildingMaterial { get; set; }
    
    [Column(TypeName = "decimal(18,6)")]
    public decimal? CoordinateX { get; set; }
    
    [Column(TypeName = "decimal(18,6)")]
    public decimal? CoordinateY { get; set; }
    
    [Column(TypeName = "decimal(18,6)")]
    public decimal? CoordinateZ { get; set; }
    
    [MaxLength(255)]
    public string? PositiveEnvironment { get; set; }
    
    [MaxLength(255)]
    public string? NegativeEnvironment { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public ICollection<StudyPeriod> StudyPeriods { get; set; } = new List<StudyPeriod>();
    public ICollection<SchoolRoad> SchoolRoads { get; set; } = new List<SchoolRoad>();
    public ICollection<SchoolAnnex> SchoolAnnexes { get; set; } = new List<SchoolAnnex>();
    public ICollection<SchoolSpace> SchoolSpaces { get; set; } = new List<SchoolSpace>();
    public ICollection<Building> Buildings { get; set; } = new List<Building>();
    public ICollection<Land> Lands { get; set; } = new List<Land>();
    public ICollection<RentalBuilding> RentalBuildings { get; set; } = new List<RentalBuilding>();
    public ICollection<DisplacementRecord> DisplacementRecords { get; set; } = new List<DisplacementRecord>();
}
