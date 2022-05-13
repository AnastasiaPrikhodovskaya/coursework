import React from 'react';
import { getProfile } from '../../../../actions/user';
import UserDashboardLayout from '../../UserDashboardLayout/dashboard';
import { useAsync } from 'react-async';
import { Box } from '@mui/system';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';

const ProfileElement = () => {
  const profile = useAsync({
    promiseFn: getProfile,
  });

  if (profile?.data)
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ p: 3 }}>
          {/* Profile */}
          <Grid item xs={12}>
            <Paper>
              <Typography sx={{ p: 2, pl: 5 }} variant='h5' component='h5'>
                Ваш профиль
              </Typography>
            </Paper>
          </Grid>

          {/* Login and password */}
          <Grid item xs={4}>
            <Paper sx={{ height: 320 }}>
              <Typography sx={{ p: 2 }} variant='h5' component='h2'>
                Имя пользователя: {profile?.data?.username}
              </Typography>
              <TextField sx={{ p: 1 }} fullWidth label='Новый пароль' />
              <Button sx={{ m: 1 }} variant='contained' color='success'>
                Сменить пароль
              </Button>
              <TextField sx={{ p: 1 }} fullWidth label='Новый email' />
              <Button sx={{ m: 1 }} variant='contained' color='success'>
                Сменить email
              </Button>
            </Paper>
          </Grid>

          {/* Other info */}
          <Grid item xs={8}>
            <Paper sx={{ height: 320, p: 2 }}>
              <Typography variant='h5' component='h2'>
                Email: {profile?.data?.email}
              </Typography>
              <Typography variant='h5' component='h2'>
                Ваше имя: {profile?.data?.firstName}
              </Typography>
              <Typography variant='h5' component='h2'>
                Ваша фамилия: {profile?.data?.lastName}
              </Typography>
              <Typography variant='h5' component='h2'>
                Пройдено опросов: {Math.floor(Math.random() * 5)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
};

export default function Profile() {
  return <UserDashboardLayout container={<ProfileElement />} />;
}
