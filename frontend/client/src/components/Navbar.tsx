import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition ${isActive ? "text-indigo-400 font-semibold" : "text-slate-400 hover:text-slate-200"}`;

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-indigo-400 font-bold text-xl">DevTrack</h1>
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/projects" className={linkClass}>
          Progetti
        </NavLink>
        {user?.role === "lead" && (
          <NavLink to="/team" className={linkClass}>
            Team
          </NavLink>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-slate-400 text-sm">
          👋 {user?.name}
          <span className="ml-2 bg-slate-700 text-indigo-300 text-xs px-2 py-0.5 rounded-full">
            {user?.role}
          </span>
        </span>
        <button
          onClick={handleLogout}
          className="text-sm text-slate-400 hover:text-red-400 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
