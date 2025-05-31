import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import AdminPasswordBox from '../components/_Admin/AdminPasswordBox';

const breadCrumbInfo = {
  currentPage: "관리페이지",
  currentSidebarItem: "비밀번호 변경"
};

const AdminPasswordPage = () => {
  return (
    <>
      <Background />
      <Layout>
        <Breadcrumb
          currentPage={breadCrumbInfo.currentPage}
          currentSidebarItem={breadCrumbInfo.currentSidebarItem}
        />
        <div className="admin-password-page-wrapper">
          <AdminPasswordBox />
        </div>
      </Layout>
    </>
  );
};

export default AdminPasswordPage;
