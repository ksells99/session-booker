import {
  GET_MEMBERS,
  GET_MEMBER,
  MEMBERS_ERROR,
  ADD_MEMBER,
  EDIT_MEMBER,
  DELETE_MEMBER,
  SET_LOADING,
  CLEAR_MEMBERS,
} from "../actions/types";

const initialState = {
  members: [],
  member: {},
  current: null,
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MEMBERS:
      return {
        ...state,
        members: action.payload, // fill members state with payload data
        loading: false,
      };
    case GET_MEMBER:
      return {
        ...state,
        member: action.payload,
        loading: false,
      };
    case ADD_MEMBER:
      return {
        ...state,
        members: [action.payload, ...state.members],
      };
    case DELETE_MEMBER:
      return {
        ...state,
        members: state.members.filter(
          (member) => member._id !== action.payload
        ), // only return members not matching the deleted one
        loading: false,
      };
    case EDIT_MEMBER:
      return {
        ...state,
        members: state.members.map((member) =>
          member._id === action.payload._id ? action.payload : member
        ), // match based on id and update respective member, if not return current member
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MEMBERS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_MEMBERS:
      return {
        ...state,
        members: [],
        member: {},
        current: null,
        loading: false,
        error: {},
      };
    default:
      return state;
  }
};
