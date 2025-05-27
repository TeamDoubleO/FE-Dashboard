import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import ApproveTable from "../components/table/ApprovalTable.tsx";
import Pagination from '../components/table/Pagination.tsx';

import './css/PassPendingPage.css';

import { fetchPassPending, reviewPass } from "../apis/passApi.ts";

const pendingColumns = [
    { key: "passId", label: "신청자ID"},
    { key: "guardianName", label: "신청자명" },
    { key: "patientCode", label: "환자번호" },
    { key: "createdDt", label: "발급요청일자"},
]

const breadCrumbInfo = {
    currentPage: "출입증 발급",
    currentSidebarItem: "출입증 신청 내역 조회"
};

const PassPendingPage = () => {
  const [pendingList, setPendingList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const data = await fetchPassPending(currentPage - 1); 
      const transformed = data.content.map((item: any) => ({
        ...item,
        createdDt: item.createdDt
          ? item.createdDt.slice(0, 19).replace("T", " ")
          : "-",
        startAt: item.startAt
              ? item.startAt.slice(0, 19).replace("T", " ")
              : "-",
        expiredAt: item.expiredAt
          ? item.expiredAt.slice(0, 19).replace("T", " ")
          : "-"
      }));
      setPendingList(transformed);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("출입증 신청 내역 불러오기 실패:", err);
    }
  };

  useEffect(() => {
      loadData();
  }, [currentPage]);

  const handleApprove = async (passId: number) => {
    try {
      await reviewPass(passId, "ISSUED");
      alert("출입증 발급이 승인되었습니다.");
      loadData();
    } catch (err) {
      alert("승인 처리를 실패했습니다.");
    }
  };

  const handleReject = async (passId: number) => {
    try {
      await reviewPass(passId, "REJECTED");
      alert("출입증 발급이 거절되었습니다.");
      loadData();
    } catch (err) {
      alert("거절 처리를 실패했습니다.");
    }
  };

  return (
    <>
      <Background />
      <Layout>
        <Breadcrumb 
            currentPage={breadCrumbInfo.currentPage}
            currentSidebarItem={breadCrumbInfo.currentSidebarItem}
        />
          <div className="pass-pending-container">
            <div className="pass-pending-title">출입증 신청 내역 조회</div>
            <ApproveTable 
                tableTitles={pendingColumns} 
                data={pendingList}
                onRowClick={(row) => navigate(`/pendingdetail/${row.passId}`, { state: row })}
                onApprove={handleApprove}
                onReject={handleReject}
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

export default PassPendingPage;
