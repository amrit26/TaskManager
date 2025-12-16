export type TaskStatus = "NotStarted" | "InProgress" | "Completed";

export type TaskResponse = {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  dueAt: string;
  createdAt: string;
};

export type CreateTaskRequest = {
  title: string;
  description?: string | null;
  status: TaskStatus;
  dueAt: string;
};

export type UpdateTaskStatusRequest = {
  status: TaskStatus;
};
