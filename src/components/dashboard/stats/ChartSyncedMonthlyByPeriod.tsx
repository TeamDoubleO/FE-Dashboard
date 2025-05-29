import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { fetchStatsMonthly } from '../../../apis/dashStatsApi';

const ChartSyncedMonthlyByPeriod = () => {
  const [monthlyCategories, setMonthlyCategories] = useState<string[]>([]);
  const [monthlySeries, setMonthlySeries] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const monthly = await fetchStatsMonthly();
        const sorted = [...monthly].sort((a, b) => {
          if (a.year === b.year) return a.month - b.month;
          return a.year - b.year;
        });

        const categories = sorted.map((item, index) => {
          const shortYear = String(item.year).slice(-2);
          const currentMonth = `${item.month}월`;
          if (index === 0 || item.year !== sorted[index - 1].year) {
            return `${shortYear}년 ${currentMonth}`;
          }
          return currentMonth;
        });

        const series = sorted.map(item => item.total);

        setMonthlyCategories(categories);
        setMonthlySeries(series);
      } catch (error) {
        console.error('[ERROR] 월별 출입 통계 로딩 실패:', error);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      id: 'chart-monthly',
      type: 'line',
      height: 120,
      toolbar: { show: true },
    },
    colors: ['#82c7e2'],
    stroke: { width: 2, curve: 'smooth' },
    markers: { size: 5, hover: { size: 7 } },
    dataLabels: { enabled: false },
    xaxis: {
      type: 'category',
      categories: monthlyCategories,
      labels: {
        style: { fontSize: '11px' },
        rotate: -45,
      },
    },
    legend: { show: false },
  };

  return (
    <div className="chart-synced-total-by-period-group">
      <h3 className="chart-subtitle">월별 출입 추이</h3>
      <Chart
        options={options}
        series={[{ name: '출입 C', data: monthlySeries }]}
        type="line"
        height={130}
      />
    </div>
  );
};

export default ChartSyncedMonthlyByPeriod;
