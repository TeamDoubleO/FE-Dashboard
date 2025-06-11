import { useLocation } from 'react-router-dom';
import { usePassLogContext } from "../contexts/PassLogContext.tsx";

import Layout from '../components/layout/Layout.tsx';
import Background from '../components/background/Background.tsx';
import Breadcrumb from '../components/breadcrumb/Breadcrumb.tsx';
import DefaultTable from '../components/table/DefaultTable.tsx';
import Warning from "../components/warning/Warning.tsx";

import './css/IssueDetailPage.css';

const breadCrumbInfo = {
    currentPage: "출입 관련",
    currentSidebarItem: "출입증 발급 내역"
};

const issuesColumn = [
    { key: "memberId", label: "사용자ID" },
    { key: "memberName", label: "발급자명"},
    { key: "passId", label: "출입증ID" },
    { key: "startAt", label: "출입시작시간"},
    { key: "expiredAt", label: "출입마감시간"},
    { key: "visitCategory", label: "출입구분"},
]

const areasColumns = [
    { key: "areaCode", label: "구역 ID" },
    { key: "areaName", label: "구역 명" },
]


const IssueDetailPage = () => {
  const location = useLocation();
  const data = location.state;
  const issue = [data]; 
  const areasInfo = data?.areas || [];

  const { isPassLogAvailable } = usePassLogContext();

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
        <Breadcrumb 
            currentPage={breadCrumbInfo.currentPage}
            currentSidebarItem={breadCrumbInfo.currentSidebarItem}
        />

          <div className="issue-detail-container">
            <div className="issue-detail-title">출입증 발급 내역 상세 조회</div>
            <DefaultTable 
                tableTitles={issuesColumn} 
                data={issue}
            />
            <br /><br />
            <div className="issue-detail-title">출입 구역</div>
            <DefaultTable 
                tableTitles={areasColumns} 
                data={areasInfo}
            />
        </div>
      </Layout>
    </>
  );
};

export default IssueDetailPage;