import { useEffect, useState } from "react";

import Layout from '../components/layout/Layout.tsx';
import Background from '../components/background/Background.tsx';
import Breadcrumb from '../components/breadcrumb/Breadcrumb.tsx';
import DefaultTable from '../components/table/DefaultTable.tsx';
import Pagination from '../components/table/Pagination.tsx';

import './css/EntryHistoryPage.css';

import { fetchEntryPassLog } from "../apis/passApi.ts";

const entryHistoryColums = [
    { key: "memberId", label: "사용자 ID" },
    { key: "memberName", label: "출입자명" },
    { key: "passId", label: "출입증 ID" },
    { key: "areaId", label: "출입 구역 ID" },
    { key: "areaName", label: "출입 구역명" },
    { key: "createdDt", label: "출입 시간"},
]

const breadCrumbInfo = {
    currentPage: "출입 관련",
    currentSidebarItem: "출입 내역"
};

const EntryHistoryPage = () => {
  const [entryHistory, setEntryHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchEntryPassLog(currentPage - 1); 
        setEntryHistory(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("출입 내역 불러오기 실패:", err);
      }
    };

    loadData();
  }, [currentPage]);

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
                tableTitles={entryHistoryColums} 
                data={entryHistory}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages} 
              onPageChange={setCurrentPage}
            />
        </div>
      </Layout>
    </>
  );
};

export default EntryHistoryPage;
