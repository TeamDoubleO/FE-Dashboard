import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { fetchStatsDaily } from '../../../apis/dashStatsApi';

const ChartSyncedDailyByPeriod = () => {
  const [dailyCategories, setDailyCategories] = useState<string[]>([]);
  const [dailySeries, setDailySeries] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const daily = await fetchStatsDaily();
        const reversed = [...daily].reverse();

        setDailyCategories(() => {
          let prevMonth = '';
          return reversed.map(item => {
            const [, month, day] = item.date.split('-');
            const currentMonth = parseInt(month).toString();
            const currentDay = parseInt(day).toString();

            if (currentMonth !== prevMonth) {
              prevMonth = currentMonth;
              return `${currentMonth}월 ${currentDay}일`;
            }
            return `${currentDay}일`;
          });
        });

        setDailySeries(reversed.map(item => item.total));
      } catch (error) {
        console.error('[ERROR] 일별 출입 통계 로딩 실패:', error);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      id: 'chart-daily',
      type: 'line',
      height: 160,
      toolbar: { show: true },
    },
    colors: ['#1c6765'],
    stroke: { width: 2, curve: 'smooth' },
    markers: { size: 5, hover: { size: 7 } },
    dataLabels: { enabled: false },
    xaxis: {
      type: 'category',
      categories: dailyCategories,
      labels: {
        style: { fontSize: '11px' },
        rotate: -45,
      },
    },
    legend: { show: false },
  };

  return (
    <div className="chart-synced-total-by-period-group chart-synced-total-by-period-toolbar">
      <h3 className="chart-subtitle">날짜별 출입 추이</h3>
      <Chart
        options={options}
        series={[{ name: '출입 A', data: dailySeries }]}
        type="line"
        height={130}
      />
    </div>
  );
};

export default ChartSyncedDailyByPeriod;
