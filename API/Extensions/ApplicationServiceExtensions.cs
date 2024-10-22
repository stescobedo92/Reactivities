using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddDbContext<DataContext>(options => options.UseSqlite(config.GetConnectionString("DefaultConnection")));
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", policy =>
            {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
            });
        });
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Create.Handler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Edit.Handler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Details.Handler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Delete.Handler).Assembly));
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);

        return services;
    }
}