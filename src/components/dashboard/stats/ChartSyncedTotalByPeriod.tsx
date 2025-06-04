import './css/ChartSyncedTotalByPeriod.css';
import ChartSyncedDailyByPeriod from './ChartSyncedDailyByPeriod';
import ChartSyncedWeeklyByPeriod from './ChartSyncedWeeklyByPeriod';
import ChartSyncedMonthlyByPeriod from './ChartSyncedMonthlyByPeriod';

const ChartSyncedTotalByPeriod = () => {
  return (
    <div className="chart-synced-total-by-period-card">
      <div className="chart-synced-total-by-period-wrapper">
        <h2 className="chart-synced-total-by-period-title">기간별 출입 현황</h2>

        <div className="chart-synced-total-by-period-group chart-synced-total-by-period-toolbar">
          <ChartSyncedDailyByPeriod />
        </div>

        <div className="chart-synced-total-by-period-group">
          <ChartSyncedWeeklyByPeriod />
        </div>

        <div className="chart-synced-total-by-period-group">
          <ChartSyncedMonthlyByPeriod />
        </div>
      </div>
    </div>
  );
};

export default ChartSyncedTotalByPeriod;
