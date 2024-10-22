using Domain;
using Application.Activities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivityTaskController : BaseApiController
{
    [HttpGet] //api/activitytask
    public async Task<ActionResult<List<ActivityTask>>> GetActivities() => await Mediator?.Send(new List.Query())!;

    [HttpGet("{id}")] //api/activitytask/{id}
    public async Task<ActionResult<ActivityTask>> GetActivity(Guid id) => await Mediator?.Send(new Details.Query { Id = id })!;

    [HttpPost] //api/activitytask/
    public async Task<IActionResult> CreateActivity(ActivityTask activityTask) => Ok(await Mediator?.Send(new Create.Command { Activity = activityTask })!);
    
    [HttpDelete("{id}")] //api/activitytask/
    public async Task<IActionResult> DeleteActivity(Guid id) => Ok(await Mediator?.Send(new Delete.Command { Id = id })!);
    
    [HttpPut("{id}")] //api/activitytask/id
    public async Task<IActionResult> EditActivity(Guid id, ActivityTask activityTask)
    {
        activityTask.Id = id;
        return Ok(await Mediator?.Send(new Edit.Command { Activity = activityTask })!);
    }
}