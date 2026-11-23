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

  return <div>Team</div>;
};

export default Team;
