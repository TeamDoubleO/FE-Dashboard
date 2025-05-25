import { useLocation } from 'react-router-dom';

import Layout from '../components/layout/Layout.tsx';
import Background from '../components/background/Background.tsx';
import Breadcrumb from '../components/breadcrumb/Breadcrumb.tsx';
import DefaultTable from '../components/table/DefaultTable.tsx';

import { useLocation } from "react-router-dom";
import './css/IssueDetailPage.css';

const breadCrumbInfo = {
    currentPage: "출입 관련",
    currentSidebarItem: "출입증 발급 내역"
};

const issuesColums = [
    { key: "memberId", label: "사용자 ID" },
    { key: "memberName", label: "발급자명"},
    { key: "passId", label: "출입증 ID" },
    { key: "startedAt", label: "출입 시작 시간"},
    { key: "expiredAt", label: "출입 마감 시간"},
    { key: "visitCategory", label: "출입 구분"},
]

const areasColums = [
    { key: "areaCode", label: "구역 ID" },
    { key: "areaName", label: "구역 명" },
]


const IssueDetailPage = () => {
  const location = useLocation();
  const data = location.state;
  const issue = [data]; 
  const areasInfo = data?.areas || [];

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
                data={[issue]}
            />
            <br /><br />
            <div className="issue-detail-title">출입 구역</div>
            <DefaultTable 
                tableTitles={areasColums} 
                data={areasInfo}
            />
        </div>
      </Layout>
    </>
  );
};

export default IssueDetailPage;