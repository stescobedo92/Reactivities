using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivityTaskController : BaseApiController
{
    [HttpGet] //api/activitytask
    public async Task<ActionResult<List<ActivityTask>>> GetActivities() => await Mediator?.Send(new List.Query())!;

    [HttpGet("{id}")] //api/activitytask/{id}
    public async Task<ActionResult<ActivityTask>> GetActivity(Guid id) => Ok();
}