import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import './css/DashboardSample.css';

interface SparkData {
  label: string;
  value: number;
  color: string;
  data: number[];
}

const getCSSColor = (variableName: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();

const DashboardSample = () => {
  const [seasonalGreenPalette, setPalette] = useState<string[]>([]);

  useEffect(() => {
    setPalette([
      getCSSColor('--color1'),
      getCSSColor('--color2'),
      getCSSColor('--color3'),
      getCSSColor('--color4'),
    ]);
  }, []);

  const sparkOptions: ApexOptions = {
    chart: {
      type: 'line',
      sparkline: { enabled: true },
    },
    stroke: { curve: 'smooth' },
    tooltip: { enabled: false },
  };

  const sparkData: SparkData[] = [
    { label: 'CLICKS', value: 1213, color: getCSSColor('--color1'), data: [5, 8, 6, 9, 7, 8] },
    { label: 'VIEWS', value: 422, color: getCSSColor('--color2'), data: [2, 5, 3, 6, 4, 5] },
    { label: 'LEADS', value: 311, color: getCSSColor('--color3'), data: [3, 2, 5, 3, 4, 2] },
    { label: 'SALES', value: 22, color: getCSSColor('--color4'), data: [1, 3, 2, 4, 2, 3] },
  ];

  const radialReplacementOptions: ApexOptions = {
    chart: { type: 'area', height: 300, toolbar: { show: true } },
    colors: seasonalGreenPalette,
    dataLabels: { enabled: false },
    stroke: { curve: 'straight' },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetY: 10,
    },
    xaxis: {
      categories: ['01/01/2024', '01/02/2024', '01/03/2024', '01/04/2024', '01/05/2024', '01/06/2024', '01/07/2024'],
    },
    fill: { opacity: 0.3 },
    tooltip: { shared: true, intersect: false },
  };

  const radialReplacementSeries = [
    { name: 'Series 1', data: [0, 3, 6, 5, 7, 4, 6] },
    { name: 'Series 2', data: [0, 2, 4, 3, 6, 3, 4] },
    { name: 'Series 3', data: [0, 1, 3, 2, 5, 2, 3] },
  ];

  const lineOptions: ApexOptions = {
    chart: { type: 'line' },
    stroke: { curve: 'smooth' },
    xaxis: {
      categories: ['01/15', '01/16', '01/17', '01/18', '01/19', '01/20'],
    },
    colors: seasonalGreenPalette,
  };

  const lineSeries = [
    { name: 'Music', data: [1, 15, 26, 20, 33, 27] },
    { name: 'Photos', data: [3, 33, 21, 42, 19, 32] },
    { name: 'Files', data: [0, 39, 52, 11, 29, 43] },
  ];

  const barOptions: ApexOptions = {
    chart: { type: 'bar', stacked: true },
    xaxis: {
      categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2'],
    },
    colors: seasonalGreenPalette,
  };

  const barSeries = [
    { name: 'Product A', data: [14, 25, 21, 17, 12, 13] },
    { name: 'Product B', data: [13, 23, 20, 8, 13, 27] },
    { name: 'Product C', data: [11, 17, 15, 15, 21, 14] },
  ];

  const areaOptions: ApexOptions = {
    chart: { type: 'area' },
    stroke: { curve: 'straight' },
    xaxis: {
      categories: ['2011 Q4', '2012 Q1', '2012 Q2'],
    },
    colors: seasonalGreenPalette,
  };

  const areaSeries = [
    { name: 'Music', data: [40, 20, 10] },
    { name: 'Photos', data: [20, 10, 30] },
    { name: 'Files', data: [10, 30, 50] },
  ];

  // (생략된 상단 부분은 그대로입니다)

return (
    <>
      <Background />
      <Layout>
        <div className="dashboard-grid">
          {sparkData.map((s, i) => {
            const sparkWithColor: ApexOptions = {
              ...sparkOptions,
              colors: [s.color],
            };
  
            return (
              <div className="card small" key={i} style={{ borderTop: `4px solid ${s.color}` }}>
                <div className="card-label">{s.label}</div>
                <div className="card-value">{s.value}</div>
                <Chart
                  options={sparkWithColor}
                  series={[{ data: s.data }]}
                  type="line"
                  height={60}
                />
              </div>
            );
          })}
  
          {/* 1. Daily Visits Insights */}
          <div className="card large">
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Daily Visits Insights</div>
            <Chart
              options={radialReplacementOptions}
              series={radialReplacementSeries}
              type="area"
              height={300}
            />
          </div>
  
          {/* 2. Media Usage Trends */}
          <div className="card large">
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Media Usage Trends</div>
            <Chart
              options={lineOptions}
              series={lineSeries}
              type="line"
              height={300}
            />
          </div>
  
          {/* 3. Quarterly Product Sales */}
          <div className="card large">
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Quarterly Product Sales</div>
            <Chart
              options={barOptions}
              series={barSeries}
              type="bar"
              height={300}
            />
          </div>
  
          {/* 4. Category Growth Overview */}
          <div className="card large">
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Category Growth Overview</div>
            <Chart
              options={areaOptions}
              series={areaSeries}
              type="area"
              height={300}
            />
          </div>
        </div>
      </Layout>
    </>
  );  
};

export default DashboardSample;
