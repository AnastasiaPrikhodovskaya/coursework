import {
  FormControl,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Modal,
  OutlinedInput,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { setOrderAnswers } from '../../../../actions/user';
import { data } from './../../CompanyDashboardElements/Statistics/Tabs/Charts/charts';

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

const ListQuestions = ({ order, handleClose }) => {
  const initialState = order.questions.map((question) => ({
    questionId: question.id,
    answerName: '',
  }));

  const [answers, setAnswers] = React.useState(initialState);

  const answersHandler = (id, event) => {
    const answer = event.target.value;
    setAnswers(
      answers.map((item) =>
        item.questionId === id ? { ...item, answerName: answer } : item
      )
    );
  };

  const btnSubmit = async () => {
    for (let item of answers) if (item.answer == '') return;

    await setOrderAnswers(order.orderId, answers);

    handleClose();
  };

  return (
    <Paper
      sx={{ p: 2, pb: 0, bgcolor: '#AAA5', borderRadius: 5 }}
      align='center'
    >
      <Box sx={{ mx: 'auto', width: 700 }}>
        <List
          align='center'
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            overflow: 'auto',
            maxHeight: 500,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          {order.questions.map((question, index) => (
            <li key={question.id}>
              <ul>
                <ListSubheader
                  sx={{
                    p: 0,
                    mt: 3,
                    lineHeight: 2,
                    fontSize: '1.2rem',
                  }}
                >
                  {`${index + 1}. ${question.name}`}
                </ListSubheader>
                <RadioGroup
                  key={question.id}
                  onChange={(event) => answersHandler(question.id, event)}
                >
                  {question?.standardAnswers.map((answer) => (
                    <ListItem sx={{ m: 0, p: 0, ml: 3 }} key={answer.id}>
                      <FormControl>
                        <FormControlLabel
                          value={answer.name}
                          label={answer.name}
                          control={<Radio />}
                        />
                      </FormControl>
                    </ListItem>
                  ))}
                </RadioGroup>
              </ul>
            </li>
          ))}
        </List>
      </Box>
      <Button onClick={btnSubmit}>Завершить</Button>
    </Paper>
  );
};

const PollModal = ({ open, handleClose, order }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant='h4' component='h2' align='center' sx={{ mb: 2 }}>
          Опрос для компании: {order.company}
        </Typography>
        <Typography variant='h5' component='h2' align='center' sx={{ mb: 2 }}>
          Метод: {order.method}
        </Typography>
        <ListQuestions order={order} handleClose={handleClose}></ListQuestions>
      </Box>
    </Modal>
  );
};

export default PollModal;
