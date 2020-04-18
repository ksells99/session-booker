import {
  GET_SESSIONS,
  GET_SESSION,
  DELETE_SESSION,
  ADD_SESSION,
  SESSIONS_ERROR,
  SET_LOADING,
} from "./types";

import { setAlert } from "./alertActions";

import axios from "axios";

// GET SESSIONS FROM SERVER
export const getSessions = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get("/api/sessions");

    dispatch({ type: GET_SESSIONS, payload: res.data });

    //
  } catch (err) {
    dispatch({ type: SESSIONS_ERROR, payload: err.message });
  }
};

// Get specific session

export const getSession = (id) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get(`/api/sessions/${id}`);

    dispatch({
      type: GET_SESSION,
      payload: res.data,
    });

    //
  } catch (err) {
    const errors = err.response;

    // If there are errors...
    if (errors) {
      // Loop through and call SetAlert function, passing in error message and type

      dispatch(setAlert(errors.statusText, "danger"));
    }

    dispatch({
      type: SESSIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add session
export const addSession = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // form data = session date

  try {
    const res = await axios.post("/api/sessions", formData, config);

    dispatch({
      type: ADD_SESSION,
      payload: res.data,
    });

    dispatch(setAlert("Session added", "success"));

    //
  } catch (err) {
    dispatch({
      type: SESSIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete session & respective bookings
export const deleteSession = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you wish to delete this session? This will also delete any bookings for the session."
    )
  ) {
    try {
      setLoading();

      await axios.delete(`/api/sessions/${id}`);

      dispatch({ type: DELETE_SESSION, payload: id });

      dispatch(setAlert("Session removed", "success"));
    } catch (err) {
      dispatch({ type: SESSIONS_ERROR, payload: err.response.data.message });
    }
  }
};

// SET LOADING TO TRUE
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
