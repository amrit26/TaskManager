import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask, getTasks, updateTaskStatus } from "../api/tasks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TaskList() {
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateTaskStatus(id, { status: status as any }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const remove = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  if (isLoading) return <p>Loading tasks…</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="space-y-3">
      {data?.map((t) => (
        <div key={t.id} className="flex items-center justify-between border p-3 rounded">
          <div>
            <div className="font-medium">{t.title}</div>
            {t.description && <div className="text-sm text-muted-foreground">{t.description}</div>}
            <div className="text-xs text-muted-foreground">
              Due: {new Date(t.dueAt).toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge>{t.status}</Badge>

            <Select
              defaultValue={t.status}
              onValueChange={(v) => updateStatus.mutate({ id: t.id, status: v })}
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NotStarted">Not Started</SelectItem>
                <SelectItem value="InProgress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="destructive" size="sm" onClick={() => remove.mutate(t.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
