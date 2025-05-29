import { useEffect, useState } from 'react';
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

        const finalSeries = Object.entries(grouped).map(([buildingName, valueMap]) => {
          return {
            name: buildingName,
            data: sortedLabels.map((label) => valueMap[label] ?? 0),
          };
        });

        setCategories(sortedLabels);
        setSeries(finalSeries);
      } catch (err) {
        console.error('건물별 출입 통계 로딩 실패:', err);
      }
    };

    fetchData();
  }, []);

  const lineOptions: ApexOptions = {
    chart: { type: 'line' },
    stroke: { curve: 'straight', width: 2 },
    markers: { size: 0 },
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        foreColor: '#fff',
        borderRadius: 2,
        padding: 4,
        opacity: 0.9,
        dropShadow: { enabled: false },
      },
      style: {
        fontSize: '11px',
        fontWeight: 'bold',
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45,
        style: { fontSize: '11px' },
      },
    },
    colors: ['#5AC66F', '#235D3A', '#0d6728', '#626262', '#82c7e2', '#2e7d7a', ],
    title: {
      text: '건물별 요일 출입 추이',
      align: 'left',
      margin: 40,
      offsetX: 10,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#000',
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
  };

  return (
    <div className="chart-line-building-access-card">
      {series.length > 0 && (
        <Chart options={lineOptions} series={series} type="line" height={400} />
      )}
    </div>
  );
};

export default ChartLineBuildingAccess;
