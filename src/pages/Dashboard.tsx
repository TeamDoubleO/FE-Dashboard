import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import Loading from '../components/loading/Loading';
import './css/Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <Background />
      <Layout>
        <div className="dashboard-container">
          <Loading />
          <div className="sample-box">샘플 박스</div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
