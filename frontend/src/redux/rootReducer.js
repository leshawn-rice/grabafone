import { LOGIN, LOGOUT, GENERATE_KEY, DELETE_KEY, SHOW_ERRORS, CLEAR_ERRORS, REMOVE_ERROR } from './actionTypes';

const INITIAL_STATE = {
  user: {},
  token: null,
  api_key: null,
  errors: [],
};

/**
 *
 * @param {object} state
 * @param {object} action
 *
 * handles the user in state
 */

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // set the user & token to the data in the payload if a payload is passed, or null values otherwise
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    // set the user to an empty object and token to null
    case LOGOUT:
      return {
        ...state,
        user: {},
        token: null,
      };
    case GENERATE_KEY:
      return {
        ...state,
        api_key: action.payload,
      };
    case DELETE_KEY:
      return {
        ...state,
        api_key: null,
      };
    case SHOW_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    case REMOVE_ERROR:
      return {
        ...state,
        errors: [...state.errors.filter(error => error.id !== action.payload)]
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: []
      }
    default:
      return state;
  }
};

export default rootReducer;
