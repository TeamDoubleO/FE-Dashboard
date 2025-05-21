import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './css/ChartGrowPassRequest.css';

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}시`);

const 신청건수 = [
  10, 12, 13, 11, 9, 14, 15, 13, 12, 14, 15, 16,
  17, 16, 15, 14, 13, 12, 11, 12, 13, 16, 13, 12,
];

const 발급건수 = [
  10, 12, 13, 10, 9, 14, 15, 12, 12, 14, 13, 16,
  17, 16, 14, 14, 13, 12, 11, 12, 13, 14, 13, 12,
];


const ChartGrowPassRequest = () => {
  const options: ApexOptions = {
    chart: {
      height: 440,
      type: 'area',
      stacked: false,
      toolbar: { show: true },
    },
    title: {
      text: '시간대별 출입증 신청·발급 건수',
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
      curve: 'straight',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        gradientToColors: ['#ffffff'],
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    labels: hours,
    xaxis: {
      type: 'category',
      labels: {
        rotate: -45,
        style: { fontSize: '12px' },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '13px',
    },
    colors: ['#0098ba', '#235D3A'],
  };

  const series = [
    {
      name: '출입증 신청 건수',
      type: 'area',
      data: 신청건수,
    },
    {
      name: '출입증 발급 건수',
      type: 'area',
      data: 발급건수,
    },
  ];

  return (
    <div className="chart-grow-pass-request-card">
      <Chart options={options} series={series} type="area" height={440} />
    </div>
  );
};

export default ChartGrowPassRequest;
