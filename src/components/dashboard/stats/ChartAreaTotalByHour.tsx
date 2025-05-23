import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { fetchStatsHourly, StatsHourlyItem } from '../../../apis/statshourlyApi';
import './css/ChartAreaTotalByHour.css';

const ChartAreaTotalByHour = () => {
  const [hourlyData, setHourlyData] = useState<number[]>([]);
  const [hourLabels, setHourLabels] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchStatsHourly();

        // total 값에 index+1을 더해서 시각적으로 보이게 만듦 (테스트용)
        //const values = res.map((item: StatsHourlyItem, index: number) => item.total + (index + 1));
        const values = res.map((item: StatsHourlyItem) => item.total);
        const labels = res.map((item: StatsHourlyItem) => `${item.hour}시`);

        console.log('[DEBUG] adjusted values:', values);
        console.log('[DEBUG] hour labels:', labels);

        setHourlyData(values);
        setHourLabels(labels);
      } catch (error) {
        console.error('시간대별 출입 수 데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    load();
  }, []);

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
      categories: hourLabels,
      labels: {
        rotate: -45,
        style: { fontSize: '11px' },
      },
    },
    yaxis: {
      min: 0,
      labels: {
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
      },
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
        series={[{ name: '총 출입 수', data: hourlyData }]}
        type="area"
        height={440}
      />
    </div>
  );
};

export default ChartAreaTotalByHour;
