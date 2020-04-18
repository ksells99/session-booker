import {
  GET_BOOKINGS,
  GET_SESSIONBOOKINGS,
  BOOKINGS_ERROR,
  ADD_BOOKING,
  DELETE_BOOKING,
  SET_LOADING,
  CLEAR_BOOKINGS,
} from "../actions/types";

const initialState = {
  bookings: [],
  sessionBookings: {},
  current: null,
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload, // fill bookings state with payload data
        loading: false,
      };

    case GET_SESSIONBOOKINGS:
      return {
        ...state,
        sessionBookings: action.payload, // fill sessionbookings state with payload data
        loading: false,
      };
    case ADD_BOOKING:
      return {
        ...state,
        bookings: [action.payload, ...state.bookings],
      };
    case DELETE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking._id !== action.payload
        ), // only return bookings not matching the deleted one
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BOOKINGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_BOOKINGS:
      return {
        ...state,
        bookings: [],
        sessionBookings: {},
        current: null,
        loading: false,
        error: {},
      };
    default:
      return state;
  }
};
