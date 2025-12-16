using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.Domain;
using TaskStatus = TaskManager.Api.Domain.TaskStatus;

namespace TaskManager.Api.Tests.Data;

public class TaskRepositorySqliteTests
{
    private static AppDbContext CreateDb()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite("DataSource=:memory:")
            .Options;

        var db = new AppDbContext(options);
        db.Database.OpenConnection();   // required for SQLite in-memory
        db.Database.EnsureCreated();    // create schema from model
        return db;
    }

    [Fact]
    public async Task Repository_PersistsData_InSqlite()
    {
        using var db = CreateDb();
        var repo = new TaskRepository(db);

        var entity = new TaskItem
        {
            Title = "Persisted task",
            Description = "Stored in SQLite",
            Status = TaskStatus.InProgress,
            DueAt = DateTime.UtcNow.AddDays(3)
        };

        await repo.AddAsync(entity, CancellationToken.None);

        var fetched = await repo.GetByIdAsync(entity.Id, CancellationToken.None);

        fetched.Should().NotBeNull();
        fetched!.Title.Should().Be("Persisted task");
        fetched.Description.Should().Be("Stored in SQLite");
        fetched.Status.Should().Be(TaskStatus.InProgress);
    }
}
