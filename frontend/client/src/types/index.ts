export interface User {
  id: number;
  name: string;
  email: string;
  role: "developer" | "lead";
}

export interface Project {
  id: number;
  name: string;
  description: string;
  owner_id: number;
  created_at: string;
}

export interface Session {
  id: number;
  user_id: number;
  project_id: number;
  project_name: string;
  description: string;
  started_at: string;
  ended_at: string | null;
  duration_minutes: number | null;
}

export interface Stats {
  today: number;
  this_week: number;
  this_month: number;
  total: number;
}

export interface DayStat {
  date: string;
  label: string;
  hours: number;
}

export interface ProjectStat {
  project_name: string;
  total_hours: number;
}
