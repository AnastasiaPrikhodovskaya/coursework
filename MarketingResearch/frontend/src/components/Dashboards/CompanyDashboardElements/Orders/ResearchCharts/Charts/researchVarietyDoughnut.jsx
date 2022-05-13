import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyOrders } from '../../../../../../actions/company';
// For chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ResearchVarietyDoughnut = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCompanyOrders());
  }, []);

  const orders = useSelector((state) => state.orders.orders);

  // Data for chart
  const chartLabels = orders.map((item) => item.method);

  const chartData = chartLabels.reduce(function (acc, el) {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  const chartDataMapped = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: 'Ваши исследования',
        data: Object.values(chartData),
        borderWidth: 1,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  };

  return <Doughnut data={chartDataMapped} />;
};

export default ResearchVarietyDoughnut;
