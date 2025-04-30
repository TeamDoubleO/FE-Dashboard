import React, { useState, useEffect } from "react";
import "./css/CheckEditTextTable.css";
import { FiEdit } from "react-icons/fi";

type Column = {
  key: string,
  label: string;              
};

interface CheckEditTableProps {
  tableTitles: Column[];
  data: Record<string, any>[];
}

const CheckEditTextTable: React.FC<CheckEditTableProps> = ({ tableTitles, data}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [datas, setDatas] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    setDatas(data);
  }, [data]);

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(datas.map((_, idx) => idx));
    }
    setAllSelected(!allSelected);
  };

  const handleRowSelect = (idx: number) => {
    setSelectedRows((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="check-edit-text-table-wrapper">
      <table className="check-edit-text-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === datas.length}
                onChange={handleSelectAll}
              />
            </th>
            {tableTitles.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, idx) => {
            const isEditing = editingRow === idx;
  
            return (
              <tr
                key={idx}
                className={selectedRows.includes(idx) ? "check-edit-text-table-selected-row" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(idx)}
                    onChange={() => handleRowSelect(idx)}
                  />
                </td>
  
                {isEditing ? (
                  <>
                    {tableTitles.map((col) => (
                      <td key={col.key}>
                        <input
                          className="check-edit-text-input"
                          value={data[col.key] ?? ""}
                          onChange={(e) => {
                            const updated = [...datas];
                            updated[idx][col.key] = e.target.value;
                            setDatas(updated);
                          }}
                        />
                      </td>
                    ))}
                  </>
                ) : (
                  <>
                    {tableTitles.map((col) => (
                      <td
                        key={col.key}
                        className={col.key === "name" ? "check-edit-text-table-name" : ""}
                      >
                        {data[col.key]}
                      </td>
                    ))}
                  </>
                )}
                <td>
                  <FiEdit
                    onClick={() => setEditingRow(isEditing ? null : idx)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CheckEditTextTable;