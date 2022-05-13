import { Container, Grid, Paper, Typography } from '@mui/material';
import CompanyDashboardLayout from '../../CompanyDashboardLayout/dashboard';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { getCompanyOrders } from '../../../../actions/company';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import ResearchOrder from './ResearchOrder/researchOrder';
import ResearchGrid from './ResearchGrid/researchGrid';
import ResearchCharts from './ResearchCharts/researchCharts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labelsLineChart = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
];

export const dataLineChart = {
  labelsLineChart,
  datasets: [
    {
      label: 'Dataset 1',
      data: labelsLineChart.map(() =>
        faker.datatype.number({ min: -1000, max: 1000 })
      ),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labelsLineChart.map(() =>
        faker.datatype.number({ min: -1000, max: 1000 })
      ),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

ChartJS.register(ArcElement, Tooltip, Legend);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const OrdersElement = () => {
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [orders, setOrders] = React.useState();

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Main charts */}
        {selectionModel.length > 0 ? (
          <ResearchCharts orderId={selectionModel[0]} orders={orders} />
        ) : (
          <ResearchCharts orderId={1} orders={orders} />
        )}

        {/* Create order with method */}
        <ResearchOrder />

        {/* Data grid with all company orders */}
        <ResearchGrid
          selectionModel={selectionModel}
          setSelectionModel={setSelectionModel}
          setOrders={setOrders}
        />
      </Grid>
    </Container>
  );
};

export default function Orders() {
  return (
    <CompanyDashboardLayout
      container={<OrdersElement />}
    ></CompanyDashboardLayout>
  );
}
