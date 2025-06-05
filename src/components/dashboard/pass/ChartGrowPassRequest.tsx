import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './css/ChartGrowPassRequest.css';

const 신청건수 = [
  10, 12, 13, 11, 9, 14, 15, 13, 12, 14, 15, 16,
  17, 16, 15, 14, 13, 12, 11, 12, 13, 16, 13, 12,
];

const 발급건수 = [
  10, 12, 13, 10, 9, 14, 15, 12, 12, 14, 13, 16,
  17, 16, 14, 14, 13, 12, 11, 12, 13, 14, 13, 12,
];

const ChartGrowPassRequest = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    document.body.classList.contains('dark-mode')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
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
      text: '시간대별 출입증 신청·발급 건수',
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
      type: 'category',
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
    colors: ['#0098ba', '#2e7a4a'],
  }), [isDarkMode]);

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
      <Chart options={options} series={series} type="area" height={400} />
    </div>
  );
};

export default ChartGrowPassRequest;
