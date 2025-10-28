using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularProjectApi.Models;

public class RentalBuilding
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    [MaxLength(50)]
    public string IdentificationNumber { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(255)]
    public string Name { get; set; } = string.Empty;
    
    [ForeignKey("StatusFlag")]
    public Guid? StatusFlagId { get; set; }
    
    [MaxLength(50)]
    public string? Status { get; set; }
    
    [MaxLength(50)]
    public string? Substatus { get; set; }
    
    [MaxLength(255)]
    public string? Tenant { get; set; }
    
    [MaxLength(255)]
    public string? Location { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? MonthlyRent { get; set; }
    
    public DateTime? ContractStartDate { get; set; }
    
    public DateTime? ContractEndDate { get; set; }
    
    [MaxLength(100)]
    public string? BuildingType { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? TotalArea { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? UsableArea { get; set; }
    
    public int? NumberOfRooms { get; set; }
    
    public int? NumberOfFloors { get; set; }
    
    public int? YearBuilt { get; set; }
    
    public DateTime? LastInspectionDate { get; set; }
    
    [MaxLength(50)]
    public string? InspectionStatus { get; set; }
    
    public bool MaintenanceRequired { get; set; } = false;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    [ForeignKey("EducationalBuilding")]
    public Guid? EducationalBuildingId { get; set; }
    
    // Navigation properties
    public EducationalBuilding? EducationalBuilding { get; set; }
    public RentalStatusFlag? StatusFlag { get; set; }
    public RentalBuildingLocation? RentalLocation { get; set; }
    public ICollection<RentalDecision> Decisions { get; set; } = new List<RentalDecision>();
}

public class RentalBuildingLocation
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    public Guid BuildingId { get; set; }
    
    [MaxLength(100)]
    public string? Governorate { get; set; }
    
    [MaxLength(100)]
    public string? City { get; set; }
    
    [MaxLength(100)]
    public string? District { get; set; }
    
    [MaxLength(100)]
    public string? Neighborhood { get; set; }
    
    [MaxLength(255)]
    public string? Street { get; set; }
    
    [MaxLength(50)]
    public string? BuildingNumber { get; set; }
    
    [MaxLength(20)]
    public string? PostalCode { get; set; }
    
    [Column(TypeName = "decimal(10,8)")]
    public decimal? Latitude { get; set; }
    
    [Column(TypeName = "decimal(11,8)")]
    public decimal? Longitude { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    [ForeignKey("BuildingId")]
    public RentalBuilding RentalBuilding { get; set; } = null!;
}

public class RentalStatusFlag
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    [MaxLength(50)]
    public string Code { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(255)]
    public string Label { get; set; } = string.Empty;
    
    [MaxLength(100)]
    public string? Category { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    public ICollection<RentalBuilding> RentalBuildings { get; set; } = new List<RentalBuilding>();
}

public class RentalDecision
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    public Guid BuildingId { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string DecisionNumber { get; set; } = string.Empty;
    
    [Required]
    public DateTime DecisionDate { get; set; }
    
    [MaxLength(100)]
    public string? DecisionType { get; set; }
    
    [MaxLength(255)]
    public string? ApprovedBy { get; set; }
    
    public string? Notes { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    [ForeignKey("BuildingId")]
    public RentalBuilding RentalBuilding { get; set; } = null!;
}
