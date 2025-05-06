import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import DefaultTable from '../components/table/DefaultTable';
import Pagination from '../components/table/Pagination.tsx';

import './css/IssueHistoryPage.css';

import issues from '../mocks/issuesData';

const issueColums = [
    { key: "memberId", label: "사용자 ID" },
    { key: "name", label: "발급자명"},
    { key: "passId", label: "출입증 ID" },
    { key: "districtId", label: "출입 구역 ID"},
    { key: "startTime", label: "출입 시작 시간"},
    { key: "endTime", label: "출입 만료 시간"},
]

const breadCrumbInfo = {
    currentPage: "출입 관련",
    currentSidebarItem: "출입증 발급 내역"
};

const IssueHistoryPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedData = issues.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  return (
    <>
      <Background />
      <Layout>
        <Breadcrumb 
            currentPage={breadCrumbInfo.currentPage}
            currentSidebarItem={breadCrumbInfo.currentSidebarItem}
        />

          <div className="issue-history-container">
            <div className="issue-history-title">출입증 발급 내역 조회</div>
            <DefaultTable 
                tableTitles={issueColums} 
                data={paginatedData}
                onRowClick={(row) => navigate(`/issuedetail/${row.requestId}`)}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(issues.length / itemsPerPage)}
              onPageChange={setCurrentPage}
            />
        </div>
      </Layout>
    </>
  );
};

export default IssueHistoryPage;
