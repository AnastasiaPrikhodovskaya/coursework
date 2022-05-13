import axios from 'axios';
import { endpoints } from '../api/endpoints';
import { setOrders } from '../reducers/orderReducer';
import { store } from './../reducers/rootReducer';
import { setLogout } from './../reducers/authReducer';

export const getCompanyOrders = () => async (dispatch) => {
  try {
    const response = await axios.get(endpoints.companyOrders, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
      },
    });

    if (response?.data) {
      var mappedOrders = response.data.map((item) => ({
        id: item.id,
        method: item.method.name,
        methodDescription: item.method.description,
        personNumber: item.personCount,
        personNumberPass: item.passedPeople,
        dateStart: item.dateStart,
      }));

      dispatch(setOrders(mappedOrders));

      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyWithoutDispatch = async () => {
  try {
    const response = await axios.get(endpoints.companyOrders, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
      },
    });

    if (response?.data) {
      var mappedOrders = response.data.map((item) => ({
        id: item.id,
        method: item.method.name,
        methodDescription: item.method.description,
        personNumber: item.personCount,
        personNumberPass: 15,
        dateStart: new Date().toLocaleDateString(),
      }));

      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMethods = async () => {
  try {
    const response = await axios.get(endpoints.methods, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createMethodOrder = (order) => async (dispatch) => {
  try {
    const response = await axios.post(endpoints.companyOrders, order, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
      },
    });

    dispatch(getCompanyOrders());

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMethodStandardAnswers = async (item) => {
  try {
    const response = await axios.get(
      `${endpoints.standardAnswers}?method=${item.method}`,
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

export const getOrderAnswers = async (item) => {
  try {
    const response = await axios.get(
      `${endpoints.orderAnswers}?order=${item.orderId}`,
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

export const getProfile = async () => {
  try {
    const response = await axios.get(endpoints.companyProfile, {
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
