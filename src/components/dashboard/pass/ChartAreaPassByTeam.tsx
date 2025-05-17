import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './css/ChartAreaPassByTeam.css';

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}시`);

const 병동관리팀 = [
  10, 12, 13, 10, 9, 14, 15, 12, 12, 14, 13, 16,
  17, 16, 14, 14, 13, 12, 11, 12, 13, 14, 13, 12,
];
const 의료정보팀 = 병동관리팀.map((v, i) => v - (i % 4 === 0 ? 1 : 0));
const 전산보안팀 = 병동관리팀.map((v, i) => v - (i % 5 === 0 ? 2 : 1));

const ChartAreaPassByTeam = () => {
  const options: ApexOptions = {
    chart: {
      height: 340,
      type: 'area',
      toolbar: { show: true },
    },
    title: {
      text: '시간대별 팀별 출입증 발급 건수',
      align: 'left',
      margin: 40,
      offsetX: 10,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#000',
      },
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        gradientToColors: ['#ffffff'],
        inverseColors: false,
        opacityFrom: 0.3,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: hours,
      labels: {
        rotate: -45,
        style: { fontSize: '12px' },
      },
    },
    yaxis: {
      min: 5,
      max: 20,
      title: { text: '건수' },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: 'bottom',
      fontSize: '13px',
      horizontalAlign: 'center',
    },
    colors: ['#0d6728', '#1c6765', '#5AC66F'],
  };

  const series = [
    {
      name: '병동관리팀 ✕',
      type: 'area',
      data: 병동관리팀,
    },
    {
      name: '의료정보팀 ✕',
      type: 'area',
      data: 의료정보팀,
    },
    {
      name: '전산보안팀 ✕',
      type: 'area',
      data: 전산보안팀,
    },
  ];

  return (
    <div className="chart-area-pass-by-team-card">
      <Chart options={options} series={series} type="area" height={440} />
    </div>
  );
};

export default ChartAreaPassByTeam;
