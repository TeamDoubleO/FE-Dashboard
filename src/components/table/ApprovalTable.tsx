"use client";

import React from "react";
import "./css/ApprovalTable.css";

interface ApproveTableProps {
  data: Record<string, any>[];
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  idKey?: string; 
}

const ApproveTable: React.FC<ApproveTableProps> = ({ data, onApprove, onReject, idKey = "requestId"}) => {

  const tableTitles = [
    { key: "requestId", label: "권한 요청 ID" },
    { key: "requestor", label: "요청 보낸 사람" },
    { key: "requestArea", label: "권한 요청 구역" },
    { key: "reason", label: "요청 사유" },
    { key: "date", label: "신청일자" },
  ];

  return (
    <div className="approval-table-wrapper">
      <table className="approval-table">
        <thead>
          <tr>
            {tableTitles.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {tableTitles.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
              <td className="approval-table-buttons">
                <button
                  className="approval-table-approve-btn"
                  onClick={() => onApprove?.(row[idKey])}
                >
                  승인
                </button>
                <button
                  className="approval-table-reject-btn"
                  onClick={() => onReject?.(row[idKey])}
                >
                  거절
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveTable;