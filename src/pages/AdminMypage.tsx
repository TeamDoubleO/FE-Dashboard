import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import AdminMypageTable from '../components/Admin/AdminMypageTable';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';

const hospitalInfo = {
    hospitalName: "서울 성모병원",
    hospitalId: 1234,
    adminId: "admin12"
};

const breadCrumbInfo = {
    cp: "관리페이지",
    csi: "관리자 마이페이지"
};

const AdminMyPage = () => {
  return (
    <>
      <Background />
      <Layout>
        <Breadcrumb 
            currentPage={breadCrumbInfo.cp}
            currentSidebarItem={breadCrumbInfo.csi}
        />
        <AdminMypageTable
            hospitalName={hospitalInfo.hospitalName}
            hospitalId={hospitalInfo.hospitalId}
            adminId={hospitalInfo.adminId}
        />
      </Layout>
    </>
  );
};

export default AdminMyPage;
