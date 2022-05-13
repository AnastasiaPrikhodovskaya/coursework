export const SET_IS_AUTH_USER = "SET_IS_AUTH_USER";
export const SET_IS_AUTH_COMPANY = "SET_IS_AUTH_COMPANY";
export const LOGOUT = "LOGOUT";

const defaultState = {
  token: null,
  isAuthUser: false,
  isAuthCompany: false,
};

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_IS_AUTH_USER:
      return {
        ...state,
        token: action.payload,
        isAuthUser: true,
      };
    case SET_IS_AUTH_COMPANY:
      return {
        ...state,
        token: action.payload,
        isAuthCompany: true,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthUser: false,
        isAuthCompany: false,
      };
    default:
      return state;
  }
}

export const setIsAuthUser = (token) => ({
  type: SET_IS_AUTH_USER,
  payload: token,
});

export const setIsAuthCompany = (token) => ({
  type: SET_IS_AUTH_COMPANY,
  payload: token,
});

export const setLogout = () => ({
  type: LOGOUT,
  payload: null,
});
