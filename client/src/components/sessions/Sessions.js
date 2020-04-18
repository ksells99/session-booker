import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSessions } from "../../actions/sessionActions";

import SessionItem from "./SessionItem";
import { getBookings } from "../../actions/bookingActions";
import { getMembers } from "../../actions/memberActions";

const Sessions = ({
  session: { sessions },
  getSessions,
  getBookings,
  getMembers,
}) => {
  useEffect(() => {
    getSessions();
    getBookings();
    getMembers();
    // eslint-disable-next-line
  }, []);
  return (
    <div className='container mb-4'>
      <span>
        <h1 className='text-center'>
          <span className='badge badge-dark p-3 mt-4'>Sessions</span>
        </h1>

        <Link to='/sessions/addsession' className='btn btn-info mb-3'>
          Add session
        </Link>
      </span>

      <ul className='list-group'>
        {sessions
          .sort((a, b) => (a.sessionDate > b.sessionDate ? 1 : -1))
          .map((session) => (
            <li className='list-group-item'>
              <SessionItem
                session={session}
                session_id={session._id}
                sessionDate={session.sessionDate}
                key={session._id}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  session: state.session,
});

export default connect(mapStateToProps, {
  getSessions,
  getBookings,
  getMembers,
})(Sessions);
