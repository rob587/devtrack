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

  return <div>Projects</div>;
};

export default Projects;
