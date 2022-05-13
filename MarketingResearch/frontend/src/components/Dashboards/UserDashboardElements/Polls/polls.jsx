import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import UserDashboardLayout from '../../UserDashboardLayout/dashboard';
import { useAsync } from 'react-async';
import { getOrders } from './../../../../actions/user';
import PollModal from './pollModal';

const PollsElement = () => {
  const [order, setOrder] = React.useState('');
  const orderHandleChange = (event) => setOrder(event.target.value);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const orders = useAsync({
    promiseFn: getOrders,
  });

  if (orders?.data) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ m: 2, p: 2, mb: 0, pl: 5 }}>
              <Typography variant='h5'>Доступные опросы</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ m: 2, p: 2, mt: 0, height: 210 }}>
              <Typography sx={{ pl: 2, pb: 2 }}>
                Каждое прохождение опросов компаний, помогает им устранять свои
                недостатки.
              </Typography>
              <Stack align='center'>
                <FormControl sx={{ m: 1, minWidth: 3 }}>
                  <InputLabel>Варианты опросов</InputLabel>
                  <Select
                    label='Варианты опросов'
                    value={order}
                    onChange={orderHandleChange}
                  >
                    {orders?.data.map((order, index) => (
                      <MenuItem key={order.orderId} value={order.orderId}>
                        <ListItemText
                          primary={order.company}
                          secondary={order.method}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button onClick={handleOpen}>Начать проходить опрос</Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper></Paper>
          </Grid>
        </Grid>
        {order && (
          <PollModal
            open={open}
            handleClose={handleClose}
            order={
              orders?.data[orders?.data.findIndex((x) => x.orderId == order)]
            }
          />
        )}
      </Box>
    );
  }
};

export default function Polls() {
  return <UserDashboardLayout container={<PollsElement />} />;
}
