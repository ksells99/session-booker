import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSession } from "../../actions/sessionActions";

const SessionItem = ({ session, booking: { bookings }, deleteSession }) => {
  // Filter out bookings matching the session ID and get the number of them
  const noOfBookings = bookings.filter(
    (booking) => booking.session._id === session._id
  ).length;

  return (
    <div>
      <div className='row'>
        <div className='col'>
          <span>
            <h2>
              <Moment format='DD/MM/YYYY'>{session.sessionDate}</Moment>
            </h2>
            <p>{noOfBookings} bookings</p>
          </span>
        </div>
        <div className='col-3'>
          <p className='text-center'>
            <Link
              to={`/sessions/${session._id}`}
              className='btn btn-success mr-3 mt-1'
            >
              <i className='fas fa-eye'></i>
            </Link>

            <Link
              to={`/sessions/addbooking/${session._id}`}
              className='btn btn-secondary mr-3 mt-1'
            >
              <i className='fas fa-plus'></i>
            </Link>

            <button
              className='btn btn-danger mr-3 mt-1'
              onClick={(e) => deleteSession(session._id)}
            >
              <i className='fas fa-times'></i>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  booking: state.booking,
});

export default connect(mapStateToProps, { deleteSession })(SessionItem);
