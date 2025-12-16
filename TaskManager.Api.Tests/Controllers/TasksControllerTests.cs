using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using TaskManager.Api.Controllers;
using TaskManager.Api.Services;
using TaskManager.Api.Dtos;

namespace TaskManager.Api.Tests.Controllers;

public class TasksControllerTests
{
    [Fact]
    public async Task GetById_Returns404_WhenMissing()
    {
        // Arrange
        var svc = new Mock<ITaskService>();
        var id = Guid.NewGuid();

        svc.Setup(s => s.GetByIdAsync(id, It.IsAny<CancellationToken>()))
           .ReturnsAsync((TaskResponse?)null);

        var controller = new TasksController(svc.Object);

        // Act
        var result = await controller.GetById(id, CancellationToken.None);

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }
}
