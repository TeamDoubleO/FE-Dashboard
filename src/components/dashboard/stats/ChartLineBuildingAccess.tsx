import { useEffect, useState, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { fetchBuildings } from '../../../apis/dashPassApi';
import type { Building } from '../../../apis/dashPassApi';
import './css/ChartLineBuildingAccess.css';

const ChartLineBuildingAccess = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);

  // 건물 이름 API 호출
  useEffect(() => {
    fetchBuildings()
      .then(setBuildings)
      .catch((err) => console.error('건물 목록 불러오기 실패:', err));
  }, []);

  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
  const xCategories = useMemo(() => {
    const todayIndex = new Date().getDay();
    return Array.from({ length: 7 }, (_, i) => {
      const dayIndex = (todayIndex - 7 + i + 1 + 7) % 7;
      return dayLabels[dayIndex] + '요일';
    });
  }, []);

  // 건물 이름 사용 + 랜덤 출입 데이터
  const lineSeries = useMemo(() => {
    if (buildings.length === 0) return [];

    return buildings.map((b, idx) => ({
      name: b.buildingName,
      data: Array.from({ length: 7 }, () =>
        Math.floor(20 + Math.random() * 10 - idx) // 예시 데이터
      ),
    }));
  }, [buildings]);

  // ApexCharts 옵션
  const lineOptions: ApexOptions = {
    chart: { type: 'line' },
    stroke: { curve: 'straight', width: 2 },
    markers: { size: 0 },
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        foreColor: '#fff',
        borderRadius: 2,
        padding: 4,
        opacity: 0.9,
        dropShadow: { enabled: false },
      },
      style: {
        fontSize: '11px',
        fontWeight: 'bold',
      },
    },
    xaxis: {
      categories: xCategories,
      labels: {
        rotate: -45,
        style: { fontSize: '11px' },
      },
    },
    colors: ['#82c7e2', '#2e7d7a', '#5AC66F', '#235D3A', '#0d6728', '#626262'],
    title: {
      text: '건물별 요일 출입 추이',
      align: 'left',
      margin: 40,
      offsetX: 10,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#000',
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
  };

  return (
    <div className="chart-line-building-access-card">
      {lineSeries.length > 0 && (
        <Chart options={lineOptions} series={lineSeries} type="line" height={400} />
      )}
    </div>
  );
};

export default ChartLineBuildingAccess;
