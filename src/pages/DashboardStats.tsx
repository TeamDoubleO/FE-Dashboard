import StatsSummaryCard from '../components/dashboard/stats/StatsSummaryCard';
import ChartAreaTotalByHour from '../components/dashboard/stats/ChartAreaTotalByHour';
import ChartSyncedTotalByPeriod from '../components/dashboard/stats/ChartSyncedTotalByPeriod';
import ChartBarUserAccess from '../components/dashboard/stats/ChartBarUserAccess';
import ChartLineBuildingAccess from '../components/dashboard/stats/ChartLineBuildingAccess';

import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';

import './css/DashboardStats.css';

const DashboardStats = () => {
  return (
    <>
      <Background />
      <Layout>
        <div className="dashboard-stats-container">
          <StatsSummaryCard />
          <ChartAreaTotalByHour />
          <ChartSyncedTotalByPeriod />
          <ChartBarUserAccess />
          <ChartLineBuildingAccess />
        </div>
      </Layout>
    </>
  );
};

export default DashboardStats;
