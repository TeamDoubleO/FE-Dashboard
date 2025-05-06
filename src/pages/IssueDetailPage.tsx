import Layout from '../components/layout/Layout.tsx';
import Background from '../components/background/Background.tsx';
import Breadcrumb from '../components/breadcrumb/Breadcrumb.tsx';
import DefaultTable from '../components/table/DefaultTable.tsx';

import './css/IssueDetailPage.css';

const breadCrumbInfo = {
    currentPage: "출입 관련",
    currentSidebarItem: "출입증 발급 내역"
};

const issuesColums = [
    { key: "memberId", label: "사용자 ID" },
    { key: "name", label: "발급자명"},
    { key: "passId", label: "출입증 ID" },
    { key: "districtId", label: "출입 구역 ID"},
    { key: "startTime", label: "출입 시작 시간"},
    { key: "endTime", label: "출입 만료 시간"},
]

const issue = [
  {memberId: "1234", name: "채민주", passId: "5678", districtId: "A010101", startTime: "2025-04-01", endTime: "2025-04-01"},
]

const districtsColums = [
    { key: "districtName", label: "구역 명" },
    { key: "districtDescription", label: "구역 설명" },
]

const districts = [
    { districtName: "암병동", districtDescription: "3층 암병동"},
    { districtName: "암병동", districtDescription: "3층 암병동"},
    { districtName: "암병동", districtDescription: "3층 암병동"}
]


const IssueDetailPage = () => {

  return (
    <>
      <Background />
      <Layout>
        <Breadcrumb 
            currentPage={breadCrumbInfo.currentPage}
            currentSidebarItem={breadCrumbInfo.currentSidebarItem}
        />

          <div className="issue-detail-container">
            <div className="issue-detail-title">출입증 발급 내역 상세 조회</div>
            <DefaultTable 
                tableTitles={issuesColums} 
                data={issue}
            />
            <br /><br />
            <div className="issue-detail-title">출입 구역</div>
            <DefaultTable 
                tableTitles={districtsColums} 
                data={districts}
            />
        </div>
      </Layout>
    </>
  );
};

export default IssueDetailPage;