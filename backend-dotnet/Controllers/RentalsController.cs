using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularProjectApi.Data;
using AngularProjectApi.Models;

namespace AngularProjectApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RentalsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RentalsController(ApplicationDbContext context) => _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<RentalBuilding>>> GetRentalBuildings()
        => await _context.RentalBuildings.OrderByDescending(r => r.CreatedAt).ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<RentalBuilding>> GetRentalBuilding(Guid id)
    {
        var rental = await _context.RentalBuildings.FindAsync(id);
        return rental == null ? NotFound() : rental;
    }

    [HttpGet("by-id-number/{identificationNumber}")]
    public async Task<ActionResult<RentalBuilding>> GetByIdNumber(string identificationNumber)
    {
        var rental = await _context.RentalBuildings.FirstOrDefaultAsync(r => r.IdentificationNumber == identificationNumber);
        return rental == null ? NotFound() : rental;
    }

    [HttpPost("search")]
    public async Task<ActionResult<IEnumerable<RentalBuilding>>> SearchRentalBuildings([FromBody] RentalSearchCriteria criteria)
    {
        var query = _context.RentalBuildings.AsQueryable();
        if (!string.IsNullOrEmpty(criteria.Status)) query = query.Where(r => r.Status == criteria.Status);
        if (!string.IsNullOrEmpty(criteria.Substatus)) query = query.Where(r => r.Substatus == criteria.Substatus);
        if (!string.IsNullOrEmpty(criteria.BuildingType)) query = query.Where(r => r.BuildingType == criteria.BuildingType);
        return await query.OrderByDescending(r => r.CreatedAt).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<RentalBuilding>> CreateRentalBuilding(RentalBuilding rental)
    {
        rental.Id = Guid.NewGuid();
        rental.CreatedAt = rental.UpdatedAt = DateTime.UtcNow;
        _context.RentalBuildings.Add(rental);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetRentalBuilding), new { id = rental.Id }, rental);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<RentalBuilding>> UpdateRentalBuilding(Guid id, RentalBuilding rental)
    {
        if (id != rental.Id) return BadRequest();
        rental.UpdatedAt = DateTime.UtcNow;
        _context.Entry(rental).State = EntityState.Modified;
        try { await _context.SaveChangesAsync(); }
        catch (DbUpdateConcurrencyException) { if (!_context.RentalBuildings.Any(e => e.Id == id)) return NotFound(); throw; }
        return Ok(rental);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRentalBuilding(Guid id)
    {
        var rental = await _context.RentalBuildings.FindAsync(id);
        if (rental == null) return NotFound();
        _context.RentalBuildings.Remove(rental);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("{buildingId}/location")]
    public async Task<ActionResult<RentalBuildingLocation>> GetLocation(Guid buildingId)
    {
        var location = await _context.RentalBuildingLocations.FirstOrDefaultAsync(l => l.BuildingId == buildingId);
        return location == null ? NotFound() : location;
    }

    [HttpGet("{buildingId}/decisions")]
    public async Task<ActionResult<IEnumerable<RentalDecision>>> GetDecisions(Guid buildingId)
        => await _context.RentalDecisions.Where(d => d.BuildingId == buildingId).OrderByDescending(d => d.DecisionDate).ToListAsync();

    [HttpGet("status-flags/all")]
    public async Task<ActionResult<IEnumerable<RentalStatusFlag>>> GetStatusFlags()
        => await _context.RentalStatusFlags.Where(f => f.IsActive).OrderBy(f => f.Category).ThenBy(f => f.Label).ToListAsync();

    [HttpPost("{buildingId}/location")]
    public async Task<ActionResult<RentalBuildingLocation>> AddLocation(Guid buildingId, RentalBuildingLocation location)
    {
        location.Id = Guid.NewGuid();
        location.BuildingId = buildingId;
        location.CreatedAt = location.UpdatedAt = DateTime.UtcNow;
        _context.RentalBuildingLocations.Add(location);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetLocation), new { buildingId }, location);
    }
}

public class RentalSearchCriteria
{
    public string? Status { get; set; }
    public string? Substatus { get; set; }
    public string? BuildingType { get; set; }
}
