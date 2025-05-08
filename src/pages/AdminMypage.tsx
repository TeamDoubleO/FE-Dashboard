import { useEffect, useState } from 'react';

import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import AdminMypageTable from '../components/Admin/AdminMypageTable';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import { fetchAdminData } from '../apis/adminApi';

const breadCrumbInfo = {
    currentPage: "관리페이지",
    currentSidebarItem: "관리자 마이페이지"
};

const AdminMyPage = () => {
  const [hospitalInfo, setHospitalInfo] = useState<{
    affiliation: string;
    affiliationId: string;
    username: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const data = await fetchAdminData();
        setHospitalInfo({
          affiliation: data.affiliation,
          affiliationId: data.affiliationId,
          username: data.username,
        });
      } catch (err) {
        setError((err as Error).message);
      }
    };

    loadAdminData();
  }, []);

  return (
    <>
      <Background />
      <Layout>
        <Breadcrumb 
            currentPage={breadCrumbInfo.currentPage}
            currentSidebarItem={breadCrumbInfo.currentSidebarItem}
        />
        {hospitalInfo ? (
        <AdminMypageTable
          affiliation={hospitalInfo.affiliation}
          affiliationId={hospitalInfo.affiliationId}
          username={hospitalInfo.username}
        />
      ) : (
        <div style={{ padding: "20px" }}>관리자 정보를 불러오는 중입니다...</div>
      )}
      </Layout>
    </>
  );
};

export default AdminMyPage;