using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularProjectApi.Data;
using AngularProjectApi.Models;

namespace AngularProjectApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DisplacementsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DisplacementsController(ApplicationDbContext context) => _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DisplacementRecord>>> GetDisplacements()
        => await _context.DisplacementRecords.OrderByDescending(d => d.CreatedAt).ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<DisplacementRecord>> GetDisplacement(Guid id)
    {
        var displacement = await _context.DisplacementRecords.FindAsync(id);
        return displacement == null ? NotFound() : displacement;
    }

    [HttpGet("by-reference/{referenceNumber}")]
    public async Task<ActionResult<DisplacementRecord>> GetByReference(string referenceNumber)
    {
        var displacement = await _context.DisplacementRecords.FirstOrDefaultAsync(d => d.ReferenceNumber == referenceNumber);
        return displacement == null ? NotFound() : displacement;
    }

    [HttpPost("search")]
    public async Task<ActionResult<IEnumerable<DisplacementRecord>>> SearchDisplacements([FromBody] DisplacementSearchCriteria criteria)
    {
        var query = _context.DisplacementRecords.AsQueryable();
        if (!string.IsNullOrEmpty(criteria.BuildingCode)) query = query.Where(d => d.BuildingCode == criteria.BuildingCode);
        if (!string.IsNullOrEmpty(criteria.DisplacementType)) query = query.Where(d => d.DisplacementType == criteria.DisplacementType);
        if (!string.IsNullOrEmpty(criteria.Status)) query = query.Where(d => d.Status == criteria.Status);
        return await query.OrderByDescending(d => d.CreatedAt).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<DisplacementRecord>> CreateDisplacement(DisplacementRecord displacement)
    {
        displacement.Id = Guid.NewGuid();
        displacement.CreatedAt = displacement.UpdatedAt = DateTime.UtcNow;
        _context.DisplacementRecords.Add(displacement);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetDisplacement), new { id = displacement.Id }, displacement);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDisplacement(Guid id, DisplacementRecord displacement)
    {
        if (id != displacement.Id) return BadRequest();
        displacement.UpdatedAt = DateTime.UtcNow;
        _context.Entry(displacement).State = EntityState.Modified;
        try { await _context.SaveChangesAsync(); }
        catch (DbUpdateConcurrencyException) { if (!_context.DisplacementRecords.Any(e => e.Id == id)) return NotFound(); throw; }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDisplacement(Guid id)
    {
        var displacement = await _context.DisplacementRecords.FindAsync(id);
        if (displacement == null) return NotFound();
        _context.DisplacementRecords.Remove(displacement);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("{displacementId}/compensation")]
    public async Task<ActionResult<IEnumerable<DisplacementCompensation>>> GetCompensation(Guid displacementId)
        => await _context.DisplacementCompensations.Where(c => c.DisplacementId == displacementId).OrderByDescending(c => c.PaymentDate).ToListAsync();

    [HttpGet("{displacementId}/council-approvals")]
    public async Task<ActionResult<IEnumerable<CouncilApproval>>> GetCouncilApprovals(Guid displacementId)
        => await _context.CouncilApprovals.Where(c => c.DisplacementId == displacementId).OrderByDescending(c => c.ApprovalDate).ToListAsync();

    [HttpPost("{displacementId}/compensation")]
    public async Task<ActionResult<DisplacementCompensation>> AddCompensation(Guid displacementId, DisplacementCompensation compensation)
    {
        compensation.Id = Guid.NewGuid();
        compensation.DisplacementId = displacementId;
        compensation.CreatedAt = DateTime.UtcNow;
        _context.DisplacementCompensations.Add(compensation);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCompensation), new { displacementId }, compensation);
    }

    [HttpPost("{displacementId}/council-approvals")]
    public async Task<ActionResult<CouncilApproval>> AddCouncilApproval(Guid displacementId, CouncilApproval approval)
    {
        approval.Id = Guid.NewGuid();
        approval.DisplacementId = displacementId;
        approval.CreatedAt = DateTime.UtcNow;
        _context.CouncilApprovals.Add(approval);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCouncilApprovals), new { displacementId }, approval);
    }
}

public class DisplacementSearchCriteria
{
    public string? BuildingCode { get; set; }
    public string? DisplacementType { get; set; }
    public string? Status { get; set; }
}
