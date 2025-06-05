import { useEffect, useState, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { fetchStatsHourly, StatsHourlyItem } from '../../../apis/dashStatsApi';
import './css/ChartAreaTotalByHour.css';

const ChartAreaTotalByHour = () => {
  const [hourlyData, setHourlyData] = useState<number[]>([]);
  const [hourLabels, setHourLabels] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    document.body.classList.contains('dark-mode')
  );

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchStatsHourly();
        setHourlyData(res.map((item: StatsHourlyItem) => item.total));
        setHourLabels(res.map((item: StatsHourlyItem) => `${item.hour}시`));
      } catch (error) {
        console.error('시간대별 출입 수 데이터를 불러오는 데 실패했습니다:', error);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const areaOptions: ApexOptions = useMemo(() => ({
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
        style: {
          fontSize: '11px',
          colors: isDarkMode ? '#ffffff' : '#000000',
        },
      },
    },
    yaxis: {
      min: 0,
      labels: {
        style: {
          fontSize: '11px',
          colors: isDarkMode ? '#ffffff' : '#000000',
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -10,
      style: {
        fontSize: '12px',
        colors: [isDarkMode ? '#ffffff' : '#000000'],
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
      text: '시간대별 출입 현황',
      align: 'left',
      margin: 40,
      offsetX: 10,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: isDarkMode ? '#ffffff' : '#000000',
      },
    },
    legend: { show: false },
  }), [hourLabels, isDarkMode]);

  return (
    <div className="chart-area-total-by-hour-card">
      <Chart
        options={areaOptions}
        series={[{ name: '총 출입 수', data: hourlyData }]}
        type="area"
        height={460}
      />
    </div>
  );
};

export default ChartAreaTotalByHour;
