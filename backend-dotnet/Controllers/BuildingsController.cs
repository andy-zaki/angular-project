using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularProjectApi.Data;
using AngularProjectApi.Models;

namespace AngularProjectApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BuildingsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BuildingsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Building>>> GetBuildings()
    {
        return await _context.Buildings.OrderByDescending(b => b.CreatedAt).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Building>> GetBuilding(Guid id)
    {
        var building = await _context.Buildings.FindAsync(id);
        if (building == null) return NotFound();
        return building;
    }

    [HttpGet("by-number/{buildingNumber}")]
    public async Task<ActionResult<Building>> GetBuildingByNumber(string buildingNumber)
    {
        var building = await _context.Buildings.FirstOrDefaultAsync(b => b.BuildingNumber == buildingNumber);
        if (building == null) return NotFound();
        return building;
    }

    [HttpPost("search")]
    public async Task<ActionResult<IEnumerable<Building>>> SearchBuildings([FromBody] BuildingSearchCriteria criteria)
    {
        var query = _context.Buildings.AsQueryable();
        if (!string.IsNullOrEmpty(criteria.Governorate)) query = query.Where(b => b.Governorate == criteria.Governorate);
        if (!string.IsNullOrEmpty(criteria.Stage)) query = query.Where(b => b.Stage == criteria.Stage);
        if (!string.IsNullOrEmpty(criteria.Affiliation)) query = query.Where(b => b.Affiliation == criteria.Affiliation);
        if (!string.IsNullOrEmpty(criteria.UsageStatus)) query = query.Where(b => b.UsageStatus == criteria.UsageStatus);
        if (!string.IsNullOrEmpty(criteria.EducationType)) query = query.Where(b => b.EducationType == criteria.EducationType);
        return await query.OrderByDescending(b => b.CreatedAt).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Building>> CreateBuilding(Building building)
    {
        building.Id = Guid.NewGuid();
        building.CreatedAt = building.UpdatedAt = DateTime.UtcNow;
        _context.Buildings.Add(building);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBuilding), new { id = building.Id }, building);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBuilding(Guid id, Building building)
    {
        if (id != building.Id) return BadRequest();
        building.UpdatedAt = DateTime.UtcNow;
        _context.Entry(building).State = EntityState.Modified;
        try { await _context.SaveChangesAsync(); }
        catch (DbUpdateConcurrencyException) { if (!_context.Buildings.Any(e => e.Id == id)) return NotFound(); throw; }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBuilding(Guid id)
    {
        var building = await _context.Buildings.FindAsync(id);
        if (building == null) return NotFound();
        _context.Buildings.Remove(building);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("{buildingNumber}/basic-data")]
    public async Task<ActionResult<BuildingBasicData>> GetBuildingBasicData(string buildingNumber)
    {
        var data = await _context.BuildingBasicData.FirstOrDefaultAsync(b => b.BuildingNumber == buildingNumber);
        return data == null ? NotFound() : data;
    }

    [HttpGet("{buildingId:guid}/annexes")]
    public async Task<ActionResult<IEnumerable<BuildingAnnex>>> GetBuildingAnnexes(Guid buildingId)
    {
        return await _context.BuildingAnnexes.Where(a => a.BuildingId == buildingId).ToListAsync();
    }

    [HttpGet("{buildingId:guid}/network-costs")]
    public async Task<ActionResult<IEnumerable<NetworkCost>>> GetNetworkCosts(Guid buildingId)
    {
        return await _context.NetworkCosts.Where(n => n.BuildingId == buildingId).ToListAsync();
    }

    [HttpPost("{buildingNumber}/basic-data")]
    public async Task<ActionResult<BuildingBasicData>> AddBuildingBasicData(string buildingNumber, BuildingBasicData data)
    {
        data.Id = Guid.NewGuid();
        data.BuildingNumber = buildingNumber;
        data.CreatedAt = data.UpdatedAt = DateTime.UtcNow;
        _context.BuildingBasicData.Add(data);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBuildingBasicData), new { buildingNumber }, data);
    }

    [HttpPost("{buildingId:guid}/annexes")]
    public async Task<ActionResult<BuildingAnnex>> AddBuildingAnnex(Guid buildingId, BuildingAnnex annex)
    {
        annex.Id = Guid.NewGuid();
        annex.BuildingId = buildingId;
        annex.CreatedAt = DateTime.UtcNow;
        _context.BuildingAnnexes.Add(annex);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBuildingAnnexes), new { buildingId }, annex);
    }

    [HttpPost("{buildingId:guid}/network-costs")]
    public async Task<ActionResult<NetworkCost>> AddNetworkCost(Guid buildingId, NetworkCost cost)
    {
        cost.Id = Guid.NewGuid();
        cost.BuildingId = buildingId;
        cost.CreatedAt = cost.UpdatedAt = DateTime.UtcNow;
        _context.NetworkCosts.Add(cost);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetNetworkCosts), new { buildingId }, cost);
    }
}

public class BuildingSearchCriteria
{
    public string? Governorate { get; set; }
    public string? Stage { get; set; }
    public string? Affiliation { get; set; }
    public string? UsageStatus { get; set; }
    public string? EducationType { get; set; }
}
