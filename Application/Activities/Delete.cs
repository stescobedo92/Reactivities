using MediatR;
using Persistence;

namespace Application.Activities;

public abstract class Delete
{
    public class Command : IRequest<Unit>
    {
        public Guid Id { get; set; }
    }
    
    public class Handler(DataContext _context) : IRequestHandler<Command, Unit>
    {
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Id, cancellationToken);

            _context.Activities.Remove(activity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}