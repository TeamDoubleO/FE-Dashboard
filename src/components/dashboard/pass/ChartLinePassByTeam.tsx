import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './css/ChartLinePassByTeam.css';

interface ChartLinePassByTeamProps {
  filters: {
    startDate: string;
    endDate: string;
    userTypes: string[];
    buildings: number[];
    zones: string[];
  };
}

// 날짜 라벨 생성
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

// 더미 데이터 생성
const generateDummyData = (base: number, length: number): number[] => {
  return Array.from({ length }, (_, i) =>
    Math.max(0, Math.floor(base + Math.sin(i / 3) * 4 + Math.random() * 3))
  );
};

const ChartLinePassByTeam = ({ filters }: ChartLinePassByTeamProps) => {
  const categories = generateDateLabels(filters.startDate, filters.endDate);
  const numDays = categories.length;

  // 건물별 고유 색 지정
  const buildingColors: Record<string, string> = {};
  const predefinedColors = ['#0d6728', '#009dd1', '#01377d', '#2e7d7a', '#5AC66F', '#a4b8cc'];
  let colorIndex = 0;

  // 시리즈 구성 + 건물별 색 등록
  const series = filters.zones.map((zone, idx) => {
    const [buildingName] = zone.split(':').map((s) => s.trim());
    if (!buildingColors[buildingName]) {
      buildingColors[buildingName] = predefinedColors[colorIndex % predefinedColors.length];
      colorIndex++;
    }

    return {
      name: zone,
      type: 'line',
      data: generateDummyData(5 + idx * 3, numDays),
    };
  });

  // 건물 순서대로 색 추출
  const seriesColors = filters.zones.map((zone) => {
    const [buildingName] = zone.split(':').map((s) => s.trim());
    return buildingColors[buildingName];
  });

  const options: ApexOptions = {
    chart: {
      height: 340,
      type: 'line',
      toolbar: { show: true },
    },
    title: {
      text: `최근 ${numDays}일간 구역별 출입증 발급 건수`,
      align: 'left',
      margin: 40,
      offsetX: 10,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#000',
      },
    },
    stroke: {
      width: 2,
      curve: 'straight',
    },
    fill: {
      type: 'solid',
      opacity: 1,
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
        style: { fontSize: '11px' },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: 'bottom',
      fontSize: '13px',
      horizontalAlign: 'center',
    },
    colors: seriesColors,
  };

  return (
    <div className="chart-line-pass-by-team-card">
      <Chart options={options} series={series} type="line" height={550} />
    </div>
  );
};

export default ChartLinePassByTeam;
