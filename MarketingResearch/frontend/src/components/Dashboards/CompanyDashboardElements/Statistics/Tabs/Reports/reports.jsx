import { DataGrid } from '@mui/x-data-grid';
import { getOrderAnswers } from '../../../../../../actions/company';
import { useAsync } from 'react-async';
import { v4 } from 'uuid';
import {
  Box,
  Paper,
  Button,
  Select,
  MenuItem,
  ListItemText,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { getCompanyWithoutDispatch } from '../../../../../../actions/company';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function removeDuplicates(arr) {
  const result = [];
  const duplicatesIndices = [];

  // Перебираем каждый элемент в исходном массиве
  arr.forEach((current, index) => {
    if (duplicatesIndices.includes(index)) return;

    result.push(current);

    // Сравниваем каждый элемент в массиве после текущего
    for (
      let comparisonIndex = index + 1;
      comparisonIndex < arr.length;
      comparisonIndex++
    ) {
      const comparison = arr[comparisonIndex];
      const currentKeys = Object.keys(current);
      const comparisonKeys = Object.keys(comparison);

      // Проверяем длину массивов
      if (currentKeys.length !== comparisonKeys.length) continue;

      // Проверяем значение ключей
      const currentKeysString = currentKeys.sort().join('').toLowerCase();
      const comparisonKeysString = comparisonKeys.sort().join('').toLowerCase();
      if (currentKeysString !== comparisonKeysString) continue;

      // Проверяем индексы ключей
      let valuesEqual = true;
      for (let i = 0; i < currentKeys.length; i++) {
        const key = currentKeys[i];
        if (current[key] !== comparison[key]) {
          valuesEqual = false;
          break;
        }
      }
      if (valuesEqual) duplicatesIndices.push(comparisonIndex);
    } // Конец цикла
  });
  return result;
}

function mapData(data) {
  const set = new Set();
  const map = new Map();

  var rows = data.map((item) => {
    set.add(`${item?.question.name}`);
    return {
      id: v4(),
      [`${item?.question.name}`]: item?.name,
    };
  });

  let mappedRows = [];

  for (let i = 0; i < rows.length; i++) {
    for (let entry of Object.entries(rows[i])) {
      if (entry[0] != 'id') {
        if (!map.has(entry[0])) {
          map.set(entry[0], 0);
        }
        map.set(entry[0], map.get(entry[0]) + 1);
      }
    }
  }

  for (let i = 0; i < rows.length; i++) {
    mappedRows[i] = rows[i];
  }

  for (let col of map) {
    var k = 0;
    for (let i = 0; i < rows.length; i++) {
      for (let entry of Object.entries(rows[i])) {
        if (entry[0] == col[0]) {
          mappedRows[k][entry[0]] = entry[1];
          k++;
        }
      }
    }
  }

  mappedRows.splice(mappedRows.length / map.size);

  return mappedRows;
}

const Reports = ({ orderId }) => {
  const [selectionModel, setSelectionModel] = React.useState([]);

  const { data } = useAsync({
    promiseFn: getOrderAnswers,
    orderId: orderId,
    watch: orderId,
  });

  var columns = null;

  if (data) {
    columns = data.map((item) => {
      return {
        field: item?.question.name,
        headerName: item?.question.name,
        width: 200,
      };
    });

    columns = removeDuplicates(columns);

    var mappedRows = mapData(data);

    if (data.length != 0) {
      return (
        <Paper style={{ height: 600, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={mappedRows}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            selectionModel={selectionModel}
            hideFooterSelectedRowCount
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
        </Paper>
      );
    } else return <Typography>Еще никто не прошел анкетирование.</Typography>;
  }

  return <Button>Load</Button>;
};

const Orders = ({ orderId, setOrderId }) => {
  const handleChange = (event) => setOrderId(event.target.value);

  const { data } = useAsync({
    promiseFn: getCompanyWithoutDispatch,
  });

  function downloadFile(filePath) {
    axios({
      url: 'http://localhost:8089/api/company/reports/export/excel', //your url
      method: 'GET',
      responseType: 'blob', // important
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.xlsx'); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }

  if (data) {
    return (
      <FormControl variant='standard' sx={{ mt: 2, mb: 4, mr: 2 }} width={300}>
        <InputLabel>Выберите исследование</InputLabel>
        <Select
          id='orders'
          value={orderId}
          onChange={handleChange}
          label='Ваши исследования'
        >
          {data &&
            data.map((order) => (
              <MenuItem key={order.id} value={order.id}>
                <ListItemText
                  primary={order.method.name}
                  secondary={`Количество человек: ${order.personCount}`}
                />
              </MenuItem>
            ))}
        </Select>
        <Button
          onClick={() =>
            downloadFile(
              'http://localhost:8089/api/company/reports/export/excel'
            )
          }
        >
          Скачать отчет
        </Button>
      </FormControl>
    );
  }
};

export default function TabReportItem({ orderId, setOrderId }) {
  return (
    <Box>
      <Orders orderId={orderId} setOrderId={setOrderId} />
      <Reports orderId={orderId} />
    </Box>
  );
}
