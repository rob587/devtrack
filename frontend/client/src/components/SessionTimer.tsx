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

  return <div>SessionTimer</div>;
};

export default SessionTimer;
