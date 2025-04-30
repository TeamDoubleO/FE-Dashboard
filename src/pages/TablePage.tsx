import { useState } from "react";

import CheckEditTextTable from '../components/table/CheckEditTextTable';
import CheckEditTable from '../components/table/CheckEditTable';
import CheckTable from '../components/table/CheckTable';
import DefaultTable from '../components/table/DefaultTable';
import ApproveTable from '../components/table/ApprovalTable.tsx';
import Pagination from '../components/table/Pagination.tsx';
import AdminMypageTable from "../components/Admin/AdminMypageTable.tsx";

import users from "../mocks/usersData.ts";
import patients from "../mocks/patientsData.ts";
import requests from "../mocks/requestsData.ts";
import districts from "../mocks/districtsData.ts";
import approvals from "../mocks/approvalsData.ts";

const hospitalInfo = {
  hospitalName: "서울 성모병원",
  hospitalId: 1234,
  adminId: "admin12"
};

const usersColumns = [
  { key: "name", label: "사원이름" },
  { key: "role", label: "직책" },
  { key: "hospital", label: "직책" },
  { key: "department", label: "근무지" },
];

const patientsColums = [
  { key: "name", label: "환자 한글명" },
  { key: "englishName", label: "환자 영문명" },
  { key: "disease", label: "병명" },
  { key: "status", label: "입원" },
]

const requestsColums = [
  { key: "requestId", label: "출입 요청 ID" },
  { key: "requestor", label: "요청자" },
  { key: "district", label: "출입 구역"},
  { key: "StartTime", label: "출입 시작 시간"},
  { key: "EndTime", label: "출입 만료 시간"},
]

const districtsColums = [
  { key: "hospitalName", label: "병원 명" },
  { key: "districtName", label: "구역 명" },
  { key: "districtDescription", label: "구역 설명"},
  { key: "PIC", label: "책임자"},
  { key: "NOP", label: "환자수"}
]


const TablePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedData = approvals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApprove = (id: number) => {
    console.log("승인:", id);
  };

  const handleReject = (id: number) => {
    console.log("거절:", id);
  };

  return (
    <>
      <CheckEditTable tableTitles={usersColumns} data={users} />
      <br /> <br />
      <CheckEditTextTable tableTitles={patientsColums} data={patients}/>
      <br /> <br />
      <CheckTable tableTitles={requestsColums} data={requests}/>
      <br /><br />
      <DefaultTable tableTitles={districtsColums} data={districts}/>
      <br /><br />
      <ApproveTable
        data={paginatedData}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(approvals.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />

      <AdminMypageTable
        hospitalName={hospitalInfo.hospitalName}
        hospitalId={hospitalInfo.hospitalId}
        adminId={hospitalInfo.adminId}
      />
    </>
  )
}

export default TablePage;