import React from 'react';
import { Grid, Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CompanyDashboardLayout from '../../CompanyDashboardLayout/dashboard';
import TabReportItem from './Tabs/Reports/reports';
import TabChartItem from './Tabs/Charts/charts';

const StatisticsElement = () => {
  const [value, setValue] = React.useState('reports');
  const handleChange = (event, newValue) => setValue(newValue);

  const [orderId, setOrderId] = React.useState(1);

  return (
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={6} md={12}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} centered>
              <Tab label='Отчеты' value='reports' />
              <Tab label='Графики' value='charts' />
              {/* <Tab label='Выводы' value='conclusions' /> */}
            </TabList>
          </Box>
          <TabPanel value='reports'>
            <TabReportItem orderId={orderId} setOrderId={setOrderId} />
          </TabPanel>
          <TabPanel value='charts'>
            <TabChartItem orderId={orderId} />
          </TabPanel>
          {/* <TabPanel value='conclusions'>Item Three</TabPanel> */}
        </TabContext>
      </Grid>
    </Grid>
  );
};

export default function Statistics() {
  return (
    <CompanyDashboardLayout
      container={<StatisticsElement />}
    ></CompanyDashboardLayout>
  );
}
