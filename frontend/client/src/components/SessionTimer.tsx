import { useState, useEffect } from "react";
import api from "../api/axios";
import { Project, Session } from "../types";

const SessionTimer = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [description, setDescription] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/projects/mine").then((res) => {
      setProjects(res.data.projects);
      if (res.data.projects.length > 0) {
        setSelectedProject(res.data.projects[0].id.toString());
      }
    });

    api.get("/sessions/mine").then((res) => {
      const active = res.data.sessions.find((s: Session) => !s.ended_at);
      if (active) setActiveSession(active);
    });
  }, []);

  useEffect(() => {
    if (!activeSession) return;
    const start = new Date(activeSession.started_at).getTime();
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSession]);

  const formatElapsed = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleStart = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/sessions/start", {
        project_id: parseInt(selectedProject),
        description,
      });
      setActiveSession(res.data.session);
      setElapsed(0);
    } catch (err: any) {
      setError(err.response?.data?.error || "Errore");
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    setLoading(true);
    try {
      await api.patch("/sessions/stop");
      setActiveSession(null);
      setElapsed(0);
      window.location.reload(); // ricarica per aggiornare le stats
    } catch (err: any) {
      setError(err.response?.data?.error || "Errore");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-slate-200 font-semibold text-lg mb-4">⏱ Timer</h2>

        {activeSession ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-slate-400 text-sm">
              Sessione attiva su{" "}
              <span className="text-indigo-400">
                {activeSession.project_name}
              </span>
            </p>
            <p className="text-5xl font-mono font-bold text-white">
              {formatElapsed(elapsed)}
            </p>
            <button
              onClick={handleStop}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold rounded-lg px-6 py-2 transition cursor-pointer"
            >
              ⏹ Stoppa
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="bg-slate-900 text-slate-100 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <input
              className="bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="Descrizione (opzionale)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              onClick={handleStart}
              disabled={loading || !selectedProject}
              className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-semibold rounded-lg py-2 text-sm transition cursor-pointer"
            >
              ▶ Avvia sessione
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SessionTimer;
