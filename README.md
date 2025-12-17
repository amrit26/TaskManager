# Task Manager – DTS Technical Developer Test

This repository contains a full-stack Task Manager application built as part of the DTS Technical Developer Test.  
It demonstrates clean backend architecture using .NET 8, a modern React frontend, and a pragmatic approach to testing.

The focus of this solution is **clarity, maintainability, and correctness**, rather than unnecessary complexity.

---

## Repository Structure

```
TaskManager/
├── TaskManager.Api/          # ASP.NET Core Web API (.NET 8)
├── TaskManager.Api.Tests/    # Backend unit & integration tests (xUnit)
├── taskmanager-web/          # React frontend (Vite + TypeScript)
└── README.md
```

---

## Backend – TaskManager.Api

### Technology Stack
- **.NET 8** (ASP.NET Core Web API)
- **Entity Framework Core** with **SQLite**
- **FluentValidation** for request validation
- **Swagger / OpenAPI** for API exploration
- **Problem Details middleware** for consistent error responses

### Architecture
The backend follows a clear separation of concerns:

- **Controllers** – HTTP request handling only
- **Services** – business logic
- **Data / Repositories** – persistence concerns
- **Domain** – core entities and enums
- **DTOs** – API contracts
- **Validation** – request validation rules

This structure keeps the codebase testable and easy to navigate.

### API Endpoints (Summary)
- `POST /api/tasks` – Create a task
- `GET /api/tasks` – Get all tasks
- `GET /api/tasks/{id}` – Get task by ID
- `PATCH /api/tasks/{id}/status` – Update task status
- `DELETE /api/tasks/{id}` – Delete a task

### Running the Backend
From the repository root:

```bash
cd TaskManager.Api
dotnet restore
dotnet run
```

Swagger will be available at:

```
http://localhost:5271/swagger
```

---

## Frontend – taskmanager-web

### Technology Stack
- **React** with **TypeScript**
- **Vite** for fast development builds
- **TanStack React Query** for server state management
- **React Hook Form + Zod** for form handling and validation
- **shadcn/ui** (Radix UI + Tailwind CSS) for UI components

### Frontend Design Notes
- Server state is handled exclusively via React Query
- Forms are validated client-side with Zod schemas
- UI components are kept small and composable
- The frontend communicates with the backend via a typed API layer

### Running the Frontend
From the repository root:

```bash
cd taskmanager-web
npm install
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

> The frontend is configured to communicate with the backend running on `http://localhost:5271`.

---

## Testing Strategy

### Backend Tests
Located in `TaskManager.Api.Tests`.

- **xUnit** is used as the test framework
- Tests focus on:
  - Service behaviour
  - Repository integration with SQLite
  - Controller behaviour where appropriate
- Only meaningful tests are included (no trivial getter/setter tests)

Run backend tests:

```bash
dotnet test
```

### Frontend Tests
- **Vitest** + **Testing Library**
- **MSW (Mock Service Worker)** is used to mock API calls
- Tests focus on:
  - User-visible behaviour
  - Validation rules
  - Correct interaction with API state

Example:
- Submitting a task with missing required fields is blocked
- Tasks are rendered correctly when data is returned

Run frontend tests:

```bash
cd taskmanager-web
npm run test
```

---

## Design Decisions & Trade-offs

- **SQLite** was chosen for simplicity and portability
- **React Query** was used instead of manual state management to avoid duplication of server state
- **MSW** was chosen for frontend tests to avoid brittle mocks and to test behaviour realistically
- Validation is performed both client-side and server-side to ensure robustness

---

## Assumptions
- Authentication and authorization are out of scope for this challenge
- The application is intended for single-user usage
- Performance optimisations are secondary to clarity and correctness

---

## Final Notes

This solution prioritises:
- Readable code
- Sensible architecture
- Meaningful tests
- Clear separation of responsibilities

The repository is structured to make future changes straightforward and to support discussion during a technical interview.
