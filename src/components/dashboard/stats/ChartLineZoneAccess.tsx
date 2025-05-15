import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './css/ChartLineZoneAccess.css';

const ChartLineZoneAccess = () => {
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  const xCategories = useMemo(() => {
    const now = new Date();
    const todayIndex = now.getDay();
    return Array.from({ length: 7 }, (_, i) => {
      const dayIndex = (todayIndex - 7 + i + 1 + 7) % 7;
      return dayLabels[dayIndex] + '요일';
    });
  }, []);

  const lineOptions: ApexOptions = {
    chart: { type: 'line' },
    stroke: { curve: 'straight', width: 2 },
    markers: {
      size: 0, // 네모만 보이게 하고 마커 숨김
    },
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        foreColor: '#fff',
        borderRadius: 2,
        padding: 4,
        opacity: 0.9,
        dropShadow: {
          enabled: false,
        },
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
    colors: ['#82c7e2', '#1c6765', '#5AC66F', '#235D3A', '#0d6728', '#626262'],
    title: {
      text: '구역별 요일 출입 추이',
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

  const lineSeries = [
    { name: '구역 A', data: [18, 25, 30, 22, 28, 24, 20] },
    { name: '구역 B', data: [12, 18, 15, 20, 23, 22, 19] },
    { name: '구역 C', data: [9, 14, 17, 19, 21, 20, 16] },
    { name: '구역 D', data: [20, 23, 25, 28, 30, 29, 26] },
    { name: '구역 E', data: [10, 15, 12, 18, 16, 17, 15] },
    { name: '구역 F', data: [6, 9, 11, 14, 13, 12, 10] },
  ];

  return (
    <div className="chart-line-zone-access-card">
      <Chart
        options={lineOptions}
        series={lineSeries}
        type="line"
        height={400}
      />
    </div>
  );
};

export default ChartLineZoneAccess;
