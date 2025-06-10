import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './css/ChartBarUserAccess.css';
import {
  fetchStatsDailyByCategory,
  StatsDailyByCategoryItem,
} from '../../../apis/dashStatsApi';

const ChartBarUserAccess = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    document.body.classList.contains('dark-mode')
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: StatsDailyByCategoryItem[] = await fetchStatsDailyByCategory();
        const grouped: {
          [date: string]: {
            day: string;
            patient: number;
            guardian: number;
          };
        } = {};

        data.forEach((item) => {
          if (!grouped[item.date]) {
            grouped[item.date] = { day: item.day, patient: 0, guardian: 0 };
          }
          if (item.category === 'PATIENT') grouped[item.date].patient = item.total;
          if (item.category === 'GUARDIAN') grouped[item.date].guardian = item.total;
        });

        const sortedDates = Object.keys(grouped).sort();

        const xLabels: string[] = [];
        const patients: number[] = [];
        const guardians: number[] = [];
        const visitors: number[] = [];

        sortedDates.forEach((dateStr) => {
          const { day, patient, guardian } = grouped[dateStr];
          const dayNumber = new Date(dateStr).getDate();
          const label = `${dayNumber}일 ${day}요일`;
          xLabels.push(label);

          const visitorCount = Math.floor(Math.random() * 101) + 2000;
          patients.push(patient);
          guardians.push(guardian);
          visitors.push(visitorCount);
        });

        setCategories(xLabels);
        setSeries([
          { name: '환자', data: patients },
          { name: '보호자', data: guardians },
          { name: '방문객', data: visitors },
        ]);
      } catch (err) {
        console.error('[ERROR] 사용자 출입 통계 로딩 실패:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const options: ApexOptions = useMemo(() => ({
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: true },
    },
    title: {
      text: '사용자별 출입 현황',
      align: 'left',
      margin: 40,
      offsetX: 10,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#000',
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: isDarkMode ? '#ccc' : '#000',
          fontSize: '11px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDarkMode ? '#ccc' : '#000',
          fontSize: '11px',
        },
      },
    },
    colors: ['#82c7e2', '#2e7d7a', '#235D3A'],
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '14px',
              fontWeight: 600,
              color: isDarkMode ? '#fff' : '#000',
            },
          },
        },
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      labels: {
        colors: isDarkMode ? '#eee' : '#333',
      },
    },
  }), [categories, isDarkMode]);

  return (
    <div className="chart-bar-user-access-card">
      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  );
};

export default ChartBarUserAccess;
