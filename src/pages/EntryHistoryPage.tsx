import { useState } from "react";

import Layout from '../components/layout/Layout.tsx';
import Background from '../components/background/Background.tsx';
import Breadcrumb from '../components/breadcrumb/Breadcrumb.tsx';
import DefaultTable from '../components/table/DefaultTable.tsx';
import Pagination from '../components/table/Pagination.tsx';

import './css/EntryHistoryPage.css';

import requests from '../mocks/requestsData.ts';

const requestsColums = [
    { key: "requestId", label: "출입 요청 ID" },
    { key: "requestor", label: "요청자" },
    { key: "district", label: "출입 구역"},
    { key: "StartTime", label: "출입 시작 시간"},
    { key: "EndTime", label: "출입 만료 시간"},
]

const breadCrumbInfo = {
    currentPage: "출입 관련",
    currentSidebarItem: "출입증 발급 내역"
};

const EntryHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedData = requests.slice(
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

          <div className="entry-history-container">
            <div className="entry-history-title">출입 내역 조회</div>
            <DefaultTable 
                tableTitles={requestsColums} 
                data={paginatedData}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(requests.length / itemsPerPage)}
              onPageChange={setCurrentPage}
            />
        </div>
      </Layout>
    </>
  );
};

export default EntryHistoryPage;
