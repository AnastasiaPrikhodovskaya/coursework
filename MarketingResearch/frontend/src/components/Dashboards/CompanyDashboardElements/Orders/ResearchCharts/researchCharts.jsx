import { Grid, Paper, Typography } from '@mui/material';
import ResearchVarietyDoughnut from './Charts/researchVarietyDoughnut';
import ResearchCompletedLine from './Charts/researchCompletedDoughnut';

const ResearchCharts = ({ orderId, orders }) => {
  return (
    <Grid item xs={12} md={8} lg={8}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 460,
        }}
      >
        {/* <Typography component='h1' variant='h5' align='center'>
          Ваши исследования
        </Typography> */}
        <Grid container spacing={2} justifyContent={'center'}>
          <Grid item xs={4} md={5}>
            <Typography align='center'>Диаграмма исследований</Typography>
            <ResearchVarietyDoughnut />
          </Grid>
          <Grid item xs={4} md={5}>
            <Typography align='center'>Ход выполнения исследования</Typography>
            <ResearchCompletedLine orderId={orderId} orders={orders} />
            {/* <Line options={options} data={dataLineChart} /> */}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ResearchCharts;
