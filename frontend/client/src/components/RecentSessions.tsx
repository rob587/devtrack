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

  return <div>RecentSessions</div>;
};

export default RecentSessions;
