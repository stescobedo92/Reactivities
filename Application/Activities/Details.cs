using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public abstract class Details
{
    public class Query : IRequest<ActivityTask>
    {
        public Guid Id { get; set; }
    }
    
    public class Handler(DataContext _context) : IRequestHandler<Query, ActivityTask>
    {
        public async Task<ActivityTask> Handle(Query request, CancellationToken cancellationToken) =>
            await _context.Activities.FindAsync(request.Id) ?? default;
    }
}