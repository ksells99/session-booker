import {
  GET_SESSIONS,
  GET_SESSION,
  DELETE_SESSION,
  ADD_SESSION,
  SESSIONS_ERROR,
  SET_LOADING,
  CLEAR_SESSIONS,
} from "../actions/types";

const initialState = {
  sessions: [],
  session: {},
  current: null,
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSIONS:
      return {
        ...state,
        sessions: action.payload, // fill sessions state with payload data
        loading: false,
      };
    case GET_SESSION:
      return {
        ...state,
        session: action.payload,
        loading: false,
      };
    case ADD_SESSION:
      return {
        ...state,
        sessions: [action.payload, ...state.sessions],
      };
    case DELETE_SESSION:
      return {
        ...state,
        sessions: state.sessions.filter(
          (session) => session._id !== action.payload
        ), // only return sessions not matching the deleted one
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SESSIONS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_SESSIONS:
      return {
        ...state,
        sessions: [],
        session: {},
        current: null,
        loading: false,
        error: {},
      };
    default:
      return state;
  }
};
