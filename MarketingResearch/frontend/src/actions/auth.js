import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  setIsAuthUser,
  setIsAuthCompany,
  setLogout,
} from '../reducers/authReducer';
import { endpoints } from '../api/endpoints';

export var headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
  },
};

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] =
  'Origin, X-Requested-With, Content-Type, Accept';

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoints.login, {
        username,
        password,
      });

      let token = response.data.accessToken;
      jwtDecode(token);
      let roles = response.data.user.roles;

      localStorage.setItem('token', token);
      if (roles.includes('ROLE_USER')) dispatch(setIsAuthUser(token));
      else if (roles.includes('ROLE_COMPANY'))
        dispatch(setIsAuthCompany(token));

      if (roles.find((item) => item.name == 'ROLE_USER'))
        dispatch(setIsAuthUser(token));
      else if (roles.find((item) => item.name == 'ROLE_COMPANY'))
        dispatch(setIsAuthCompany(token));
    } catch (error) {
      console.log(error);
    }
  };
};

export const registerUser = (user) => {
  return async (dispatch) => {
    try {
      console.log(user);
      const response = await axios.post(endpoints.registerUser, user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
};

export const registerCompany = (companyUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoints.registerCompany, companyUser);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem('token');
      dispatch(setLogout());
    } catch (error) {
      console.log(error);
    }
  };
};

export const changePassword = async (password) => {
  try {
    const response = await axios.post(
      endpoints.changePassword,
      { password: password },
      headers = {
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

export const changeEmail = async (email) => {
  try {
    const response = await axios.post(
      endpoints.changeEmail,
      { email: email },
      headers = {
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
