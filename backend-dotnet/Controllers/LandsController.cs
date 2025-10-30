using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularProjectApi.Data;
using AngularProjectApi.Models;

namespace AngularProjectApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LandsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LandsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/lands
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Land>>> GetLands()
    {
        return await _context.Lands
            .OrderByDescending(l => l.CreatedAt)
            .ToListAsync();
    }

    // GET: api/lands/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Land>> GetLand(Guid id)
    {
        var land = await _context.Lands.FindAsync(id);

        if (land == null)
        {
            return NotFound();
        }

        return land;
    }

    // GET: api/lands/by-reference/{referenceNumber}
    [HttpGet("by-reference/{referenceNumber}")]
    public async Task<ActionResult<Land>> GetLandByReference(string referenceNumber)
    {
        var land = await _context.Lands
            .FirstOrDefaultAsync(l => l.ReferenceNumber == referenceNumber);

        if (land == null)
        {
            return NotFound();
        }

        return land;
    }

    // POST: api/lands/search
    [HttpPost("search")]
    public async Task<ActionResult<IEnumerable<Land>>> SearchLands([FromBody] LandSearchCriteria criteria)
    {
        var query = _context.Lands.AsQueryable();

        if (!string.IsNullOrEmpty(criteria.Governorate))
            query = query.Where(l => l.Headquarters == criteria.Governorate);

        if (!string.IsNullOrEmpty(criteria.UsageStatus))
            query = query.Where(l => l.UsageStatus == criteria.UsageStatus);

        if (!string.IsNullOrEmpty(criteria.ApprovalStatus))
            query = query.Where(l => l.ApprovalStatus == criteria.ApprovalStatus);

        if (!string.IsNullOrEmpty(criteria.Phase))
            query = query.Where(l => l.Phase == criteria.Phase);

        return await query.OrderByDescending(l => l.CreatedAt).ToListAsync();
    }

    // POST: api/lands
    [HttpPost]
    public async Task<ActionResult<Land>> CreateLand(Land land)
    {
        land.Id = Guid.NewGuid();
        land.CreatedAt = DateTime.UtcNow;
        land.UpdatedAt = DateTime.UtcNow;

        _context.Lands.Add(land);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLand), new { id = land.Id }, land);
    }

    // PUT: api/lands/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLand(Guid id, Land land)
    {
        if (id != land.Id)
        {
            return BadRequest();
        }

        land.UpdatedAt = DateTime.UtcNow;
        _context.Entry(land).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!LandExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/lands/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLand(Guid id)
    {
        var land = await _context.Lands.FindAsync(id);
        if (land == null)
        {
            return NotFound();
        }

        _context.Lands.Remove(land);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // GET: api/lands/{landId}/buildings
    [HttpGet("{landId}/buildings")]
    public async Task<ActionResult<IEnumerable<object>>> GetBuildingLocations(Guid landId)
    {
        var locations = await _context.BuildingLocations
            .Where(b => b.LandId == landId)
            .ToListAsync();
        
        // Map to DTO with camelCase property names for JSON serialization
        var result = locations.Select(b => new 
        {
            id = b.Id,
            code = b.Code,
            locationName = b.LocationName,
            coordinates = b.Coordinates,
            status = b.Status,
            requiredStatus = b.RequiredStatus,
            neighborDescription = b.NeighborDescription ?? ""
        }).ToList();
        
        return result;
    }

    // GET: api/lands/{landId}/coordinates
    [HttpGet("{landId}/coordinates")]
    public async Task<ActionResult<IEnumerable<LandCoordinate>>> GetLandCoordinates(Guid landId)
    {
        return await _context.LandCoordinates
            .Where(c => c.LandId == landId)
            .OrderBy(c => c.PointNumber)
            .ToListAsync();
    }

    // POST: api/lands/{landId}/coordinates
    [HttpPost("{landId}/coordinates")]
    public async Task<ActionResult<LandCoordinate>> AddLandCoordinate(Guid landId, LandCoordinate coordinate)
    {
        coordinate.Id = Guid.NewGuid();
        coordinate.LandId = landId;
        coordinate.CreatedAt = DateTime.UtcNow;

        _context.LandCoordinates.Add(coordinate);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLandCoordinates), new { landId }, coordinate);
    }

    private bool LandExists(Guid id)
    {
        return _context.Lands.Any(e => e.Id == id);
    }
}

public class LandSearchCriteria
{
    public string? Governorate { get; set; }
    public string? UsageStatus { get; set; }
    public string? ApprovalStatus { get; set; }
    public string? Phase { get; set; }
}
