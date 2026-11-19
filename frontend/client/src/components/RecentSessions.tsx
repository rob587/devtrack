import { useEffect, useState } from "react";
import api from "../api/axios";
import { Session } from "../types";

const RecentSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    api.get("/sessions/mine").then((res) => {
      // Mostra solo le sessioni completate, max 5
      const completed = res.data.sessions
        .filter((s: Session) => s.ended_at)
        .slice(0, 5);
      setSessions(completed);
    });
  }, []);

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-slate-200 font-semibold text-lg mb-4">
          🕐 Sessioni recenti
        </h2>

        {sessions.length === 0 ? (
          <p className="text-slate-500 text-sm">
            Nessuna sessione ancora. Avvia il timer!
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0"
              >
                <div>
                  <p className="text-slate-200 text-sm font-medium">
                    {session.project_name}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {session.description || "Nessuna descrizione"} ·{" "}
                    {formatDate(session.started_at)}
                  </p>
                </div>
                <span className="text-indigo-400 font-semibold text-sm">
                  {formatDuration(session.duration_minutes!)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RecentSessions;
