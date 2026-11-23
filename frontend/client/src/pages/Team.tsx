import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

interface TeamMember {
  user_name: string;
  hours_this_week: number;
  hours_total: number;
}

interface TeamSession {
  user_name: string;
  project_name: string;
  description: string;
  started_at: string;
  ended_at: string | null;
  duration_minutes: number | null;
}

const Team = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [sessions, setSessions] = useState<TeamSession[]>([]);

  useEffect(() => {
    api.get("/stats/team").then((res) => setTeam(res.data.team));
    api
      .get("/sessions/team")
      .then((res) => setSessions(res.data.sessions.slice(0, 10)));
  }, []);

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return "—";
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
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">
          <h2 className="text-slate-100 text-2xl font-bold">
            👥 Team Overview
          </h2>

          {/* Stats per membro */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-slate-200 font-semibold mb-4">
              Ore per membro
            </h3>
            {team.length === 0 ? (
              <p className="text-slate-500 text-sm">
                Nessun membro nel team ancora.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {team.map((member) => (
                  <div
                    key={member.user_name}
                    className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                        {member.user_name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-slate-200 text-sm font-medium">
                        {member.user_name}
                      </span>
                    </div>
                    <div className="flex gap-6 text-right">
                      <div>
                        <p className="text-xs text-slate-500">
                          Questa settimana
                        </p>
                        <p className="text-indigo-400 font-semibold">
                          {member.hours_this_week}h
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Totale</p>
                        <p className="text-slate-300 font-semibold">
                          {member.hours_total}h
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sessioni recenti del team */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-slate-200 font-semibold mb-4">
              Sessioni recenti del team
            </h3>
            {sessions.length === 0 ? (
              <p className="text-slate-500 text-sm">Nessuna sessione ancora.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {sessions.map((session, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-200 text-sm font-medium">
                          {session.user_name}
                        </span>
                        <span className="text-slate-500 text-xs">su</span>
                        <span className="text-indigo-400 text-sm">
                          {session.project_name}
                        </span>
                        {!session.ended_at && (
                          <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                            live
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {session.description || "Nessuna descrizione"} ·{" "}
                        {formatDate(session.started_at)}
                      </p>
                    </div>
                    <span className="text-slate-300 font-semibold text-sm">
                      {formatDuration(session.duration_minutes)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Team;
