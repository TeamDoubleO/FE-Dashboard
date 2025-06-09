import React from "react";
import "./css/ApprovalTable.css";

type Column = {
  key: string,
  label: string;              
};

interface ApproveTableProps {
  tableTitles: Column[];
  data: Record<string, any>[];
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  onRowClick?: (row: Record<string, any>) => void;
  idKey?: string; 
}

const ApproveTable: React.FC<ApproveTableProps> = ({ 
  tableTitles, data, onApprove, onReject, 
  idKey = "passId", onRowClick
}) => {

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
          {data.length === 0 ? (
            <tr>
              <td colSpan={tableTitles.length + 1} style={{ textAlign: 'center', padding: '12px', color: '#888' }}>
                조회된 결과가 존재하지 않습니다.
              </td>
            </tr>
          ) : (
          data.map((row) => (
            <tr
              key={row[idKey]}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? "clickable-row" : ""}
            >
              {tableTitles.map((col) => (
                <td key={`${row[idKey]}-${col.key}`}>{row[col.key]}</td>
              ))}
              <td className="approval-table-buttons">
                <button
                  className="approval-table-approve-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onApprove?.(row[idKey]);
                  }}
                >
                  승인
                </button>
                <button
                  className="approval-table-reject-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReject?.(row[idKey]);
                  }}
                >
                  거절
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
      </table>
    </div>
  );
};

export default ApproveTable;