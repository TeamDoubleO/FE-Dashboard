import CheckEditTextTable from '../components/table/CheckEditTextTable';
import CheckEditTable from '../components/table/CheckEditTable';
import CheckTable from '../components/table/CheckTable';
import DefaultTable from '../components/table/DefaultTable';
import ApproveTable from '../components/table/ApprovalTable.tsx';

import users from "../mocks/usersData.ts";
import patients from "../mocks/patientsData.ts";
import requests from "../mocks/requestsData.ts";
import districts from "../mocks/districtsData.ts";
import approvals from "../mocks/approvalsData.ts";

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
  { key: "requestId", label: "권한요청ID" },
  { key: "requestDate", label: "요청날짜" },
  { key: "requestor", label: "요청자" },
  { key: "status", label: "요청상태" },
]

const districtsColums = [
  { key: "hospitalName", label: "병원 명" },
  { key: "districtName", label: "구역 명" },
  { key: "districtDescription", label: "구역 설명"},
  { key: "PIC", label: "책임자"},
  { key: "NOP", label: "환자수"}
]


const TablePage = () => {

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
        data={approvals}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </>
  )
}

export default TablePage;