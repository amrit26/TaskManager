using TaskStatus = TaskManager.Api.Domain.TaskStatus;

namespace TaskManager.Api.Dtos;

public record CreateTaskRequest(
    string Title,
    string? Description,
    TaskStatus Status,
    DateTimeOffset DueAt
);
