using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public abstract class Create
{
    public class Command : IRequest<Unit>
    {
        public ActivityTask? Activity { get; set; }
    }
    
    public class Handler(DataContext _context) : IRequestHandler<Command, Unit>
    {
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            _context.Activities.Add(request.Activity);
            await _context.SaveChangesAsync(cancellationToken);
            
            return Unit.Value;
        }
    }
}