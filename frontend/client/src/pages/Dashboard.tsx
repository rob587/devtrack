import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import SessionTimer from "../components/SessionTimer";
import WeeklyChart from "../components/WeeklyChart";
import RecentSessions from "../components/RecentSessions";
import socket from "../socket";

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    socket.on("session_stopped", () => {
      setRefreshKey((prev) => prev + 1);
    });

    return () => {
      socket.off("session_stopped");
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">
        <StatsCards key={`stats-${refreshKey}`} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SessionTimer />
          <WeeklyChart key={`chart-${refreshKey}`} />
        </div>
        <RecentSessions key={`sessions-${refreshKey}`} />
      </main>
    </div>
  );
}
