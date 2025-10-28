using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularProjectApi.Models;

public class User
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    [MaxLength(100)]
    public string Username { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(255)]
    public string PasswordHash { get; set; } = string.Empty;
    
    [MaxLength(255)]
    public string? Email { get; set; }
    
    [MaxLength(100)]
    public string? FullName { get; set; }
    
    [MaxLength(50)]
    public string? Role { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public DateTime? LastLoginDate { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // Foreign Keys for login selections
    [ForeignKey("UserProgram")]
    public Guid? ProgramId { get; set; }
    
    [ForeignKey("UserMenu")]
    public Guid? MenuId { get; set; }
    
    [ForeignKey("UserLibrary")]
    public Guid? LibraryId { get; set; }
    
    // Navigation properties
    public UserProgram? UserProgram { get; set; }
    public UserMenu? UserMenu { get; set; }
    public UserLibrary? UserLibrary { get; set; }
}

public class UserProgram
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [MaxLength(255)]
    public string? Description { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    public ICollection<User> Users { get; set; } = new List<User>();
}

public class UserMenu
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [MaxLength(255)]
    public string? Description { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    public ICollection<User> Users { get; set; } = new List<User>();
}

public class UserLibrary
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [MaxLength(255)]
    public string? Location { get; set; }
    
    [MaxLength(255)]
    public string? Description { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation property
    public ICollection<User> Users { get; set; } = new List<User>();
}
