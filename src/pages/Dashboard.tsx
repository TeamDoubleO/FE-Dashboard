import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import Loading from '../components/loading/Loading'; // ✅ 로딩 컴포넌트 추가
import './css/Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <Background />
      <Layout>
        <div className="dashboard-container">
          {/* 로딩 오버레이 */}
          <Loading />

          {/* 아래에 샘플 박스 */}
          <div className="sample-box">샘플 박스</div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
