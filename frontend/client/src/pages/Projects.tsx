import { useEffect, useState } from "react";
import api from "../api/axios";
import { Project } from "../types";
import Navbar from "../components/Navbar";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchProjects = () => {
    api.get("/projects/mine").then((res) => setProjects(res.data.projects));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/projects", form);
      setForm({ name: "", description: "" });
      setShowForm(false);
      fetchProjects();
    } catch (err: any) {
      setError(err.response?.data?.error || "Errore");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-slate-100 text-2xl font-bold">
              I tuoi progetti
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
            >
              {showForm ? "Annulla" : "+ Nuovo progetto"}
            </button>
          </div>

          {/* Form nuovo progetto */}
          {showForm && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-slate-200 font-semibold mb-4">
                Nuovo progetto
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  className="bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
                  type="text"
                  name="name"
                  placeholder="Nome progetto"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <textarea
                  className="bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                  name="description"
                  placeholder="Descrizione (opzionale)"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-semibold rounded-lg py-2 text-sm transition cursor-pointer"
                >
                  {loading ? "Creazione..." : "Crea progetto"}
                </button>
              </form>
            </div>
          )}

          {/* Lista progetti */}
          {projects.length === 0 ? (
            <div className="bg-slate-800 rounded-xl p-10 border border-slate-700 text-center">
              <p className="text-slate-400">Nessun progetto ancora.</p>
              <p className="text-slate-500 text-sm mt-1">
                Crea il tuo primo progetto!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-slate-100 font-semibold">
                      {project.name}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {new Date(project.created_at).toLocaleDateString("it-IT")}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">
                    {project.description || "Nessuna descrizione"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Projects;
