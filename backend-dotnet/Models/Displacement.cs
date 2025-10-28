using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularProjectApi.Models;

public class DisplacementRecord
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    [MaxLength(50)]
    public string ReferenceNumber { get; set; } = string.Empty;
    
    [MaxLength(50)]
    public string? BuildingCode { get; set; }
    
    [MaxLength(100)]
    public string? DisplacementType { get; set; }
    
    [MaxLength(50)]
    public string? Status { get; set; }
    
    public DateTime? RequestDate { get; set; }
    
    public DateTime? ApprovalDate { get; set; }
    
    public DateTime? CompletionDate { get; set; }
    
    public string? Reason { get; set; }
    
    public string? Notes { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    [ForeignKey("EducationalBuilding")]
    public Guid? EducationalBuildingId { get; set; }
    
    // Navigation properties
    public EducationalBuilding? EducationalBuilding { get; set; }
    public ICollection<DisplacementCompensation> Compensations { get; set; } = new List<DisplacementCompensation>();
    public ICollection<CouncilApproval> CouncilApprovals { get; set; } = new List<CouncilApproval>();
}

public class DisplacementCompensation
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    public Guid DisplacementId { get; set; }
    
    [MaxLength(100)]
    public string? CompensationType { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal? Amount { get; set; }
    
    public DateTime? PaymentDate { get; set; }
    
    [MaxLength(50)]
    public string? PaymentStatus { get; set; }
    
    [MaxLength(100)]
    public string? PaymentMethod { get; set; }
    
    public string? Notes { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    [ForeignKey("DisplacementId")]
    public DisplacementRecord DisplacementRecord { get; set; } = null!;
}

public class CouncilApproval
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    public Guid DisplacementId { get; set; }
    
    [MaxLength(255)]
    public string? CouncilName { get; set; }
    
    [MaxLength(100)]
    public string? ApprovalNumber { get; set; }
    
    public DateTime? ApprovalDate { get; set; }
    
    [MaxLength(50)]
    public string? ApprovalStatus { get; set; }
    
    public string? DecisionDetails { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    [ForeignKey("DisplacementId")]
    public DisplacementRecord DisplacementRecord { get; set; } = null!;
}
