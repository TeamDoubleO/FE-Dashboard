import { useEffect, useState } from 'react';
import { usePassLogContext } from "../contexts/PassLogContext.tsx";

import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import ChartGrowPassRequest from '../components/dashboard/pass/ChartGrowPassRequest';
import SearchFilter from '../components/dashboard/pass/SearchFilter';
import ChartLinePassByTeam from '../components/dashboard/pass/ChartLinePassByTeam';
import { fetchAdminData } from '../apis/adminApi';
import Loading from '../components/loading/Loading';
import Warning from '../components/warning/Warning';

import '../components/loading/css/Loading.css'
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

  const { isPassLogAvailable } = usePassLogContext();

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
        <div className="dashboard-pass-container">
          {!hospitalId && (
            <div className="loading-overlay">
              <Loading />
              <div className="loading-text">출입증 발급 현황을 불러오는 중입니다...</div>
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
