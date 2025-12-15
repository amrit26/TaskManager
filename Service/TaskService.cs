using TaskManager.Api.Data;
using TaskManager.Api.Domain;
using TaskStatus = TaskManager.Api.Domain.TaskStatus;
using TaskManager.Api.Dtos;
using TaskManager.Api.Services;

namespace TaskManager.Api.Service;

public sealed class TaskService : ITaskService
{
    private readonly ITaskRepository _repo;
    public TaskService(ITaskRepository repo) => _repo = repo;
    public async Task<TaskResponse> CreateAsync(CreateTaskRequest request, CancellationToken ct)
    {
        var entity = new TaskItem
        {
            Title = request.Title.Trim(),
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
            Status = request.Status,
            DueAt = request.DueAt
        };

        var created = await _repo.AddAsync(entity, ct);
        return Map(created);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct) =>
        await _repo.DeleteAsync(id, ct);

    public async Task<IReadOnlyList<TaskResponse>> GetAllAsync(CancellationToken ct)
    {
        var entities = await _repo.GetAllAsync(ct);
        return entities.Select(Map).ToList();
    }

    public async Task<TaskResponse?> GetByIdAsync(Guid id, CancellationToken ct)
    {
        var entity = await _repo.GetByIdAsync(id, ct);
        return entity is null ? null : Map(entity);
    }

    public async Task<TaskResponse?> UpdateStatusAsync(Guid id, TaskStatus status, CancellationToken ct)
    {
        var updated = await _repo.UpdateStatusAsync(id, status, ct);
        return updated is null ? null : Map(updated);
    }

    private static TaskResponse Map(TaskItem x) =>
        new(x.Id, x.Title, x.Description, x.Status, x.DueAt, x.CreatedAt);
}
