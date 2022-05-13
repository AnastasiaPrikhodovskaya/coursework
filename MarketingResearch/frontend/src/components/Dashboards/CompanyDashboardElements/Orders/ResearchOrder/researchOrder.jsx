import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  Grid,
  Paper,
  Button,
  TextField,
  Typography,
  Modal,
  Box,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import { useAsync, useFetch } from 'react-async';
import {
  createMethodOrder,
  getMethods,
  getMethodStandardAnswers,
} from '../../../../../actions/company';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import { useDispatch } from 'react-redux';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ExampleAnswersModal({ open, handleClose, method }) {
  var { data, error } = useAsync({
    promiseFn: getMethodStandardAnswers,
    method: method,
    watch: method,
  });

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant='h6' component='h2' align='center' sx={{ mb: 2 }}>
            Вопросы, показанные пользователям
          </Typography>
          <Paper sx={{ p: 2, bgcolor: '#AAA5', borderRadius: 5 }}>
            <Box sx={{ mx: 'auto', width: 700 }}>
              <List
                align='center'
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  overflow: 'auto',
                  maxHeight: 560,
                  '& ul': { padding: 0 },
                }}
                subheader={<li />}
              >
                {data &&
                  data.map((question, index) => (
                    <li key={`${question.id}`}>
                      <ul>
                        <ListSubheader
                          sx={{
                            p: 0,
                            mt: 3,
                            lineHeight: 2,
                            fontSize: '1.2rem',
                          }}
                        >{`${index + 1}. ${question.name}`}</ListSubheader>
                        {question?.standardAnswers.map((answer) => (
                          <ListItem sx={{ ml: 3 }} key={`${answer.id}`}>
                            <ListItemText
                              primary={
                                <FormControl>
                                  <OutlinedInput
                                    sx={{ width: 300 }}
                                    disabled
                                    value={`${answer.name}`}
                                  />
                                </FormControl>
                              }
                            ></ListItemText>
                          </ListItem>
                        ))}
                      </ul>
                    </li>
                  ))}
              </List>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </div>
  );
}

export default function ResearchOrder() {
  const dispatch = useDispatch();

  // For modal window
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, error } = useAsync({ promiseFn: getMethods });

  const [method, setMethod] = React.useState('Исследование рынка');
  const [clientCount, setClientCount] = React.useState(0);
  const [comment, setComment] = React.useState('');

  const handleChange = (event) => setMethod(event.target.value);
  const clientCountHandleChange = (event) => setClientCount(event.target.value);
  const commentHandleChange = (event) => setComment(event.target.value);

  const btnCalcSampleHandle = () => {
    var sample = (3.8416 * 0.5 * (1 - 0.5)) / (0.05 * 0.05);
    sample = sample / (1 + (sample - 1) / clientCount);

    setClientCount(Math.round(sample));
  };

  return (
    <Grid item xs={12} md={4} lg={4}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 460,
        }}
      >
        <Typography align='center' component='h1' variant='h5'>
          Провести исследование
        </Typography>

        <FormControl variant='standard' sx={{ mt: 2, ml: 2, mr: 2 }}>
          <InputLabel id='methods'>Метод</InputLabel>
          <Select
            labelId='methods'
            id='methods'
            value={method}
            onChange={handleChange}
            label='Метод'
          >
            {data &&
              data.map((method, index) => (
                <MenuItem key={method.id} value={method.name}>
                  <ListItemText
                    primary={method.name}
                    secondary={method.description}
                  />
                </MenuItem>
              ))}
          </Select>
          <Button onClick={handleOpen}>Открыть пример вопросов</Button>

          {/* Modal window */}
          <ExampleAnswersModal
            open={open}
            handleClose={handleClose}
            method={method}
          />
        </FormControl>

        <TextField
          type={'number'}
          label='Количество клиентов'
          variant='standard'
          value={clientCount}
          onChange={clientCountHandleChange}
          sx={{ mt: 4, ml: 2, mr: 2 }}
        />
        <Button onClick={btnCalcSampleHandle} sx={{ mt: 1 }}>
          Расчитать выборку
        </Button>

        <TextField
          label='Комментарий'
          variant='standard'
          value={comment}
          onChange={commentHandleChange}
          sx={{ mt: 0, ml: 2, mr: 2 }}
        />

        <Button
          sx={{ mt: 2 }}
          variant='outlined'
          onClick={() =>
            dispatch(
              createMethodOrder({
                method: method,
                personCount: clientCount,
                comment: comment,
              })
            )
          }
        >
          Заказать исследование
        </Button>
      </Paper>
    </Grid>
  );
}
