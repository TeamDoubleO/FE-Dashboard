import React, { useState } from "react";
import "./css/CheckTable.css";

type Column = {
  key: string,
  label: string;              
};

interface CheckEditTableProps {
  tableTitles: Column[];
  data: Record<string, any>[];
}

const CheckTable: React.FC<CheckEditTableProps> = ({ tableTitles, data }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, idx) => idx));
    }
    setAllSelected(!allSelected);
  };
  
  const handleRowSelect = (idx: number) => {
    setSelectedRows((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="check-table-wrapper">
      <table className="check-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                checked={selectedRows.length === data.length} 
                onChange={handleSelectAll}/>
            </th>
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
              className={selectedRows.includes(idx) ? "check-table-selected-row" : ""}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(idx)}
                  onChange={() => handleRowSelect(idx)}
                />
              </td>
                {tableTitles.map((col) => (
              <td
                key={col.key}
                className={col.key === "name" ? "check-table-name" : ""}
            >
              {row[col.key]}
            </td>
          ))}
          <td></td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
  
export default CheckTable;