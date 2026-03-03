import { useMemo } from "react";

type Job = {
  id: string;
  customerName: string;
  vehicle: string;
  status: "Booked" | "In Progress" | "QC" | "Complete";
  scheduledAt: string;
};

const demoJobs: Job[] = [
  { id: "J-1001", customerName: "Sam Taylor", vehicle: "VW Golf", status: "Booked", scheduledAt: "2026-03-01 10:00" },
  { id: "J-1002", customerName: "A Patel", vehicle: "Ford Focus", status: "In Progress", scheduledAt: "2026-03-01 11:30" }
];

export function JobsPage() {
  const jobs = useMemo(() => demoJobs, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Jobs</h1>
      <div className="rounded-lg border">
        <div className="grid grid-cols-5 gap-2 p-3 text-sm font-medium border-b bg-muted/40">
          <div>Job</div>
          <div>Customer</div>
          <div>Vehicle</div>
          <div>Status</div>
          <div>Scheduled</div>
        </div>
        {jobs.map((j) => (
          <div key={j.id} className="grid grid-cols-5 gap-2 p-3 text-sm border-b last:border-b-0">
            <div className="font-medium">{j.id}</div>
            <div>{j.customerName}</div>
            <div>{j.vehicle}</div>
            <div>{j.status}</div>
            <div className="text-muted-foreground">{j.scheduledAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}