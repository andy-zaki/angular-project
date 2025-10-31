using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularProjectApi.Models;

public class Building
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    [MaxLength(50)]
    public string BuildingNumber { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(255)]
    public string SchoolName { get; set; } = string.Empty;
    
    [MaxLength(50)]
    public string? UsageStatus { get; set; }
    
    [MaxLength(100)]
    public string? Affiliation { get; set; }
    
    [MaxLength(50)]
    public string? BuildingOwnership { get; set; }
    
    [MaxLength(100)]
    public string? Governorate { get; set; }
    
    [MaxLength(100)]
    public string? RegionalCenter { get; set; }
    
    [MaxLength(100)]
    public string? EducationalAdministration { get; set; }
    
    [MaxLength(100)]
    public string? District { get; set; }
    
    [MaxLength(100)]
    public string? Neighborhood { get; set; }
    
    [MaxLength(50)]
    public string? Stage { get; set; }
    
    [MaxLength(50)]
    public string? EducationType { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    [ForeignKey("EducationalBuilding")]
    public Guid? EducationalBuildingId { get; set; }
    
    // Navigation properties
    public EducationalBuilding? EducationalBuilding { get; set; }
    public BuildingBasicData? BasicData { get; set; }
    public ICollection<BuildingAnnex> Annexes { get; set; } = new List<BuildingAnnex>();
    public ICollection<NetworkCost> NetworkCosts { get; set; } = new List<NetworkCost>();
}

public class BuildingBasicData
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [ForeignKey("Building")]
    public Guid BuildingId { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string BuildingNumber { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(255)]
    public string SchoolName { get; set; } = string.Empty;
    
    [MaxLength(255)]
    public string? BuildingName { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? LandArea { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? BuiltArea { get; set; }
    
    public int? Floors { get; set; }
    
    public int? ConstructionYear { get; set; }
    
    public int? LastMaintenanceYear { get; set; }
    
    [MaxLength(50)]
    public string? BuildingCondition { get; set; }
    
    [MaxLength(50)]
    public string? OwnershipType { get; set; }
    
    [MaxLength(50)]
    public string? RentalStatus { get; set; }
    
    // Additional Fields for Full Display
    [MaxLength(100)]
    public string? UsagePeriods { get; set; }
    
    [MaxLength(50)]
    public string? Gender { get; set; }
    
    [MaxLength(255)]
    public string? SecondPeriodSchoolName { get; set; }
    
    [MaxLength(255)]
    public string? ThirdPeriodSchoolName { get; set; }
    
    public int? TotalStudents { get; set; }
    
    public int? BoysCount { get; set; }
    
    public int? GirlsCount { get; set; }
    
    [MaxLength(50)]
    public string? LandOwnership { get; set; }
    
    public int? AnnexesCount { get; set; }
    
    [MaxLength(100)]
    public string? FenceType { get; set; }
    
    [MaxLength(100)]
    public string? ConstructionSystem { get; set; }
    
    [MaxLength(100)]
    public string? ConstructionMethod { get; set; }
    
    [MaxLength(100)]
    public string? PowerSource { get; set; }
    
    [MaxLength(100)]
    public string? SewerageSystem { get; set; }
    
    [MaxLength(100)]
    public string? WaterSupply { get; set; }
    
    public int? ClassroomsCount { get; set; }
    
    public int? EducationalSpacesCount { get; set; }
    
    [MaxLength(50)]
    public string? HostingStatus { get; set; }
    
    public int? ComplementarySpacesCount { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    public Building? Building { get; set; }
}

public class BuildingAnnex
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    public Guid BuildingId { get; set; }
    
    [MaxLength(100)]
    public string? AnnexType { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? Area { get; set; }
    
    public int? ConstructionYear { get; set; }
    
    [MaxLength(50)]
    public string? Condition { get; set; }
    
    [MaxLength(255)]
    public string? Purpose { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    [ForeignKey("BuildingId")]
    public Building Building { get; set; } = null!;
}

public class NetworkCost
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    public Guid BuildingId { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string NetworkType { get; set; } = string.Empty;
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? InstallationCost { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? MaintenanceCost { get; set; }
    
    public DateTime? InstallationDate { get; set; }
    
    [MaxLength(255)]
    public string? Provider { get; set; }
    
    [MaxLength(100)]
    public string? ContractNumber { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    [ForeignKey("BuildingId")]
    public Building Building { get; set; } = null!;
}
