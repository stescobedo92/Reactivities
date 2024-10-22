using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class List
{
    public class Query : IRequest<List<ActivityTask>> { }

    public class Handler(DataContext _context) : IRequestHandler<Query, List<ActivityTask>>
    {
        public async Task<List<ActivityTask>> Handle(Query request, CancellationToken cancellationToken) =>
            await _context.Activities.ToListAsync(cancellationToken: cancellationToken);
    }
}