import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import './css/Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <Background />
      <Layout>
        <div className="sample-box">샘플 박스</div>
      </Layout>
    </>
  );
};

export default Dashboard;
