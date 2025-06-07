import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import DefaultTable from '../components/table/DefaultTable';
import Pagination from '../components/table/Pagination.tsx';

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

  const navigate = useNavigate();

  useEffect(() => {
      const loadData = async () => {
        try {
          const data = await fetchPatientList(currentPage - 1); 
          const transformed = data.content.map((item: any) => ({
            ...item,
            sex: item.sex === "MALE" ? "남성" : item.sex === "FEMALE" ? "여성" : "-"
          }));
          setPatientList(transformed);
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
          <div className="patient-list-container">
            <div className="patient-list-title">환자 전체 목록 조회</div>
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
        </div>
      </Layout>
    </>
  );
};

export default PatientListPage;
