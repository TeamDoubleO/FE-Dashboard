import React from "react";
import "./css/DefaultTable.css";

type Column = {
  key: string,
  label: string;              
};

interface CheckEditTableProps {
  tableTitles: Column[];
  data: Record<string, any>[];
  onRowClick?: (row: Record<string, any>) => void;
}

const DefaultTable: React.FC<CheckEditTableProps> = ({ tableTitles, data, onRowClick }) => {
    return (
      <div className="default-table-wrapper">
        <table className="default-table">
          <thead>
            <tr>
            {tableTitles.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
              <th></th>
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
            data.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onRowClick?.(row)} 
                className={onRowClick ? 'clickable-row' : ''}
              >
                {tableTitles.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
                <td></td>
              </tr>
            ))
          )}
        </tbody>
        </table>
      </div>
    );
  };
  
export default DefaultTable;