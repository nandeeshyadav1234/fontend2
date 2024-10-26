// src/pages/Dashboard.js
const Dashboard = () => <h2>User Dashboard</h2>;
export default Dashboard;

const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
