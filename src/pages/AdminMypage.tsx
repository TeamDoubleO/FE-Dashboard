import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import AdminMypageTable from '../components/_Admin/AdminMypageTable';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import ReusableButton from '../components/buttons/ReusableButton';
import Loading from "../components/loading/Loading.tsx";

import '../components/loading/css/Loading.css'
import './css/AdminMypage.css';

import { fetchAdminData } from '../apis/adminApi';

const breadCrumbInfo = {
  currentPage: "관리페이지",
  currentSidebarItem: "관리자 정보"
};

const AdminMyPage = () => {
  const [hospitalInfo, setHospitalInfo] = useState<{
    affiliation: string;
    affiliationId: string;
    username: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAdminData();
        setHospitalInfo({
          affiliation: data.affiliation,
          affiliationId: data.affiliationId,
          username: data.username,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false); 
      }
    };

    loadAdminData();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("관리자 정보 조회 에러:", error);
    }
  }, [error]);

  return (
    <>
      <Background />
      <Layout>
        <Breadcrumb 
          currentPage={breadCrumbInfo.currentPage}
          currentSidebarItem={breadCrumbInfo.currentSidebarItem}
        />
        {isLoading ? (
          <div className="loading-overlay">
            <Loading />
            <div className="loading-text">관리자 정보를 불러오는 중입니다...</div>
          </div>
        ) : hospitalInfo ? (
        <>
        <AdminMypageTable
          affiliation={hospitalInfo.affiliation}
          affiliationId={hospitalInfo.affiliationId}
          username={hospitalInfo.username}
        />

        <div className="admin-password-button-wrapper">
          <ReusableButton
            onClick={() => navigate("/adminpassword")}
            className="admin-password-button"
          >
            비밀번호 변경
          </ReusableButton>
        </div>
        </>
      ) : null }
      </Layout>
    </>
  );
};

export default AdminMyPage;
