import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import ApproveTable from "../components/table/ApprovalTable.tsx";
import Pagination from '../components/table/Pagination.tsx';
import Loading from "../components/loading/Loading.tsx";

import '../components/loading/css/Loading.css'
import './css/PassPendingPage.css';

import { fetchPassPending, reviewPass } from "../apis/passApi.ts";

const pendingColumns = [
    { key: "passId", label: "보호자ID"},
    { key: "guardianName", label: "보호자명" },
    { key: "patientCode", label: "환자번호" },
    { key: "startAt", label: "출입시작시간"},
    { key: "createdDt", label: "발급요청일자"},
]

const breadCrumbInfo = {
    currentPage: "출입증 발급",
    currentSidebarItem: "출입증 발급 신청 내역"
};

const PassPendingPage = () => {
  const [pendingList, setPendingList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPassPending(currentPage - 1); 
      const transformed = data.content.map((item: any) => ({
        ...item,
        createdDt: item.createdDt?.replace('T', '  ').split('.')[0],
        startAt: item.startAt?.replace('T', '  ').split('.')[0],
        expiredAt: item.expiredAt?.replace('T', '  ').split('.')[0],
      }));
      setPendingList(transformed);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("출입증 발급 신청 내역 불러오기 실패:", err);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
      loadData();
  }, [currentPage]);

  const handleApprove = async (passId: number) => {
    try {
      await reviewPass(passId, "PROCESSING");
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
            {isLoading ? (
              <div className="loading-overlay">
                <Loading />
                <div className="loading-text">출입증 발급 신청 내역을 불러오는 중입니다...</div>
              </div>
            ) : (
            <>
            <div className="pass-pending-title">출입증 발급 신청 내역 조회</div>
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
            </>
            )}
        </div>
      </Layout>
    </>
  );
};

export default PassPendingPage;
