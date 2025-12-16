import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["NotStarted", "InProgress", "Completed"]),
  dueAt: z.string().min(1, "Due date/time is required"),
});

type FormData = z.infer<typeof schema>;

export function TaskForm() {
  const qc = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: "NotStarted" },
  });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      reset();
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutation.mutate({
          ...data,
          dueAt: new Date(data.dueAt).toISOString(),
        })
      )}
      className="space-y-4"
      aria-label="Create task form"
    >
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="title">
          Title
        </label>
        <Input id="title" placeholder="Task title" {...register("title")} />
        {errors.title && (
          <p className="text-sm text-red-600" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="description">
          Description
        </label>
        <Textarea
          id="description"
          placeholder="Description (optional)"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-600" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="status">
            Status
          </label>

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="status" aria-label="Status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NotStarted">Not Started</SelectItem>
                  <SelectItem value="InProgress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.status && (
            <p className="text-sm text-red-600" role="alert">
              {errors.status.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="dueAt">
            Due date/time
          </label>
          <Input
            id="dueAt"
            type="datetime-local"
            aria-label="Due date/time"
            {...register("dueAt")}
          />
          {errors.dueAt && (
            <p className="text-sm text-red-600" role="alert">
              {errors.dueAt.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : "Add Task"}
      </Button>

      {mutation.isError && (
        <p className="text-sm text-red-600" role="alert">
          {mutation.error.message}
        </p>
      )}
    </form>
  );
}
