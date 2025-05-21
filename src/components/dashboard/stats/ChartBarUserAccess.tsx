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
  colors: ['#82c7e2', '#2e7d7a', '#235D3A'], // 환자, 보호자, 방문객
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
  { name: '환자', data: [12, 14, 13, 15, 11, 10, 9] },
  { name: '보호자', data: [8, 7, 6, 9, 10, 11, 12] },
  { name: '방문객', data: [10, 12, 11, 10, 9, 14, 13] },
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
