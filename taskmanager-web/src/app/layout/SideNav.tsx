import { NavLink } from "react-router-dom";

const linkBase =
  "block rounded-md px-3 py-2 text-sm transition hover:bg-muted";
const active = "bg-muted font-medium";

export function SideNav() {
  return (
    <div className="p-4 space-y-2">
      <div className="text-lg font-semibold mb-4">Avayler-style Hub</div>

      <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
        Dashboard
      </NavLink>
      <NavLink to="/jobs" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
        Jobs
      </NavLink>
      <NavLink to="/customers" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
        Customers
      </NavLink>
      <NavLink to="/tasks" className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}>
        Tasks (demo)
      </NavLink>
    </div>
  );
}