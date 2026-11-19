import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import SessionTimer from "../components/SessionTimer";

const Dashboard = () => {
  return (
    <>
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">
          <StatsCards />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SessionTimer />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
