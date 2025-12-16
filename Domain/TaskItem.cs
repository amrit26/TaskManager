using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Domain
{
    public class TaskItem
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [MaxLength(2000)]
        public string? Description { get; set; }
        
        public TaskStatus Status { get; set; } = TaskStatus.NotStarted;
        public DateTime DueAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
