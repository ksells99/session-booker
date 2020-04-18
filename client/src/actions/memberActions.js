import {
  GET_MEMBERS,
  GET_MEMBER,
  MEMBERS_ERROR,
  ADD_MEMBER,
  EDIT_MEMBER,
  DELETE_MEMBER,
} from "./types";

import { setAlert } from "./alertActions";
import { setLoading } from "./sessionActions";

import axios from "axios";

// GET MEMBERS FROM SERVER
export const getMembers = () => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get("/api/members");

    dispatch({ type: GET_MEMBERS, payload: res.data });

    //
  } catch (err) {
    dispatch({ type: MEMBERS_ERROR, payload: err.message });
  }
};

// Get specific member

export const getMember = (id) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get(`/api/members/${id}`);

    dispatch({
      type: GET_MEMBER,
      payload: res.data,
    });

    //
  } catch (err) {
    const errors = err.response;
    console.log(errors);

    // If there are errors...
    if (errors) {
      dispatch(setAlert(errors.statusText, "danger"));
    }

    dispatch({
      type: MEMBERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add member
export const addMember = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/members", formData, config);

    dispatch({
      type: ADD_MEMBER,
      payload: res.data,
    });

    dispatch(setAlert("Member added", "success"));

    //
  } catch (err) {
    dispatch({
      type: MEMBERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit member
export const editMember = ({ id, firstName, lastName }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    setLoading();

    const res = await axios.put(
      `/api/members/${id}`,
      { id, firstName, lastName },
      config
    );

    dispatch({ type: EDIT_MEMBER, payload: res.data });

    dispatch(setAlert("Member edited successfully", "success"));
  } catch (err) {
    dispatch({ type: MEMBERS_ERROR, payload: err.message });
  }
};

// Delete member & respective bookings
export const deleteMember = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you wish to delete this member? This will also delete any bookings for them."
    )
  ) {
    try {
      setLoading();

      await axios.delete(`/api/members/${id}`);

      dispatch({ type: DELETE_MEMBER, payload: id });

      dispatch(setAlert("Member removed", "success"));

      //
    } catch (err) {
      dispatch({ type: MEMBERS_ERROR, payload: err.response.data.message });
    }
  }
};
