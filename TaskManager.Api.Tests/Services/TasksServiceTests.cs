using FluentAssertions;
using Moq;
using TaskManager.Api.Data;
using TaskManager.Api.Domain;
using TaskManager.Api.Dtos;
using TaskManager.Api.Service;
using TaskStatus = TaskManager.Api.Domain.TaskStatus;

namespace TaskManager.Api.Tests.Services;

public class TasksServiceTests
{
    private readonly Mock<ITaskRepository> _repo = new();
    private readonly TaskService _svc;

    public TasksServiceTests()
    {
        _svc = new TaskService(_repo.Object);
    }
    [Fact]
    public async Task CreateTask_Works()
    {
        // Arrange
        var req = new CreateTaskRequest(
            Title: "Create task",
            Description: null,
            Status: TaskStatus.NotStarted,
            DueAt: DateTime.UtcNow.AddDays(1)
        );

        _repo.Setup(r => r.AddAsync(It.IsAny<TaskItem>(), It.IsAny<CancellationToken>()))
             .ReturnsAsync((TaskItem t, CancellationToken _) => t);

        // Act
        var created = await _svc.CreateAsync(req, CancellationToken.None);

        // Assert
        created.Should().NotBeNull();
        created.Title.Should().Be("Create task");
        created.Status.Should().Be(TaskStatus.NotStarted);

        _repo.Verify(r => r.AddAsync(It.IsAny<TaskItem>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task GetById_ReturnsNull_WhenMissing()
    {
        // Arrange
        var id = Guid.NewGuid();

        _repo.Setup(r => r.GetByIdAsync(id, It.IsAny<CancellationToken>()))
             .ReturnsAsync((TaskItem?)null);

        // Act
        var result = await _svc.GetByIdAsync(id, CancellationToken.None);

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task UpdateStatus_OnlyUpdatesStatus()
    {
        // Arrange
        var id = Guid.NewGuid();

        _repo.Setup(r => r.UpdateStatusAsync(id, TaskStatus.Completed, It.IsAny<CancellationToken>()))
             .ReturnsAsync(new TaskItem
             {
                 Id = id,
                 Title = "Original title",
                 Description = "Original desc",
                 DueAt = DateTime.UtcNow.AddDays(2),
                 Status = TaskStatus.Completed,
                 CreatedAt = DateTime.UtcNow.AddHours(-1)
             });

        // Act
        var updated = await _svc.UpdateStatusAsync(id, TaskStatus.Completed, CancellationToken.None);

        // Assert
        updated.Should().NotBeNull();
        updated!.Status.Should().Be(TaskStatus.Completed);
        updated.Title.Should().Be("Original title");
        updated.Description.Should().Be("Original desc");
    }

    [Fact]
    public async Task Delete_RemovesTask()
    {
        // Arrange
        var id = Guid.NewGuid();
        _repo.Setup(r => r.DeleteAsync(id, It.IsAny<CancellationToken>()))
             .ReturnsAsync(true);

        // Act
        var deleted = await _svc.DeleteAsync(id, CancellationToken.None);

        // Assert
        deleted.Should().BeTrue();
        _repo.Verify(r => r.DeleteAsync(id, It.IsAny<CancellationToken>()), Times.Once);
    }

}
