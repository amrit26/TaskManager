import { Navigate, Route, Routes as RRDRoutes } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { TasksPage } from "@/pages/TasksPage";
import { CustomersPage } from "@/pages/CustomersPage";
import { JobsPage } from "@/pages/JobsPage";

export function Routes() {
  return (
    <RRDRoutes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </RRDRoutes>
  );
}