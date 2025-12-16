using TaskManager.Api.Dtos;
using TaskStatus = TaskManager.Api.Domain.TaskStatus;

namespace TaskManager.Api.Services;

public interface ITaskService
{
    Task<TaskResponse> CreateAsync(CreateTaskRequest request, CancellationToken ct);
    Task<TaskResponse?> GetByIdAsync(Guid id, CancellationToken ct);
    Task<IReadOnlyList<TaskResponse>> GetAllAsync(CancellationToken ct);
    Task<TaskResponse?> UpdateStatusAsync(Guid id, TaskStatus status, CancellationToken ct);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct);
}
