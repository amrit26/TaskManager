import { api } from "./client";
import type { CreateTaskRequest, TaskResponse, UpdateTaskStatusRequest } from "../types/task";

export async function getTasks(): Promise<TaskResponse[]> {
  const res = await api.get("/api/tasks");
  return res.data;
}

export async function getTaskById(id: string): Promise<TaskResponse> {
  const res = await api.get(`/api/tasks/${id}`);
  return res.data;
}

export async function createTask(payload: CreateTaskRequest): Promise<TaskResponse> {
  const res = await api.post("/api/tasks", payload);
  return res.data;
}

export async function updateTaskStatus(id: string, payload: UpdateTaskStatusRequest): Promise<TaskResponse> {
  const res = await api.patch(`/api/tasks/${id}/status`, payload);
  return res.data;
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/api/tasks/${id}`);
}
