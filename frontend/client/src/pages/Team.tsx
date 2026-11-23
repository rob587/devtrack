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
  return <div>Team</div>;
};

export default Team;
