import { combineReducers } from "redux";
import sessionReducer from "./sessionReducer";
import memberReducer from "./memberReducer";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import bookingReducer from "./bookingReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  session: sessionReducer,
  member: memberReducer,
  booking: bookingReducer,
});
