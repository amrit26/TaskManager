using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Domain;

namespace TaskManager.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TaskItem> Tasks { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TaskItem>(entity =>
        {
            entity.ToTable("Tasks");

            entity.HasKey(x => x.Id);
            entity.Property(x => x.Id).ValueGeneratedNever();
            entity.Property(x => x.Title)
                  .IsRequired()
                  .HasMaxLength(200);
            entity.Property(x => x.Description)
                  .HasMaxLength(2000);
            entity.Property(x => x.Status)
                  .HasConversion<int>()
                  .IsRequired();
            entity.Property(x => x.DueAt).IsRequired();
            entity.Property(x => x.CreatedAt).IsRequired();
        });
    }
}
