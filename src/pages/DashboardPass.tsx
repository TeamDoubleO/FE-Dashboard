import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';

import ChartGrowPassRequest from '../components/dashboard/pass/ChartGrowPassRequest';
import SearchFilter from '../components/dashboard/pass/SearchFilter';
import ChartLinePassRequest from '../components/dashboard/pass/ChartLinePassRequest';
import ChartAreaPassByTeam from '../components/dashboard/pass/ChartAreaPassByTeam';
//import Cinco from '../components/dashboard/pass/Cinco';

import './css/DashboardPass.css';

const DashboardPass = () => {
  return (
    <>
      <Background />
      <Layout>
        <div className="dashboard-pass-container">
          <div className="dashboard-pass-col">
            <ChartGrowPassRequest />
            <SearchFilter />

            <div className="dashboard-pass-row">
              <ChartLinePassRequest />
              <ChartAreaPassByTeam />
            </div>

            {/* <Cinco /> */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DashboardPass;
