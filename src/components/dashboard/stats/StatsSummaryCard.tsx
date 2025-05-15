import { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import './css/StatsSummaryCard.css';

const cardData = [
  {
    title: '전체',
    count: 123,
    classKey: 'total',
    details: { 현재: 320, 입장: 200, 퇴장: 90, 잔류: 30 },
  },
  {
    title: '환자',
    count: 45,
    classKey: 'patient',
    details: { 현재: 150, 입장: 90, 퇴장: 40, 잔류: 20 },
  },
  {
    title: '보호자',
    count: 67,
    classKey: 'guardian',
    details: { 현재: 80, 입장: 60, 퇴장: 10, 잔류: 10 },
  },
  {
    title: '직원',
    count: 12,
    classKey: 'staff',
    details: { 현재: 50, 입장: 30, 퇴장: 10, 잔류: 10 },
  },
  {
    title: '방문객',
    count: 89,
    classKey: 'visitor',
    details: { 현재: 100, 입장: 70, 퇴장: 20, 잔류: 10 },
  },
  {
    title: '기타',
    count: 34,
    classKey: 'etc',
    details: { 현재: 40, 입장: 20, 퇴장: 10, 잔류: 10 },
  },
];

const StatsSummaryCard = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="stats-summary-card-wrapper">
      {cardData.map((card, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`stats-summary-card stats-summary-card-${card.classKey} ${
              isOpen ? 'unfolded' : 'folded'
            }`}
          >
            <div className="stats-summary-card-body">
              <div className="stats-summary-card-title">{card.title}</div>
              <div className="stats-summary-card-count">{card.count}</div>
            </div>

            <div className="stats-summary-card-footer" onClick={() => toggleDropdown(idx)}>
              <span>상세 보기</span>
              <span className="stats-arrow">
                {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </span>
            </div>

            {isOpen && (
              <div className="stats-summary-dropdown">
                <table className="stats-summary-table">
                  <thead>
                    <tr>
                      <th>인원</th>
                      <th>현재</th>
                      <th>입장</th>
                      <th>퇴장</th>
                      <th>잔류</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{card.title}</td>
                      <td>{card.details.현재}</td>
                      <td>{card.details.입장}</td>
                      <td>{card.details.퇴장}</td>
                      <td>{card.details.잔류}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatsSummaryCard;
