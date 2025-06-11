import { usePassLogContext } from "../contexts/PassLogContext.tsx";

import StatsSummaryCard from '../components/dashboard/stats/StatsSummaryCard';
import ChartAreaTotalByHour from '../components/dashboard/stats/ChartAreaTotalByHour';
import ChartSyncedTotalByPeriod from '../components/dashboard/stats/ChartSyncedTotalByPeriod';
import ChartBarUserAccess from '../components/dashboard/stats/ChartBarUserAccess';
import ChartLineBuildingAccess from '../components/dashboard/stats/ChartLineBuildingAccess';

import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';

import Warning from '../components/warning/Warning';
import Loading from "../components/loading/Loading.tsx";

import './css/DashboardStats.css';
import '../components/loading/css/Loading.css'

const DashboardStats = () => {
  const { isPassLogAvailable, hasCheckedAvailability } = usePassLogContext();

  if (!hasCheckedAvailability) {
    return (
      <>
      <Background />
      <Layout>
        <div className="ddashboard-stats-loading-container ">
          <div className="loading-overlay">
            <Loading />
            <div className="loading-text">방문자 통계를 불러오는 중입니다...</div>
          </div>
        </div>
      </Layout>
    </>
    ); 
  }

  if (!isPassLogAvailable) {
    return (
      <>
        <Background />
        <Layout>
          <Warning />
        </Layout>
      </>
    );
  }

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
