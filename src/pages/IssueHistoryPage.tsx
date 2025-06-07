import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import DefaultTable from '../components/table/DefaultTable';
import Pagination from '../components/table/Pagination.tsx';

import './css/IssueHistoryPage.css';

import { fetchIssuedPassLog } from "../apis/passApi.ts";

const issueColumns = [
    { key: "memberId", label: "사용자ID" },
    { key: "memberName", label: "발급자명"},
    { key: "passId", label: "출입증ID" },
    { key: "startAt", label: "출입시작시간"},
    { key: "expiredAt", label: "출입마감시간"},
    { key: "visitCategory", label: "출입구분"},
]

const breadCrumbInfo = {
    currentPage: "출입 관련",
    currentSidebarItem: "출입증 발급 내역"
};

const IssueHistoryPage = () => {
  const [issueHistory, setIssueHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
      const loadData = async () => {
        try {
          const data = await fetchIssuedPassLog(currentPage - 1); 
          const transformed = data.content.map((item: any) => ({
            ...item,
            startAt: item.startAt?.replace('T', '  ').split('.')[0],
            expiredAt: item.expiredAt?.replace('T', '  ').split('.')[0],
            visitCategory : item.visitCategory === "PATIENT" ? "환자" : item.visitCategory === "GUARDIAN" ? "보호자" : "-",
          }));
          setIssueHistory(transformed);
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
          <div className="issue-history-container">
            <div className="issue-history-title">출입증 발급 내역 조회</div>
            <DefaultTable 
                tableTitles={issueColumns} 
                data={issueHistory}
                onRowClick={(row) => navigate(`/issuedetail/${row.passId}`, { state: row })}
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

export default IssueHistoryPage;
