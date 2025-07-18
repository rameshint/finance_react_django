import React from 'react';
import DashboardCards from '../components/DashboardCards';

function Dashboard() {
  const stats = {
    totalCustomers: 120,
    totalLoaned: 500000,
    totalCollected: 420000,
    outstanding: 80000
  };

  return (
    <div>
      <DashboardCards stats={stats} />
    </div>
  );
}

export default Dashboard;