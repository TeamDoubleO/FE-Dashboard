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
            {data.map((row, idx) => (
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
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
export default DefaultTable;