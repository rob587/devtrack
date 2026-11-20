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

  return <div>Projects</div>;
};

export default Projects;
