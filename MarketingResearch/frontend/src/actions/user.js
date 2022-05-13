import axios from 'axios';
import { endpoints } from '../api/endpoints';

export const getProfile = async () => {
  try {
    const response = await axios.get(endpoints.userProfile, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get(endpoints.allOrders, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const setOrderAnswers = async (orderId, answers) => {
  try {
    const response = await axios.post(
      endpoints.allOrders + `/${orderId}`,
      { orderId: orderId, answers: answers },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
        },
      }
    );

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
