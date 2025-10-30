using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularProjectApi.Models;

public class Land
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    [MaxLength(50)]
    public string ReferenceNumber { get; set; } = string.Empty;
    
    [MaxLength(50)]
    public string? UsageStatus { get; set; }
    
    [MaxLength(100)]
    public string? Headquarters { get; set; }
    
    [MaxLength(50)]
    public string? ApprovalStatus { get; set; }
    
    [MaxLength(50)]
    public string? IdentificationNumber { get; set; }
    
    [MaxLength(100)]
    public string? CenterDepartment { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? TotalArea { get; set; }
    
    [MaxLength(50)]
    public string? Phase { get; set; }
    
    [MaxLength(100)]
    public string? Approval { get; set; }
    
    [MaxLength(100)]
    public string? Housing { get; set; }
    
    [MaxLength(100)]
    public string? CommitteePricing { get; set; }
    
    [MaxLength(100)]
    public string? PurchasePrice { get; set; }
    
    [MaxLength(255)]
    public string? SaleNegotiations { get; set; }
    
    [MaxLength(50)]
    public string? LandCode { get; set; }
    
    [MaxLength(100)]
    public string? Village { get; set; }
    
    [MaxLength(255)]
    public string? CurrentOwner { get; set; }
    
    [MaxLength(255)]
    public string? OriginalOwner { get; set; }
    
    [MaxLength(100)]
    public string? Model { get; set; }
    
    [MaxLength(255)]
    public string? Documents { get; set; }
    
    [MaxLength(255)]
    public string? Plan { get; set; }
    
    [MaxLength(255)]
    public string? BranchNotification { get; set; }
    
    [MaxLength(100)]
    public string? RealEstateStatus { get; set; }
    
    [MaxLength(100)]
    public string? BuildingBoundaries { get; set; }
    
    [MaxLength(100)]
    public string? NetworkData { get; set; }
    
    public string? NetworkObservations { get; set; }
    
    [MaxLength(100)]
    public string? LandAreaFromTotal { get; set; }
    
    [MaxLength(100)]
    public string? LandUseDatabase { get; set; }
    
    [MaxLength(100)]
    public string? LandInspectionDatabase { get; set; }
    
    public string? LandConstructionObstacles { get; set; }
    
    public string? LandCreationObstacles { get; set; }
    
    public string? LandConstructionData { get; set; }
    
    [MaxLength(100)]
    public string? LandReceiptDatabase { get; set; }
    
    [MaxLength(100)]
    public string? PaidAmountsDatabase { get; set; }
    
    public string? DecisionData { get; set; }
    
    public string? LandCommittees { get; set; }
    
    public string? LandFacilities { get; set; }
    
    [MaxLength(100)]
    public string? LandCoordinatesData { get; set; }
    
    public string? EducationalStudies { get; set; }
    
    public string? LandReviewCommittees { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    [ForeignKey("EducationalBuilding")]
    public Guid? EducationalBuildingId { get; set; }
    
    // Navigation properties
    public EducationalBuilding? EducationalBuilding { get; set; }
    public ICollection<LandCoordinate> Coordinates { get; set; } = new List<LandCoordinate>();
    public ICollection<BuildingLocation> BuildingLocations { get; set; } = new List<BuildingLocation>();
}

public class LandCoordinate
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    public Guid LandId { get; set; }
    
    [Required]
    public int PointNumber { get; set; }
    
    [Required]
    [Column(TypeName = "decimal(10,8)")]
    public decimal Latitude { get; set; }
    
    [Required]
    [Column(TypeName = "decimal(11,8)")]
    public decimal Longitude { get; set; }
    
    [Column(TypeName = "decimal(10,2)")]
    public decimal? Elevation { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    [ForeignKey("LandId")]
    public Land Land { get; set; } = null!;
}

public class BuildingLocation
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    public Guid LandId { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string Code { get; set; } = string.Empty;
    
    [MaxLength(255)]
    public string? LocationName { get; set; }
    
    public int? Coordinates { get; set; }
    
    [MaxLength(50)]
    public string? Status { get; set; }
    
    [MaxLength(50)]
    public string? RequiredStatus { get; set; }
    
    [MaxLength(255)]
    public string? NeighborDescription { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    [ForeignKey("LandId")]
    public Land Land { get; set; } = null!;
}
