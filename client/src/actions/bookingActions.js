import axios from "axios";
import {
  GET_BOOKINGS,
  GET_SESSIONBOOKINGS,
  BOOKINGS_ERROR,
  ADD_BOOKING,
  DELETE_BOOKING,
} from "./types";
import { setLoading } from "./sessionActions";
import { setAlert } from "./alertActions";

// Get all bookings
export const getBookings = () => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get("/api/bookings");

    dispatch({
      type: GET_BOOKINGS,
      payload: res.data,
    });

    //
  } catch (err) {
    dispatch({
      type: BOOKINGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get bookings by session ID
export const getSessionBookings = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/bookings/sessionbookings/${id}`);

    dispatch({
      type: GET_SESSIONBOOKINGS,
      payload: res.data,
    });

    //
  } catch (err) {
    dispatch({
      type: BOOKINGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add booking
export const addBooking = ({ sessionID, memberID }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      "/api/bookings",
      { sessionID, memberID },
      config
    );

    dispatch({
      type: ADD_BOOKING,
      payload: res.data,
    });

    dispatch(setAlert("Booking added", "success"));

    //
  } catch (err) {
    dispatch({
      type: BOOKINGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete booking
export const deleteBooking = (id) => async (dispatch) => {
  if (window.confirm("Are you sure you wish to delete this booking?")) {
    try {
      setLoading();

      await axios.delete(`/api/bookings/${id}`);

      dispatch({ type: DELETE_BOOKING, payload: id });

      dispatch(setAlert("Booking removed", "success"));

      //
    } catch (err) {
      dispatch({ type: BOOKINGS_ERROR, payload: err.response.data.message });
    }
  }
};
