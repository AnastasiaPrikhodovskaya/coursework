import { Box, Grid, Paper, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { styled } from '@mui/material/styles';
import { useAsync } from 'react-async';
import { getCompanyWithoutDispatch } from './../../../../../../actions/company';

ChartJS.register(ArcElement, Tooltip, Legend);

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    'rgba(' +
    o(r() * s) +
    ',' +
    o(r() * s) +
    ',' +
    o(r() * s) +
    ',' +
    '0.2' +
    ')'
  );
}

export const data = {
  labels: ['18-25', '25-35', '35-40', '40-50', '50-60', '65+'],
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TabChartItem = ({ orderId }) => {
  const ordersData = useAsync({
    promiseFn: getCompanyWithoutDispatch,
  });

  if (ordersData?.data) {
    const order = ordersData?.data.find((x) => x.id == orderId);
    const questionSet = new Set();

    order.answers.map((item) => {
      questionSet.add(item?.question?.name);
    });

    var mappedData = [];
    var j = 0;

    for (let question of questionSet) {
      var labelData = [];
      var i = 0;
      order.answers.map((item) => {
        if (question == item.question.name) {
          labelData[i] = item;
          i++;
        }
      });
      labelData = labelData.reduce((acc, el) => {
        acc[el.name] = (acc[el.name] || 0) + 1;
        return acc;
      }, {});
      mappedData[j] = {
        question: question,
        labels: Object.keys(labelData),
        data: Object.values(labelData),
      };
      j++;
      labelData = [];
    }

    console.log(mappedData);

    return (
      <Paper>
        <Grid container spacing={2}>
          {mappedData.map((item) => {
            const dataChart = {
              labels: item.labels,
              datasets: [
                {
                  data: item.data,
                  backgroundColor: [
                    random_rgba(),
                    random_rgba(),
                    random_rgba(),
                    random_rgba(),
                    random_rgba(),
                    random_rgba(),
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            };
            return (
              <Grid item xs={4} md={4}>
                <Typography align='center'>{item.question}</Typography>
                <Pie data={dataChart} />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    );
  }
};

export default TabChartItem;
