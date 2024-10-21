using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivityTaskController : BaseApiController
{
    private readonly IMediator _mediator;

    public ActivityTaskController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet] //api/activitytask
    public async Task<ActionResult<List<ActivityTask>>> GetActivities() => await _mediator.Send(new List.Query());

    [HttpGet("{id}")] //api/activitytask/{id}
    public async Task<ActionResult<ActivityTask>> GetActivity(Guid id) => Ok();
}