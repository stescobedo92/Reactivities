using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivityTaskController : BaseApiController
{
    private readonly DataContext _context;

    public ActivityTaskController(DataContext context)
    {
        _context = context;
    }

    [HttpGet] //api/activitytask
    public async Task<ActionResult<List<ActivityTask>>> GetActivities()
    {
        return await _context.Activities.ToListAsync();
    }

    [HttpGet("{id}")] //api/activitytask/{id}
    public async Task<ActionResult<ActivityTask>> GetActivity(Guid id)
    {
        var activity = await _context.Activities.FindAsync(id);

        if (activity == null)
        {
            return NotFound();
        }
        return activity;
    }
}