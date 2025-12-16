import { Card } from "../components/ui/card";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

export function TasksPage() {
  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Task Manager</h1>
        <p className="text-sm text-muted-foreground">Create tasks, track progress, update status.</p>
      </div>

      <Card className="p-4">
        <TaskForm />
      </Card>

      <Card className="p-4">
        <TaskList />
      </Card>
    </div>
  );
}
