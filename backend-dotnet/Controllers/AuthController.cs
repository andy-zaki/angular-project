using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularProjectApi.Data;
using AngularProjectApi.Models;
using System.Security.Cryptography;
using System.Text;

namespace AngularProjectApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AuthController(ApplicationDbContext context) => _context = context;

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        var user = await _context.Users
            .Include(u => u.UserProgram)
            .Include(u => u.UserMenu)
            .Include(u => u.UserLibrary)
            .FirstOrDefaultAsync(u => u.Username == request.Username);

        if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
            return Unauthorized(new { message = "اسم المستخدم أو كلمة المرور غير صحيحة" });

        if (!user.IsActive)
            return Unauthorized(new { message = "الحساب غير نشط" });

        user.LastLoginDate = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return new LoginResponse
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role,
            ProgramId = user.ProgramId,
            ProgramName = user.UserProgram?.Name,
            MenuId = user.MenuId,
            MenuName = user.UserMenu?.Name,
            LibraryId = user.LibraryId,
            LibraryName = user.UserLibrary?.Name
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult<User>> Register([FromBody] RegisterRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.Username == request.Username))
            return BadRequest(new { message = "اسم المستخدم موجود بالفعل" });

        var user = new User
        {
            Username = request.Username,
            PasswordHash = HashPassword(request.Password),
            Email = request.Email,
            FullName = request.FullName,
            Role = request.Role ?? "User",
            ProgramId = request.ProgramId,
            MenuId = request.MenuId,
            LibraryId = request.LibraryId
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(Guid id)
    {
        var user = await _context.Users
            .Include(u => u.UserProgram)
            .Include(u => u.UserMenu)
            .Include(u => u.UserLibrary)
            .FirstOrDefaultAsync(u => u.Id == id);
        
        return user == null ? NotFound() : user;
    }

    [HttpGet("programs")]
    public async Task<ActionResult<IEnumerable<UserProgram>>> GetPrograms()
        => await _context.Programs.Where(p => p.IsActive).OrderBy(p => p.Name).ToListAsync();

    [HttpGet("menus")]
    public async Task<ActionResult<IEnumerable<UserMenu>>> GetMenus()
        => await _context.Menus.Where(m => m.IsActive).OrderBy(m => m.Name).ToListAsync();

    [HttpGet("libraries")]
    public async Task<ActionResult<IEnumerable<UserLibrary>>> GetLibraries()
        => await _context.Libraries.Where(l => l.IsActive).OrderBy(l => l.Name).ToListAsync();

    [HttpPut("{id}/selections")]
    public async Task<IActionResult> UpdateUserSelections(Guid id, [FromBody] UserSelectionsRequest request)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();

        user.ProgramId = request.ProgramId;
        user.MenuId = request.MenuId;
        user.LibraryId = request.LibraryId;
        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }

    private static bool VerifyPassword(string password, string hash)
        => HashPassword(password) == hash;
}

public class LoginRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginResponse
{
    public Guid Id { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? FullName { get; set; }
    public string? Role { get; set; }
    public Guid? ProgramId { get; set; }
    public string? ProgramName { get; set; }
    public Guid? MenuId { get; set; }
    public string? MenuName { get; set; }
    public Guid? LibraryId { get; set; }
    public string? LibraryName { get; set; }
}

public class RegisterRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? FullName { get; set; }
    public string? Role { get; set; }
    public Guid? ProgramId { get; set; }
    public Guid? MenuId { get; set; }
    public Guid? LibraryId { get; set; }
}

public class UserSelectionsRequest
{
    public Guid? ProgramId { get; set; }
    public Guid? MenuId { get; set; }
    public Guid? LibraryId { get; set; }
}
