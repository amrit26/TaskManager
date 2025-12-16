using FluentValidation;
using Hellang.Middleware.ProblemDetails;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using TaskManager.Api.Data;
using TaskManager.Api.Service;
using TaskManager.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Controllers + JSON enums as strings
builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DbContext
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite($"Data Source={Path.Combine(builder.Environment.ContentRootPath, "App_Data", "tasks.db")}"));

// DI
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

// FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

// ProblemDetails
builder.Services.AddProblemDetails(options =>
{
    options.IncludeExceptionDetails = (ctx, ex) => builder.Environment.IsDevelopment();
    options.MapToStatusCode<ArgumentException>(StatusCodes.Status400BadRequest);
    options.MapToStatusCode<InvalidOperationException>(StatusCodes.Status409Conflict);
    options.MapToStatusCode<Exception>(StatusCodes.Status500InternalServerError);
});

var app = builder.Build();

// ---- DB initialization BEFORE handling requests ----
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // Ensure db file exists
    db.Database.EnsureCreated();

    // Ensure Tasks table exists (no migrations)
    db.Database.ExecuteSqlRaw("""
        CREATE TABLE IF NOT EXISTS Tasks (
            Id TEXT PRIMARY KEY,
            Title TEXT NOT NULL,
            Description TEXT,
            Status INTEGER NOT NULL,
            DueAt TEXT NOT NULL,
            CreatedAt TEXT NOT NULL
        );
    """);
}

// Middleware pipeline
app.UseCors("Frontend");
app.UseProblemDetails();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
