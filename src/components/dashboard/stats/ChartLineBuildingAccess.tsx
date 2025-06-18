import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import {
  fetchStatsDailyByBuilding,
  StatsDailyByBuildingItem,
} from '../../../apis/dashStatsApi';
import './css/ChartLineBuildingAccess.css';

const ChartLineBuildingAccess = () => {
  const [series, setSeries] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.body.classList.contains('dark-mode')
  );

  const chartColors = ['#5AC66F', '#235D3A', '#2e7d7a', '#82c7e2', '#0d6728', '#626262'];

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: StatsDailyByBuildingItem[] = await fetchStatsDailyByBuilding();
        const labelSet = new Set<string>();
        const grouped: { [building: string]: { [label: string]: number } } = {};

        data.forEach(({ date, day, buildingName, total }) => {
          const dayNum = new Date(date).getDate();
          const label = `${dayNum}일 ${day}요일`;
          labelSet.add(label);
          if (!grouped[buildingName]) {
            grouped[buildingName] = {};
          }
          grouped[buildingName][label] = total;
        });

        const sortedLabels = Array.from(labelSet).sort((a, b) => {
          const getNum = (str: string) => parseInt(str.split('일')[0]);
          return getNum(a) - getNum(b);
        });

        const finalSeries = Object.entries(grouped).map(([buildingName, valueMap]) => ({
          name: buildingName,
          data: sortedLabels.map((label) => valueMap[label] ?? 0),
        }));

        setCategories(sortedLabels);
        setSeries(finalSeries);
      } catch (err) {
        console.error('건물별 출입 통계 로딩 실패:', err);
        setCategories([]);
        setSeries([]);
      }
    };

    fetchData();
  }, []);

  const lineOptions: ApexOptions = useMemo(() => ({
    chart: { type: 'line' },
    stroke: { curve: 'straight', width: 3 },
    markers: { size: 0 },
    colors: chartColors,
    dataLabels: {
      enabled: true,
      useHtml: false,
      background: {
        enabled: true,
        backgroundColor: '#666',
        foreColor: '#fff',
        borderRadius: 4,
        opacity: 0.7,
        dropShadow: { enabled: false },
      },
      style: {
        fontSize: '11px',
        fontWeight: 'bold',
        colors: ['#fff'], // redundant but ensured
      },
      formatter: (val) => val,
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45,
        style: {
          fontSize: '11px',
          colors: isDarkMode ? '#ccc' : '#000',
        },
      },
    },
    title: {
      text: '건물별 출입 현황',
      align: 'left',
      margin: 40,
      offsetX: 10,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#000',
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDarkMode ? '#aaa' : '#000',
          fontSize: '11px',
        },
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      labels: {
        colors: isDarkMode ? '#eee' : '#000',
      },
    },
  }), [categories, isDarkMode]);

  return (
    <div className="chart-line-building-access-card">
      <Chart
        options={lineOptions}
        series={series.length > 0 ? series : [{ name: '데이터 없음', data: [] }]}
        type="line"
        height={400}
      />
    </div>
  );
};

export default ChartLineBuildingAccess;
