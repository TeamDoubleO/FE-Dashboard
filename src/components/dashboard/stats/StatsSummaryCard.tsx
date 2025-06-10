import { useEffect, useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import './css/StatsSummaryCard.css';
import { fetchDashboardSummary } from '../../../apis/dashStatsApi';

interface CardItem {
  title: string;
  count: number;
  classKey: string;
  details: {
    입장: number;
    퇴장: number;
  };
}

const StatsSummaryCard = () => {
  const [summaryData, setSummaryData] = useState<CardItem[]>([]);
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggleDropdown = (index: number) => {
    setOpenIndices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getRandomInRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchDashboardSummary();

        const patient = result.find(item => item.category === 'PATIENT');
        const guardian = result.find(item => item.category === 'GUARDIAN');

        const visitor = {
          category: 'VISITOR',
          entered: getRandomInRange(2000, 2200),
          exited: getRandomInRange(1900, 2100),
          remaining: getRandomInRange(80, 120),
        };

        const totalEntered =
          (patient?.entered || 0) + (guardian?.entered || 0) + visitor.entered;
        const totalExited =
          (patient?.exited || 0) + (guardian?.exited || 0) + visitor.exited;
        const totalRemaining =
          (patient?.remaining || 0) + (guardian?.remaining || 0) + visitor.remaining;

        const newData: CardItem[] = [
          {
            title: '전체',
            count: totalRemaining,
            classKey: 'total',
            details: {
              입장: totalEntered,
              퇴장: totalExited,
            },
          },
          {
            title: '환자',
            count: patient?.remaining || 0,
            classKey: 'patient',
            details: {
              입장: patient?.entered || 0,
              퇴장: patient?.exited || 0,
            },
          },
          {
            title: '보호자',
            count: guardian?.remaining || 0,
            classKey: 'guardian',
            details: {
              입장: guardian?.entered || 0,
              퇴장: guardian?.exited || 0,
            },
          },
          {
            title: '방문객',
            count: visitor.remaining,
            classKey: 'visitor',
            details: {
              입장: visitor.entered,
              퇴장: visitor.exited,
            },
          },
        ];

        setSummaryData(newData);
      } catch (error) {
        console.error('요약 데이터 로딩 실패:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="stats-summary-card-wrapper">
      {summaryData.map((card, idx) => {
        const isOpen = openIndices.has(idx);
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
                      <th>총 입장 수</th>
                      <th>총 퇴장 수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{card.details.입장}</td>
                      <td>{card.details.퇴장}</td>
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
