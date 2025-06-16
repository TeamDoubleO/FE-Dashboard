import { useEffect, useState, useRef } from "react";
import { usePassLogContext } from "../contexts/PassLogContext.tsx";

import Layout from '../components/layout/Layout.tsx';
import Background from '../components/background/Background.tsx';
import Breadcrumb from '../components/breadcrumb/Breadcrumb.tsx';
import SearchBar from "../components/searchbar/SearchBar.tsx";
import DefaultTable from '../components/table/DefaultTable.tsx';
import Pagination from '../components/table/Pagination.tsx';
import Loading from "../components/loading/Loading.tsx";
import Warning from "../components/warning/Warning.tsx";

import '../components/loading/css/Loading.css'
import './css/EntryHistoryPage.css';

import { fetchEntryPassLog } from "../apis/passApi.ts";

const entryHistoryColumns = [
    { key: "memberId", label: "사용자ID" },
    { key: "memberName", label: "출입자명" },
    { key: "passId", label: "출입증ID" },
    { key: "areaCode", label: "출입구역ID" },
    { key: "areaName", label: "출입구역명" },
    { key: "createdDt", label: "출입시간"},
]

const breadCrumbInfo = {
    currentPage: "출입 관련",
    currentSidebarItem: "출입 내역"
};

const EntryHistoryPage = () => {
  const [entryHistory, setEntryHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const prevSearchKeywordRef = useRef('');
  const { isPassLogAvailable } = usePassLogContext();

  const loadData = async (page: number, keyword: string) => {
      try {
        setIsLoading(true);
        const data = await fetchEntryPassLog(page - 1, keyword); 
        const transformed = data.content.map((item: any) => ({
          ...item,
          createdDt: item.createdDt?.replace('T', '  ').split('.')[0],
        }));
        setEntryHistory(transformed);
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
          <div className="entry-history-container">
            {isLoading ? (
              <div className="loading-overlay">
                <Loading />
                <div className="loading-text">출입 내역을 불러오는 중입니다...</div>
              </div>
            ) : (
            <>
            <div className="entry-history-title">출입 내역 조회</div>
            <SearchBar
              placeholder="출입자명을 입력하세요"
              onSearch={handleSearch}
            />
            <br />
            <DefaultTable 
              tableTitles={entryHistoryColumns} 
              data={entryHistory}
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

export default EntryHistoryPage;
