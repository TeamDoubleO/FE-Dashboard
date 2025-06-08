import { useLocation } from 'react-router-dom';

import Layout from '../components/layout/Layout.tsx';
import Background from '../components/background/Background.tsx';
import Breadcrumb from '../components/breadcrumb/Breadcrumb.tsx';
import DefaultTable from '../components/table/DefaultTable.tsx';

import './css/PendingDetailPage.css';

const breadCrumbInfo = {
    currentPage: "출입증 발급",
    currentSidebarItem: "출입증 발급 신청 내역"
};

const pendingColumn = [
    { key: "passId", label: "보호자ID"},
    { key: "guardianName", label: "보호자명" },
    { key: "patientCode", label: "환자번호" },
    { key: "createdDt", label: "발급요청일자"},
]

const PendingDetailPage = () => {
  const location = useLocation();
  const data = location.state;
  const pending = [data]; 

  return (
    <>
      <Background />
      <Layout>
        <Breadcrumb 
            currentPage={breadCrumbInfo.currentPage}
            currentSidebarItem={breadCrumbInfo.currentSidebarItem}
        />

          <div className="pending-detail-container">
            <div className="pending-detail-title">출입증 발급 신청 내역 상세 조회</div>
            <DefaultTable 
                tableTitles={pendingColumn} 
                data={pending}
            />
            <br /><br />
            <div className="pending-detail-title">보호자 상세 정보</div>
                <div className="pending-detail-table-wrapper">
                    <table className="pending-detail-table">
                        <tbody>
                        <tr>
                            <td className="pending-detail-table-label-cell">환자명</td>
                            <td>{data.patientName}</td>
                        </tr>
                        <tr>
                            <td className="pending-detail-table-label-cell">보호자명</td>
                            <td>{data.guardianName}</td>
                        </tr>
                        <tr>
                            <td className="pending-detail-table-label-cell">보호자 연락처</td>
                            <td>{data.guardianContact}</td>
                        </tr>
                        </tbody>
                    </table>
            </div>
            <br /><br />
            <div className="pending-detail-title">출입 신청 시간 </div>
                <div className="pending-detail-table-wrapper">
                <table className="pending-detail-table">
                    <tbody>
                        <tr>
                            <td className="pending-detail-table-label-cell">출입시작시간</td>
                            <td>{data.startAt}</td>
                        </tr>
                        <tr>
                            <td className="pending-detail-table-label-cell">출입마감시간</td>
                            <td>{data.expiredAt}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Layout>
    </>
  );
};

export default PendingDetailPage;