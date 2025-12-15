using TaskStatus = TaskManager.Api.Domain.TaskStatus;

namespace TaskManager.Api.Dtos;

public record TaskResponse(
    Guid Id,
    string Title,
    string? Description,
    TaskStatus Status,
    DateTimeOffset DueAt,
    DateTimeOffset CreatedAt
);
