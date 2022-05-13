import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link style={{ textDecoration: 'none' }} to={'/profile'}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Профиль' />
      </ListItemButton>
    </Link>

    <Link style={{ textDecoration: 'none' }} to={'/polls'}>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary='Опросы' />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
