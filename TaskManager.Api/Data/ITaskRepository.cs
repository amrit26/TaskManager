using TaskManager.Api.Domain;
using TaskStatus = TaskManager.Api.Domain.TaskStatus;

namespace TaskManager.Api.Data;

public interface ITaskRepository
{
    Task<TaskItem> AddAsync(TaskItem task, CancellationToken ct);
    Task<TaskItem?> GetByIdAsync(Guid id, CancellationToken ct);
    Task<List<TaskItem>> GetAllAsync(CancellationToken ct);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct);
    Task<TaskItem?> UpdateStatusAsync(Guid id, TaskStatus status, CancellationToken ct);
}
