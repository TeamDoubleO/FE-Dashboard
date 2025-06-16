import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { usePassLogContext } from "../contexts/PassLogContext.tsx";

import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import SearchBar from "../components/searchbar/SearchBar.tsx";
import DefaultTable from '../components/table/DefaultTable';
import Pagination from '../components/table/Pagination.tsx';
import Loading from "../components/loading/Loading.tsx";
import Warning from "../components/warning/Warning.tsx";

import '../components/loading/css/Loading.css'
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
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const prevSearchKeywordRef = useRef('');
  const { isPassLogAvailable } = usePassLogContext();
  const navigate = useNavigate();

  const loadData = async (page: number, keyword: string) => {
    try {
      setIsLoading(true);
      const data = await fetchIssuedPassLog(page - 1, keyword); 
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
    } finally {
      setIsLoading(false); 
    }
  };

  const handleSearch = async (input: string) => {
    const trimmed = input.trim();

    if (trimmed !== prevSearchKeywordRef.current || currentPage !== 1) {
      prevSearchKeywordRef.current = trimmed;
      setSearchKeyword(trimmed);

      if (currentPage === 1) {
        await loadData(1, trimmed); 
      } else {
        setCurrentPage(1);
      }
    }
  };

  useEffect(() => {
    loadData(currentPage, searchKeyword);
  }, [currentPage, searchKeyword]);

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
          <div className="issue-history-container">
            {isLoading ? (
              <div className="loading-overlay">
                <Loading />
                <div className="loading-text">출입증 발급 내역을 불러오는 중입니다...</div>
              </div>
            ) : (
            <>
            <div className="issue-history-title">출입증 발급 내역 조회</div>
            <SearchBar
              placeholder="발급자명을 입력하세요"
              onSearch={handleSearch}
            />
            <br />
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
            </>
            )}
        </div>
      </Layout>
    </>
  );
};

export default IssueHistoryPage;
