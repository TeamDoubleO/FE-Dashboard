import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './css/ChartGrowPassRequest.css';
import { fetchStatsHourly, StatsHourlyItem } from '../../../apis/dashPassApi';

const ChartGrowPassRequest = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    document.body.classList.contains('dark-mode')
  );
  const [hourlyData, setHourlyData] = useState<number[]>([]);
  const [hourLabels, setHourLabels] = useState<string[]>([]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res: StatsHourlyItem[] = await fetchStatsHourly();

        const values = res.map((item) => item.total);
        const labels = res.map((item) => `${item.hour}시`);

        setHourlyData(values);
        setHourLabels(labels);
      } catch (error) {
        console.error('시간대별 출입 수 데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    load();
  }, []);

  const options: ApexOptions = useMemo(() => ({
    chart: {
      height: 440,
      type: 'area',
      stacked: false,
      toolbar: { show: true },
      foreColor: isDarkMode ? '#ddd' : undefined,
    },
    title: {
      text: '시간대별 출입증 발급 건수',
      align: 'left',
      margin: 40,
      offsetX: 10,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#000',
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
    xaxis: {
      categories: hourLabels,
      labels: {
        rotate: -45,
        style: {
          fontSize: '12px',
          colors: isDarkMode ? '#ccc' : '#000',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: isDarkMode ? '#ccc' : '#000',
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: isDarkMode ? 'dark' : 'light',
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '13px',
      labels: {
        colors: isDarkMode ? '#eee' : '#000',
      },
    },
    colors: ['#0098ba'],
  }), [isDarkMode, hourLabels]);

  const series = [
    {
      name: '출입증 발급 건수',
      type: 'area',
      data: hourlyData,
    },
  ];

  return (
    <div className="chart-grow-pass-request-card">
      <Chart options={options} series={series} type="area" height={400} />
    </div>
  );
};

export default ChartGrowPassRequest;
