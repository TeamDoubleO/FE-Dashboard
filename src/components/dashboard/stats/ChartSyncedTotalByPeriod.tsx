import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './css/ChartSyncedTotalByPeriod.css';

const dailyCategories = [
  '11 Feb', '12 Feb', '13 Feb', '14 Feb', '15 Feb',
  '16 Feb', '17 Feb', '18 Feb', '19 Feb', '20 Feb',
  '21 Feb', '22 Feb', '23 Feb', '24 Feb', '25 Feb',
  '26 Feb', '27 Feb', '28 Feb', '1 Mar'
];

const weeklyCategories = ['1주차', '2주차', '3주차', '4주차'];
const monthlyCategories = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

const SHARED_GROUP_ID = 'access-stats-group';

const optionsWithMainTitle = (
  id: string,
  color: string,
  categories: string[]
): ApexOptions => ({
  chart: {
    id,
    group: SHARED_GROUP_ID,
    type: 'line',
    height: 160,
    toolbar: { show: true },
  },
  title: {
    text: '기간별 총 출입 추이',
    align: 'left',
    margin: 8,
    offsetX: 10,
    offsetY: 5,
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#000',
    },
  },
  subtitle: {
    text: '날짜별 출입 추이',
    align: 'left',
    offsetX: 12,
    offsetY: 40,
    margin: 0,
    style: {
      fontSize: '15px',
      fontWeight: 600,
      color: '#444',
    },
  },
  colors: [color],
  stroke: { width: 2, curve: 'smooth' },
  markers: { size: 5, hover: { size: 7 } },
  dataLabels: { enabled: false },
  xaxis: {
    categories,
    labels: { style: { fontSize: '11px' } },
  },
  legend: { show: false },
});

const baseOptions = (
  id: string,
  color: string,
  categories: string[],
  subtitleText: string
): ApexOptions => ({
  chart: {
    id,
    group: SHARED_GROUP_ID,
    type: 'line',
    height: 120,
    toolbar: { show: true },
  },
  subtitle: {
    text: subtitleText,
    align: 'left',
    offsetX: 12,
    offsetY: 10,
    margin: 0,
    style: {
      fontSize: '15px',
      fontWeight: 600,
      color: '#444',
    },
  },
  colors: [color],
  stroke: { width: 2, curve: 'smooth' },
  markers: { size: 5, hover: { size: 7 } },
  dataLabels: { enabled: false },
  xaxis: {
    categories,
    labels: { style: { fontSize: '11px' } },
  },
  legend: { show: false },
});

const ChartSyncedTotalByPeriod = () => {
  return (
    <div className="chart-synced-total-by-period-card">
      <div className="chart-synced-total-by-period-wrapper">
        <div className="chart-synced-total-by-period-group chart-synced-total-by-period-toolbar">
          <Chart
            options={optionsWithMainTitle('chart-daily', '#1c6765', dailyCategories)}
            series={[{
              name: '출입 A',
              data: [35, 50, 30, 40, 33, 32, 60, 44, 38, 35, 50, 48, 30, 40, 32, 31, 45, 43, 52],
            }]}
            type="line"
            height={160}
          />
        </div>

        <div className="chart-synced-total-by-period-group">
          <Chart
            options={baseOptions('chart-weekly', '#5AC66F', weeklyCategories, '주별 출입 추이')}
            series={[{ name: '출입 B', data: [130, 142, 118, 136] }]}
            type="line"
            height={120}
          />
        </div>

        <div className="chart-synced-total-by-period-group">
          <Chart
            options={baseOptions('chart-monthly', '#82c7e2', monthlyCategories, '월별 출입 추이')}
            series={[{ name: '출입 C', data: [20, 28, 25, 30, 27, 35, 32, 30, 29, 26, 31, 33] }]}
            type="line"
            height={120}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartSyncedTotalByPeriod;
