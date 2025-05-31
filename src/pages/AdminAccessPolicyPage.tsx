import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import AdminAccessPolicyBox from '../components/_Admin/AdminAccessPolicyBox';

const breadCrumbInfo = {
  currentPage: "관리페이지",
  currentSidebarItem: "출입 정책"
};

const AdminAccessPolicyPage = () => {
  return (
    <>
      <Background />
      <Layout>
        <Breadcrumb
          currentPage={breadCrumbInfo.currentPage}
          currentSidebarItem={breadCrumbInfo.currentSidebarItem}
        />
        <div className="admin-access-policy-page-wrapper">
          <AdminAccessPolicyBox />
        </div>
      </Layout>
    </>
  );
};

export default AdminAccessPolicyPage;