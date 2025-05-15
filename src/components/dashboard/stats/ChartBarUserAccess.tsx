import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './css/ChartBarUserAccess.css';

const barOptions: ApexOptions = {
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: { show: true },
  },
  title: {
    text: '요일별 사용자 출입 현황 요약',
    align: 'left',
    margin: 40,
    offsetX: 10,
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#000',
    },
  },
  xaxis: {
    categories: ['월', '화', '수', '목', '금', '토', '일'],
  },
  colors: ['#82c7e2', '#1c6765', '#5AC66F', '#235D3A'],
  dataLabels: {
    enabled: true,
    style: {
      colors: ['#fff'],
    },
  },
  plotOptions: {
    bar: {
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: '14px',
            fontWeight: 600,
            color: '#000',
          },
        },
      },
    },
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
  },
};

const barSeries = [
  { name: '병동', data: [10, 12, 11, 19, 14, 8, 7] },
  { name: '외래', data: [8, 10, 7, 11, 13, 16, 15] },
  { name: '방문객', data: [16, 9, 10, 7, 8, 15, 14] },
  { name: '직원', data: [20, 28, 19, 22, 15, 17, 16] },
];

const ChartBarUserAccess = () => {
  return (
    <div className="chart-bar-user-access-card">
      <Chart
        options={barOptions}
        series={barSeries}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default ChartBarUserAccess;
