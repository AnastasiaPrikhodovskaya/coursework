import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getCompanyOrders } from '../../../../../actions/company';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'method', headerName: 'Метод', width: 150 },
  { field: 'methodDescription', headerName: 'Описание метода', width: 230 },
  {
    field: 'personNumber',
    headerName: 'Количество человек',
    type: 'number',
    width: 150,
  },
  {
    field: 'personNumberPass',
    headerName: 'Прошло опрос',
    type: 'number',
    width: 180,
  },
  {
    field: 'comment',
    headerName: 'Комментарий',
    width: 300,
  },
  {
    field: 'dateStart',
    headerName: 'Дата начала',
    width: 180,
  },
];

const ResearchGrid = ({ selectionModel, setSelectionModel, setOrders }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCompanyOrders());
  }, []);

  const orders = useSelector((state) => state.orders.orders);
  setOrders(orders);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography component='h1' variant='h5' sx={{ mb: 2 }}>
          Ваши исследования:
        </Typography>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={orders}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={(selection) => {
              if (selection.length > 1) {
                const selectionSet = new Set(selectionModel);
                const result = selection.filter((s) => !selectionSet.has(s));
                setSelectionModel(result);
              } else {
                setSelectionModel(selection);
              }
            }}
          />
        </div>
      </Paper>
    </Grid>
  );
};

export default ResearchGrid;
