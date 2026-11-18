import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <h1 className="text-indigo-400 font-bold text-xl">DevTrack</h1>
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
};

export default Navbar;
