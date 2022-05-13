import React from 'react';
// For chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ResearchCompletedDoughnut = ({ orderId, orders }) => {
  if (orders?.length > 0)
    console.log(orders.find((item) => item.id === orderId));

  if (orders?.length > 0) {
    const order = orders.find((item) => item.id === orderId);

    const data = {
      labels: ['Осталось', 'Прошло'],
      datasets: [
        {
          data: [
            order.personNumber - order.personNumberPass,
            order.personNumberPass,
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1,
        },
      ],
    };
    return <Pie data={data} />;
  }
};

export default ResearchCompletedDoughnut;
