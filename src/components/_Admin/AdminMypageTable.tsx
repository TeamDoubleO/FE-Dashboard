import React from 'react';
import './css/AdminMypageTable.css';

interface HospitalInfoProps {
  affiliation: string;
  affiliationId: string;
  username: string;
}

const AdminMypageTable: React.FC<HospitalInfoProps> = ({
  affiliation,
  affiliationId,
  username,
}) => {
  return (
    <div className="admin-mypage-table-container">
      <span className="admin-mypage-table-title">관리자 정보</span>
      <div className="admin-mypage-table-wrapper">
        <table className="admin-mypage-table">
          <tbody>
            <tr>
              <td className="admin-mypage-table-label-cell">병원명 (기관명)</td>
              <td>{affiliation}</td>
            </tr>
            <tr>
              <td className="admin-mypage-table-label-cell">병원ID (기관ID)</td>
              <td>{affiliationId}</td>
            </tr>
            <tr>
              <td className="admin-mypage-table-label-cell">관리자ID</td>
              <td>{username}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMypageTable;
