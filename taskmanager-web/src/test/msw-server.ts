import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

type TaskStatus = "NotStarted" | "InProgress" | "Completed";

type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  dueAt: string;
  createdAt: string;
};

const API = "http://localhost:5271";

let tasks: Task[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    title: "Seed Task",
    description: "From MSW",
    status: "NotStarted",
    dueAt: new Date(Date.now() + 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const server = setupServer(
  // GET /api/tasks
  http.get(`${API}/api/tasks`, () => {
    return HttpResponse.json(tasks, { status: 200 });
  }),

  // POST /api/tasks
  http.post(`${API}/api/tasks`, async ({ request }) => {
    const body = (await request.json()) as {
      title: string;
      description?: string | null;
      status: TaskStatus;
      dueAt: string;
    };

    const created: Task = {
      id: crypto.randomUUID(),
      title: body.title,
      description: body.description ?? null,
      status: body.status,
      dueAt: body.dueAt,
      createdAt: new Date().toISOString(),
    };

    tasks = [...tasks, created];
    return HttpResponse.json(created, { status: 201 });
  }),

  // PATCH /api/tasks/:id/status
  http.patch(`${API}/api/tasks/:id/status`, async ({ params, request }) => {
    const { id } = params as { id: string };
    const body = (await request.json()) as { status: TaskStatus };

    const idx = tasks.findIndex((t) => t.id === id);
    if (idx < 0) return new HttpResponse(null, { status: 404 });

    tasks[idx] = { ...tasks[idx], status: body.status };
    return HttpResponse.json(tasks[idx], { status: 200 });
  }),

  // DELETE /api/tasks/:id
  http.delete(`${API}/api/tasks/:id`, ({ params }) => {
    const { id } = params as { id: string };
    const before = tasks.length;
    tasks = tasks.filter((t) => t.id !== id);
    return new HttpResponse(null, { status: before === tasks.length ? 404 : 204 });
  })
);

// helper to reset state between tests
export function resetTasks() {
  tasks = [
    {
      id: "11111111-1111-1111-1111-111111111111",
      title: "Seed Task",
      description: "From MSW",
      status: "NotStarted",
      dueAt: new Date(Date.now() + 86400000).toISOString(),
      createdAt: new Date().toISOString(),
    },
  ];
}
