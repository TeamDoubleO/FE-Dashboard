import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import ChartGrowPassRequest from '../components/dashboard/pass/ChartGrowPassRequest';
import SearchFilter from '../components/dashboard/pass/SearchFilter';
import ChartLinePassByTeam from '../components/dashboard/pass/ChartLinePassByTeam';
import { fetchAdminData } from '../apis/adminApi';
import Loading from '../components/loading/Loading';
import './css/DashboardPass.css';

interface FilterOptions {
  startDate: string;
  endDate: string;
  userTypes: string[];
  buildings: number[];
  zones: string[];
}

const DashboardPass = () => {
  const [hospitalId, setHospitalId] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);

  useEffect(() => {
    fetchAdminData()
      .then((admin) => {
        console.log("관리자 정보:", admin);
        setHospitalId(admin.affiliationId);
      })
      .catch((err) => {
        console.error("병원 ID 가져오기 실패:", err);
      });
  }, []);

  return (
    <>
      <Background />
      <Layout>
        <div className="dashboard-pass-container">
          {!hospitalId && (
            <div className="dashboard-pass-loading-overlay">
              <Loading />
              <div className="dashboard-pass-loading-text">병원 정보를 불러오는 중입니다...</div>
            </div>
          )}

          {hospitalId && (
            <div className="dashboard-pass-col">
              <ChartGrowPassRequest />
              <SearchFilter onApply={setFilterOptions} />
              {filterOptions && (
                <div className="dashboard-pass-row">
                  <ChartLinePassByTeam filters={filterOptions} />
                </div>
              )}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default DashboardPass;
