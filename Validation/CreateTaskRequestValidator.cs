using FluentValidation;
using TaskManager.Api.Dtos;

namespace TaskManager.Api.Validation;

public sealed class CreateTaskRequestValidator : AbstractValidator<CreateTaskRequest>
{
    public CreateTaskRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);
        RuleFor(x => x.Description)
            .MaximumLength(2000);
        RuleFor(x => x.DueAt)
            .Must(d => d > DateTimeOffset.UtcNow)
            .WithMessage("DueAt must be in the future.");
    }
}
