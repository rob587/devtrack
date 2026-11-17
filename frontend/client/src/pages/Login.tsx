import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Errore durante il login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-400 mb-1">
              DevTrack
            </h1>
            <p className="text-slate-400 text-sm">Accedi al tuo account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-semibold rounded-lg py-3 text-sm transition mt-2 cursor-pointer"
            >
              {loading ? "Accesso in corso..." : "Accedi"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-slate-400 text-sm text-center mt-6">
            Non hai un account?{" "}
            <Link to="/register" className="text-indigo-400 hover:underline">
              Registrati
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
