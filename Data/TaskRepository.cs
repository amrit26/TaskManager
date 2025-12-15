using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Domain;
using TaskStatus = TaskManager.Api.Domain.TaskStatus;

namespace TaskManager.Api.Data;

public sealed class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _db;

    public TaskRepository(AppDbContext db) => _db = db;

    public async Task<TaskItem> AddAsync(TaskItem task, CancellationToken ct)
    {
        _db.Tasks.Add(task);
        await _db.SaveChangesAsync(ct);
        return task;
    }

    public Task<TaskItem?> GetByIdAsync(Guid id, CancellationToken ct) =>
        _db.Tasks.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct);

    public Task<List<TaskItem>> GetAllAsync(CancellationToken ct) =>
        _db.Tasks.AsNoTracking()
            .OrderBy(x => x.DueAt)
            .ToListAsync(ct);

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct)
    {
        var entity = await _db.Tasks.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return false;

        _db.Tasks.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return true;
    }

    public async Task<TaskItem?> UpdateStatusAsync(Guid id, TaskStatus status, CancellationToken ct)
    {
        var entity = await _db.Tasks.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity is null) return null;

        entity.Status = status;
        await _db.SaveChangesAsync(ct);
        return entity;
    }
}
