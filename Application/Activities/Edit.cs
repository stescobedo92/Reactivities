using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public abstract class Edit
{
    public class Command : IRequest<Unit>
    {
        public ActivityTask Activity { get; set; } = null!;
    }
    
    public class Handler(DataContext _context, IMapper _mapper) : IRequestHandler<Command, Unit>
    {
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Activity.Id, cancellationToken);
            
            _mapper.Map(request.Activity, activity);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}