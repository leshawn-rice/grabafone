import uuid  from 'react-uuid';

import {
  LOGIN,
  LOGOUT,
  UPDATE,
  START_LOADING,
  STOP_LOADING,
  GENERATE_KEY,
  // DELETE_KEY,
  CHANGE_TOKEN,
  SHOW_ERRORS,
  REMOVE_ERROR,
  CLEAR_ERRORS,
} from './actionTypes';

import BackendAPI from '../tools/backendAPI';

/**
 *
 * Called at the start of any action that interacts with the backend API
 *
 * Starts the loading screen, and clears any errors currently in state
 *
 */

const startApiAction = () => {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      dispatch(clearErrors());
    } catch (errors) {
      dispatch(handleApiErrors(errors));
    }
  };
};

/**
 *
 * Called at the end of any action that interacts with the backend API
 *
 * Ends the loading screen, and handles any errors as necessary
 *
 */

const endApiAction = () => {
  return async function (dispatch) {
    try {
      dispatch(stopLoading());
    } catch (errors) {
      dispatch(handleApiErrors(errors));
    }
  };
};

/**
 *
 * @param {array} errors
 *
 * handles any errors thrown in the process of interacting with the backend API
 *
 * Stops the loading screen and shows the errors
 *
 */

const handleApiErrors = (errors) => {
  return async function (dispatch) {
    dispatch(stopLoading());
    for (let error of errors) {
      error.id = uuid();
    }
    dispatch(showErrors(errors));
  };
};
/**
 *
 * @param {object} userData
 *
 * given the userData, registers the user on the backend and stores the new user and token
 * in state
 */

const registerUserApi = (userData) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { token, user } = await BackendAPI.register(userData);
      dispatch(loginUser({ token, user }));
      dispatch(endApiAction());
    } catch (errors) {
      dispatch(handleApiErrors(errors));
    }
  };
};

/**
 *
 * @param {object} userData
 *
 * given the userData, logs in the user on the backend and stores the new user and token
 * in state
 */

const loginUserApi = (userData) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { token, user } = await BackendAPI.login(userData);
      dispatch(loginUser({ token, user }));
      dispatch(endApiAction());
    } catch (errors) {
      dispatch(handleApiErrors(errors));
    }
  };
};

/**
 *
 * @param {string} oldToken
 * @param {string} username
 * @param {string} email
 *
 * Interacts with the backend API to update the user's email, and stores the new token & user in state
 */

const updateEmailApi = (oldToken, username, email) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { token, user } = await BackendAPI.updateEmail(
        oldToken,
        username,
        email
      );
      dispatch(updateUser({ token, user }));
      dispatch(endApiAction());
    } catch (errors) {
      dispatch(handleApiErrors(errors));
    }
  };
};

/**
 *
 * @param {string} oldToken
 * @param {string} username
 * @param {string} oldPassword
 * @param {string} newPassword
 *
 * Interacts with the backend API to update the user's password, and stores the new token & user in state
 */

const updatePasswordApi = (oldToken, username, oldPassword, newPassword) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { token, user } = await BackendAPI.updatePassword(
        oldToken,
        username,
        oldPassword,
        newPassword
      );
      dispatch(updateUser({ token, user }));
      dispatch(endApiAction());
    } catch (errors) {
      dispatch(handleApiErrors(errors));
    }
  };
};

/**
 *
 * Interacts with the backend API to delete the user from the DB and removes them from state
 */

const deleteUserApi = (token, username) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { message } = await BackendAPI.deleteUser(token, username);
      dispatch(logoutUser());
      dispatch(endApiAction());
      dispatch(showErrors([{ message: message.message, status: 202 }]));
    } catch (errors) {
      dispatch(handleApiErrors(errors));
    }
  };
};

const generateKeyApi = (token) => {
  return async function(dispatch) {
    try {
      dispatch(startApiAction());
      const { apiKey } = await BackendAPI.generateApiKey(token);
      dispatch(generateKey(apiKey));
      dispatch(endApiAction());
    }
    catch (errors) {
      dispatch(handleApiErrors(errors));
    }
  }
};

const refreshTokenApi = (oldToken) => {
  return async function(dispatch) {
    try {
      dispatch(startApiAction());
      const { token } = await BackendAPI.refreshApiToken(oldToken);
      dispatch(changeToken(token));
      dispatch(endApiAction());
    }
    catch (errors) {
      dispatch(handleApiErrors(errors));
    }
  }
}
const loginUser = (userData) => {
  return {
    type: LOGIN,
    payload: userData,
  };
};

const updateUser = (data) => {
  return {
    type: UPDATE,
    payload: data,
  };
};

const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};

const generateKey = (apiKey) => {
  return {
    type: GENERATE_KEY,
    payload: apiKey
  }
};

const changeToken = (token) => {
  return {
    type: CHANGE_TOKEN,
    payload: token
  }
}

const startLoading = () => {
  return {
    type: START_LOADING,
  };
};

const stopLoading = () => {
  return {
    type: STOP_LOADING,
  };
};

const showErrors = (errors) => {
  return {
    type: SHOW_ERRORS,
    payload: errors,
  };
};

const removeError = (error_id) => {
  return {
    type: REMOVE_ERROR,
    payload: error_id
  }
}

const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export {
  registerUserApi,
  loginUserApi,
  deleteUserApi,
  updateEmailApi,
  updatePasswordApi,
  generateKeyApi,
  refreshTokenApi,
  logoutUser,
  clearErrors,
  removeError,
  showErrors,
  startLoading,
  stopLoading,
};
