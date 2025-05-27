import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import Breadcrumb_ from '../components/breadcrumb/Breadcrumb_';
import AdminPasswordBox from '../components/_Admin/AdminPasswordBox';

const breadCrumbInfo = {
  currentPage: "관리페이지",
  firstSidebarItem: "관리자 정보",
  secondSidebarItem: "비밀번호 변경",
};

const AdminPasswordPage = () => {
  return (
    <>
      <Background />
      <Layout>
        <Breadcrumb_
          currentPage={breadCrumbInfo.currentPage}
          firstSidebarItem={breadCrumbInfo.firstSidebarItem}
          secondSidebarItem={breadCrumbInfo.secondSidebarItem}
        />
        <div className="admin-password-page-wrapper">
          <AdminPasswordBox />
        </div>
      </Layout>
    </>
  );
};

export default AdminPasswordPage;
