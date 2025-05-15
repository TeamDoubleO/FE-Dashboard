import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './css/ChartAreaTotalByHour.css';

const ChartAreaTotalByHour = () => {
  const labels = Array.from({ length: 24 }, (_, i) => `${i}시`);
  const fixedData = [
    32, 28, 24, 25, 19, 25, 21, 22, 20, 28, 32, 29,
    31, 27, 22, 24, 30, 26, 24, 26, 24, 32, 30, 28,
  ];

  const areaOptions: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: true },
      zoom: { enabled: false },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      categories: labels,
      labels: {
        rotate: -45,
        style: { fontSize: '11px' },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -10,
      style: {
        fontSize: '12px',
        colors: ['#000'],
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        backgroundColor: '#1c6765',
      }
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      strokeColors: '#fff',
      hover: { size: 5 },
    },
    colors: ['#1c6765'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    title: {
      text: '시간대별 총 출입 수',
      align: 'left',
      margin: 40,
      offsetX: 10,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#000',
      },
    },
    legend: { show: false },
  };

  return (
    <div className="chart-area-total-by-hour-card">
      <Chart
        options={areaOptions}
        series={[{ name: '총 출입 수', data: fixedData }]}
        type="area"
        height={440}
      />
    </div>
  );
};

export default ChartAreaTotalByHour;
