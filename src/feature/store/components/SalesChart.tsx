import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card, CardContent } from '@/core/components/ui/card';

const SalesChart = () => {
  const options: ApexOptions = {
    chart: {
      type: 'line' as const,
      toolbar: { show: false },
    },

    colors: ['#3b82f6', '#8b5cf6'],

    stroke: {
      curve: 'smooth' as const,
      width: 2,
    },

    xaxis: {
      categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'],
    },

    markers: {
      size: 4,
    },

    legend: {
      position: 'bottom' as const,
      horizontalAlign: 'left' as const,
    },

    grid: {
      show: true,
      borderColor: '#E5E7EB', // Tailwind gray-200
      strokeDashArray: 0, // dashed grid
      padding: {
        top: 10,
        right: 10,
        bottom: 0,
        left: 10,
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };

  const series = [
    { name: 'Orders', data: [5, 12, 10, 10, 13, 11, 8, 10, 6, 11] },
    { name: 'Revenue', data: [10, 18, 14, 11, 9, 12, 16, 14, 20, 13] },
  ];

  return (
    <Card className="py-0 col-span-2">
      <CardContent className="p-6 ">
        <h3 className="font-anton text-2xl font-normal leading-7 text-card-foreground text-start">Sales Overview</h3>
        <Chart options={options} series={series} type="line" height={250} />
      </CardContent>
    </Card>
  );
};

export default SalesChart;
