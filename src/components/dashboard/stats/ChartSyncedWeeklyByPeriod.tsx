import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { fetchStatsWeekly } from '../../../apis/dashStatsApi';

const ChartSyncedWeeklyByPeriod = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [seriesData, setSeriesData] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStatsWeekly();
        const reversed = [...data].reverse();

        setCategories(
          reversed.map(item => {
            const [, eMonth, eDay] = item.endDate.split('-');
            return `~ ${parseInt(eMonth)}월 ${parseInt(eDay)}일`;
          })
        );
        setSeriesData(reversed.map(item => item.entered));
      } catch (error) {
        console.error('[ERROR] 주별 출입 통계 로딩 실패:', error);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      id: 'chart-weekly',
      type: 'line',
      height: 120,
      toolbar: { show: true },
    },
    colors: ['#5AC66F'],
    stroke: { width: 2, curve: 'smooth' },
    markers: { size: 5, hover: { size: 7 } },
    dataLabels: { enabled: false },
    xaxis: {
      type: 'category',
      categories,
      labels: {
        style: { fontSize: '11px' },
        rotate: -45,
      },
    },
    legend: { show: false },
  };

  return (
    <div className="chart-synced-total-by-period-group">
      <h3 className="chart-subtitle">주별 출입 추이</h3>
      <Chart
        options={options}
        series={[{ name: '출입 B', data: seriesData }]}
        type="line"
        height={130}
      />
    </div>
  );
};

export default ChartSyncedWeeklyByPeriod;
