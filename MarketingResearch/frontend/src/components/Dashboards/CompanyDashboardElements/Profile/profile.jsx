import {
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  Alert,
  Snackbar,
} from '@mui/material';
import { Box } from '@mui/system';
import CompanyDashboardLayout from '../../CompanyDashboardLayout/dashboard';
import { useAsync } from 'react-async';
import { getProfile } from '../../../../actions/company';
import React from 'react';
import { changePassword } from '../../../../actions/auth';
import { changeEmail } from './../../../../actions/auth';

const ProfileElement = () => {
  // Popup snack
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');

  const handleClick = async () => {
    const res = await changePassword(password);
    setSnackMessage(res);
    setOpenSnack(true);
    setPassword('');
  };

  const emailChangeHandleClick = async () => {
    const res = await changeEmail(email);
    setSnackMessage(res);
    setOpenSnack(true);
    setEmail('');
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };
  ///////////////

  const [password, setPassword] = React.useState('');
  const passwordHandleChange = (event) => setPassword(event.target.value);

  const [email, setEmail] = React.useState('');
  const emailHandleChange = (event) => setEmail(event.target.value);

  const profile = useAsync({
    promiseFn: getProfile,
  });

  if (profile?.data)
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} sx={{ p: 3 }}>
          <Grid item xs={12}>
            <Paper>
              <Typography sx={{ p: 2, pl: 5 }} variant='h5' component='h5'>
                Профиль вашей компании
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ height: 400, pl: 5, pt: 4 }}>
              <Typography sx={{ mb: 2 }} variant='h6' component='h5'>
                Ваш логин: {profile?.data.username}
              </Typography>
              <TextField
                fullWidth
                sx={{ mb: 1, pr: 2 }}
                label='Введите новый пароль'
                variant='outlined'
                value={password}
                onChange={passwordHandleChange}
              />
              <Button
                sx={{ mb: 4 }}
                variant='contained'
                color='success'
                onClick={handleClick}
              >
                Сменить пароль
              </Button>

              <TextField
                fullWidth
                sx={{ mb: 1, pr: 2 }}
                label='Введите новый email'
                variant='outlined'
                value={email}
                onChange={emailHandleChange}
              />
              <Button
                sx={{ mb: 1 }}
                variant='contained'
                color='success'
                onClick={emailChangeHandleClick}
              >
                Сменить email
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper sx={{ height: 400, pl: 5, pt: 4 }}>
              <Typography sx={{ mb: 1 }} variant='h6' component='h5'>
                Название компании: {profile?.data?.company?.name}
              </Typography>
              <Typography sx={{ mb: 1 }} variant='h6' component='h5'>
                Недостатки компании: {profile?.data?.company?.problem}
              </Typography>
              <Typography sx={{ mb: 1 }} variant='h6' component='h5'>
                Email компании: {profile?.data?.email}
              </Typography>
              <Typography sx={{ mb: 1 }} variant='h6' component='h5'>
                Количество сотрудников: {profile?.data?.company?.employeeCount}
              </Typography>
              <Typography sx={{ mb: 1 }} variant='h6' component='h6'>
                Ваше имя: {profile?.data?.firstName}
              </Typography>
              <Typography sx={{ mb: 1 }} variant='h6' component='h6'>
                Ваша фамилия: {profile?.data?.lastName}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
          >
            {snackMessage ? snackMessage : ''}
          </Alert>
        </Snackbar>
      </Box>
    );
};

export default function Profile() {
  return (
    <CompanyDashboardLayout
      container={<ProfileElement />}
    ></CompanyDashboardLayout>
  );
}
