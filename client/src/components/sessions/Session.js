import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSession, deleteSession } from "../../actions/sessionActions";
import { getBookings, deleteBooking } from "../../actions/bookingActions";
import Moment from "react-moment";

const Session = ({
  session: { session, loading },
  getSession,
  match,
  booking: { bookings },
  getBookings,
  deleteBooking,
}) => {
  useEffect(() => {
    // Call getSession function, pass in session ID from URL
    getSession(match.params.id);
    getBookings();
    // eslint-disable-next-line
  }, []);

  // Filter out bookings matching the session ID
  const noOfBookings = bookings.filter(
    (booking) => booking.session._id === session._id
  );

  return loading ||
    Object.keys(session).length === 0 ||
    bookings === {} ? null : (
    <div className='container'>
      <span>
        <h1 className='text-center'>
          <span className='badge badge-dark p-3 mt-4'>
            Bookings for{" "}
            <Moment format='DD/MM/YYYY'>{session.sessionDate}</Moment>
          </span>
        </h1>
        <Link to='/sessions' className='btn btn-info mb-3'>
          Back
        </Link>
      </span>
      <ul className='list-group'>
        {/* For each booking, map through and display the member name and delete button */}
        {noOfBookings
          .sort((a, b) =>
            a.member.lastName.toLowerCase() > b.member.lastName.toLowerCase()
              ? 1
              : -1
          )
          .map((sessionBooking) => (
            <li className='list-group-item'>
              <div className='row'>
                <div className='col'>
                  <span>
                    <h3>
                      {sessionBooking.member.firstName}{" "}
                      {sessionBooking.member.lastName}
                    </h3>
                  </span>
                </div>
                <div className='col-3'>
                  <p className='text-center'>
                    <button
                      className='btn btn-danger mr-3'
                      onClick={(e) => deleteBooking(sessionBooking._id)}
                    >
                      <i className='fas fa-times'></i>
                    </button>
                  </p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

Session.propTypes = {};

const mapStateToProps = (state) => ({
  session: state.session,
  auth: state.auth,
  booking: state.booking,
});

export default connect(mapStateToProps, {
  getSession,
  getBookings,
  deleteBooking,
  deleteSession,
})(Session);
