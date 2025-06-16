import { useEffect, useState, useRef, } from "react";
import { useNavigate } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import SearchBar from "../components/searchbar/SearchBar.tsx";
import DefaultTable from '../components/table/DefaultTable';
import Pagination from '../components/table/Pagination.tsx';
import Loading from "../components/loading/Loading.tsx";

import '../components/loading/css/Loading.css'
import './css/PatientListPage.css';

import { fetchPatientList } from "../apis/patientApi.ts";

const patientsColumns = [
    { key: "patientId", label: "환자ID" },
    { key: "patientCode", label: "환자번호" },
    { key: "name", label: "환자명"},
    { key: "sex", label: "성별"},
    { key: "guardianCount", label: "보호자수"},
]

const breadCrumbInfo = {
    currentPage: "환자 정보",
    currentSidebarItem: "환자 전체 목록 조회"
};

const PatientListPage = () => {
  const [patientList, setPatientList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const prevSearchKeywordRef = useRef('');
  const navigate = useNavigate();

  const loadData = async (page: number, keyword: string) => {
    try {
      setIsLoading(true);
      const data = await fetchPatientList(page - 1, keyword); 
      const transformed = data.content.map((item: any) => ({
        ...item,
        sex: item.sex === "MALE" ? "남성" : item.sex === "FEMALE" ? "여성" : "-"
      }));
      setPatientList(transformed);
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

  return (
    <>
      <Background />
      <Layout>
        <Breadcrumb 
            currentPage={breadCrumbInfo.currentPage}
            currentSidebarItem={breadCrumbInfo.currentSidebarItem}
        />
          <div className="patient-list-container">
            {isLoading ? (
              <div className="loading-overlay">
                <Loading />
                <div className="loading-text">환자 정보를 불러오는 중입니다...</div>
              </div>
            ) : (
            <>
            <div className="patient-list-title">환자 전체 목록 조회</div>
            <SearchBar
              placeholder="환자명을 입력하세요"
              onSearch={handleSearch}
            />
            <br />
            <DefaultTable 
                tableTitles={patientsColumns} 
                data={patientList}
                onRowClick={(row) => navigate(`/patientdetail/${row.patientCode}`, { state: row })}
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

export default PatientListPage;
