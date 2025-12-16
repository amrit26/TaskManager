using TaskStatus = TaskManager.Api.Domain.TaskStatus;

namespace TaskManager.Api.Dtos;

public record UpdateTaskStatusRequest(TaskStatus Status);
