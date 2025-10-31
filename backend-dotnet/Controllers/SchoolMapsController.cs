using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularProjectApi.Data;
using AngularProjectApi.Models;

namespace AngularProjectApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SchoolMapsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SchoolMapsController(ApplicationDbContext context) => _context = context;

    [HttpGet("study-periods/{buildingNumber}")]
    public async Task<ActionResult<IEnumerable<StudyPeriod>>> GetStudyPeriods(string buildingNumber)
        => await _context.StudyPeriods.Where(s => s.BuildingNumber == buildingNumber).OrderBy(s => s.Period).ToListAsync();

    [HttpGet("roads/{buildingId}")]
    public async Task<ActionResult<IEnumerable<SchoolRoad>>> GetSchoolRoads(string buildingId)
        => await _context.SchoolRoads.Where(r => r.BuildingId == buildingId).ToListAsync();

    [HttpGet("annexes/{buildingId}")]
    public async Task<ActionResult<IEnumerable<SchoolAnnex>>> GetSchoolAnnexes(string buildingId)
        => await _context.SchoolAnnexes.Where(a => a.BuildingId == buildingId).ToListAsync();

    [HttpGet("spaces/{buildingId}")]
    public async Task<ActionResult<IEnumerable<SchoolSpace>>> GetSchoolSpaces(string buildingId)
        => await _context.SchoolSpaces.Where(s => s.BuildingId == buildingId).ToListAsync();

    [HttpGet("educational-buildings/{buildingNumber}")]
    public async Task<ActionResult<EducationalBuilding>> GetEducationalBuilding(string buildingNumber)
    {
        var building = await _context.EducationalBuildings.FirstOrDefaultAsync(e => e.BuildingNumber == buildingNumber);
        return building == null ? NotFound() : building;
    }

    [HttpGet("educational-buildings")]
    public async Task<ActionResult<IEnumerable<EducationalBuilding>>> GetEducationalBuildings()
        => await _context.EducationalBuildings.OrderBy(e => e.BuildingNumber).ToListAsync();

    [HttpPost("study-periods")]
    public async Task<ActionResult<StudyPeriod>> AddStudyPeriod(StudyPeriod period)
    {
        period.Id = Guid.NewGuid();
        period.CreatedAt = period.UpdatedAt = DateTime.UtcNow;
        _context.StudyPeriods.Add(period);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetStudyPeriods), new { buildingNumber = period.BuildingNumber }, period);
    }

    [HttpPost("roads")]
    public async Task<ActionResult<SchoolRoad>> AddSchoolRoad(SchoolRoad road)
    {
        road.Id = Guid.NewGuid();
        road.CreatedAt = DateTime.UtcNow;
        _context.SchoolRoads.Add(road);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSchoolRoads), new { buildingId = road.BuildingId }, road);
    }

    [HttpPost("annexes")]
    public async Task<ActionResult<SchoolAnnex>> AddSchoolAnnex(SchoolAnnex annex)
    {
        annex.Id = Guid.NewGuid();
        annex.CreatedAt = annex.UpdatedAt = DateTime.UtcNow;
        _context.SchoolAnnexes.Add(annex);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSchoolAnnexes), new { buildingId = annex.BuildingId }, annex);
    }

    [HttpPost("spaces")]
    public async Task<ActionResult<SchoolSpace>> AddSchoolSpace(SchoolSpace space)
    {
        space.Id = Guid.NewGuid();
        space.CreatedAt = space.UpdatedAt = DateTime.UtcNow;
        _context.SchoolSpaces.Add(space);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSchoolSpaces), new { buildingId = space.BuildingId }, space);
    }

    [HttpPost("educational-buildings")]
    public async Task<ActionResult<EducationalBuilding>> CreateEducationalBuilding(EducationalBuilding building)
    {
        building.Id = Guid.NewGuid();
        building.CreatedAt = building.UpdatedAt = DateTime.UtcNow;
        _context.EducationalBuildings.Add(building);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEducationalBuilding), new { buildingNumber = building.BuildingNumber }, building);
    }

    [HttpPut("educational-buildings/{id}")]
    public async Task<IActionResult> UpdateEducationalBuilding(Guid id, EducationalBuilding building)
    {
        if (id != building.Id) return BadRequest();
        building.UpdatedAt = DateTime.UtcNow;
        _context.Entry(building).State = EntityState.Modified;
        try { await _context.SaveChangesAsync(); }
        catch (DbUpdateConcurrencyException) { if (!_context.EducationalBuildings.Any(e => e.Id == id)) return NotFound(); throw; }
        return NoContent();
    }
}
