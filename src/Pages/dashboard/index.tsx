import { useAuth } from "@/hooks";

const Dashboard = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <section>dashboard</section>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Dashboard;
