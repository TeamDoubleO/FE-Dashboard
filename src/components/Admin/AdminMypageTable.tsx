import React from 'react';
import './css/AdminMyPageTable.css';

interface HospitalInfoProps {
  hospitalName: string;
  hospitalId: number;
  adminId: string;
}

const AdminMypageTable: React.FC<HospitalInfoProps> = ({ hospitalName, hospitalId, adminId }) => {
  return (
    <div className="admin-mypage-table-container">
      <h3>관리자 정보</h3>
      <table className="admin-mypage-table">
        <tbody>
          <tr>
            <td className="admin-mypage-table-label-cell">병원명(기관명)</td>
            <td>{hospitalName}</td>
          </tr>
          <tr>
            <td className="admin-mypage-table-label-cell">병원 ID (기관 ID)</td>
            <td>{hospitalId}</td>
          </tr>
          <tr>
            <td className="admin-mypage-table-label-cell">관리자 ID</td>
            <td>{adminId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminMypageTable;