import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Errore durante la registrazione");
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
            <p className="text-slate-400 text-sm">Crea il tuo account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition"
              type="text"
              name="name"
              placeholder="Nome completo"
              value={form.name}
              onChange={handleChange}
              required
            />
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

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="bg-slate-900 text-slate-100 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="developer">Developer</option>
              <option value="lead">Team Lead</option>
            </select>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-semibold rounded-lg py-3 text-sm transition mt-2 cursor-pointer"
            >
              {loading ? "Registrazione in corso..." : "Registrati"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-slate-400 text-sm text-center mt-6">
            Hai già un account?{" "}
            <Link to="/login" className="text-indigo-400 hover:underline">
              Accedi
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
