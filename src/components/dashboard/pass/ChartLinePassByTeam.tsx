import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './css/ChartLinePassByTeam.css';
import { fetchStatsByFilter, convertUserTypesToCategories } from '../../../apis/dashPassApi';
import type { UserCategory } from '../../../apis/dashPassApi';
import Loading from '../../loading/Loading';

interface ChartLinePassByTeamProps {
  filters: {
    startDate: string;
    endDate: string;
    userTypes: string[];
    buildings: number[];
    zones: string[];
  };
}

const generateDateLabels = (start: string, end: string): string[] => {
  const dates: string[] = [];
  const startDate = new Date(start);
  const endDateObj = new Date(end);
  while (startDate <= endDateObj) {
    dates.push(`${startDate.getMonth() + 1}/${startDate.getDate()}`);
    startDate.setDate(startDate.getDate() + 1);
  }
  return dates;
};

const ChartLinePassByTeam = ({ filters }: ChartLinePassByTeamProps) => {
  const categories = generateDateLabels(filters.startDate, filters.endDate);
  const numDays = categories.length;
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark-mode'));
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const areaCodeToLabel: Record<string, string> = {};
      filters.zones.forEach((z) => {
        const [code, label] = z.split('||');
        if (code && label) areaCodeToLabel[code] = label;
      });

      const areaCodes = Object.keys(areaCodeToLabel);
      const convertedCategories = convertUserTypesToCategories(filters.userTypes) as UserCategory[];

      const includeVisitor = convertedCategories.includes('VISITOR');
      const apiCategories = convertedCategories.filter((c) => c !== 'VISITOR');

      try {
        const data = await fetchStatsByFilter({
          startDate: filters.startDate,
          endDate: filters.endDate,
          categories: apiCategories,
          areaCodes,
        });

        const zoneMap: Record<string, number[]> = {};
        Object.values(areaCodeToLabel).forEach((label) => {
          zoneMap[label] = Array(numDays).fill(0);
        });

        const seenEntries = new Set<string>();
        data.forEach((entry) => {
          const dateLabel = `${new Date(entry.date).getMonth() + 1}/${new Date(entry.date).getDate()}`;
          const label = areaCodeToLabel[entry.areaCode];
          const dayIdx = categories.indexOf(dateLabel);

          const key = `${entry.areaCode}-${entry.date}`;
          if (label && dayIdx !== -1 && !seenEntries.has(key)) {
            zoneMap[label][dayIdx] += entry.passCount;
            seenEntries.add(key);
          }
        });

        if (includeVisitor) {
          Object.entries(areaCodeToLabel).forEach(([code, label]) => {
            if (code === 'AA_01_03') return;
            for (let i = 0; i < numDays; i++) {
              const dummyVisitor = Math.floor(Math.random() * 71) + 20;
              zoneMap[label][i] += dummyVisitor;
            }
          });
        }

        const predefinedColors = ['#0d6728', '#009dd1', '#01377d', '#2e7d7a', '#5AC66F', '#a4b8cc'];
        const buildingColors: Record<string, string> = {};
        let colorIndex = 0;

        const newSeries = Object.entries(zoneMap).map(([label, data]) => {
          const [buildingName] = label.split(':').map((s) => s.trim());
          if (!buildingColors[buildingName]) {
            buildingColors[buildingName] = predefinedColors[colorIndex % predefinedColors.length];
            colorIndex++;
          }
          return {
            name: label,
            type: 'line',
            data,
            color: buildingColors[buildingName],
          };
        });

        setSeries(newSeries);
      } catch (err) {
        console.error('[ERROR] 출입 통계 로딩 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [filters]);

  const options: ApexOptions = useMemo(() => ({
    chart: {
      height: 340,
      type: 'line',
      toolbar: { show: true },
      foreColor: isDarkMode ? '#f0f0f0' : '#000',
    },
    title: {
      text: `최근 ${numDays}일간 구역별 출입증 발급 건수`,
      align: 'left',
      margin: 40,
      offsetX: 10,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: isDarkMode ? '#f0f0f0' : '#000',
      },
    },
    stroke: {
      width: 2,
      curve: 'straight',
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '11px',
        fontWeight: 'bold',
      },
      background: {
        enabled: true,
        borderRadius: 4,
        padding: 4,
        opacity: 0.9,
      },
    },
    xaxis: {
      categories,
      labels: {
        rotate: -45,
        style: {
          fontSize: '11px',
          colors: isDarkMode ? '#f0f0f0' : '#000',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '11px',
          colors: isDarkMode ? '#f0f0f0' : '#000',
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
      fontSize: '13px',
      horizontalAlign: 'center',
      labels: {
        colors: isDarkMode ? '#f0f0f0' : '#000',
      },
    },
    colors: series.map((s) => s.color),
  }), [categories, series, numDays, isDarkMode]);

  return (
    <div className="chart-line-pass-by-team-card">
      {loading ? <Loading /> : <Chart options={options} series={series} type="line" height={550} />}
    </div>
  );
};

export default ChartLinePassByTeam;
