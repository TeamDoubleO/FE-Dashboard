import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './css/ChartLinePassRequest.css';

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}시`);

const 발급건수 = [
  10, 12, 13, 10, 9, 14, 15, 12, 12, 14, 13, 16,
  17, 16, 14, 14, 13, 12, 11, 12, 13, 14, 13, 12,
];

const ChartLinePassRequest = () => {
  const options: ApexOptions = {
    chart: {
      height: 300,
      type: 'area',
      toolbar: { show: true },
    },
    title: {
      text: '검색 결과 전체',
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
        gradientToColors: ['#0d6728'],
        inverseColors: false,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: ['#fff'],
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 4,
        backgroundColor: '#0d6728',
        borderWidth: 0,
      },
      offsetY: -6,
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
      enabled: true,
    },
    colors: ['#0d6728'],
  };

  const series = [
    {
      name: '출입증 발급 건수',
      type: 'area',
      data: 발급건수,
    },
  ];

  return (
    <div className="chart-line-pass-request-card">
      <Chart options={options} series={series} type="area" height={450} />
    </div>
  );
};

export default ChartLinePassRequest;
