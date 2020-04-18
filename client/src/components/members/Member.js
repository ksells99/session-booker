import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMember } from "../../actions/memberActions";
import { getBookings, deleteBooking } from "../../actions/bookingActions";
import Moment from "react-moment";

const Member = ({
  member: { member, loading },
  getMember,
  match,
  booking: { bookings },
  getBookings,
  deleteBooking,
}) => {
  useEffect(() => {
    // Call getMember function, pass in member ID from URL
    getMember(match.params.id);
    getBookings();
    // eslint-disable-next-line
  }, []);

  // Filter out bookings matching the member ID
  const noOfBookings = bookings.filter(
    (booking) => booking.member._id === member._id
  );

  return loading ||
    Object.keys(member).length === 0 ||
    member.member === {} ? null : (
    <div className='container'>
      <span>
        <h1 className='text-center'>
          <span className='badge badge-dark p-3 mt-4'>
            Bookings for {member.firstName} {member.lastName}
          </span>
        </h1>
        <Link to='/members' className='btn btn-info mb-3'>
          Back
        </Link>
      </span>
      <ul className='list-group'>
        {/* For each booking, map through and display the member name and delete button */}
        {noOfBookings.map((memberBooking) => (
          <li className='list-group-item'>
            <div className='row'>
              <div className='col'>
                <span>
                  <h3>
                    <Moment format='DD/MM/YYYY'>
                      {memberBooking.session.sessionDate}
                    </Moment>
                  </h3>
                </span>
              </div>
              <div className='col-3'>
                <p className='text-center'>
                  <button
                    className='btn btn-danger mr-3'
                    onClick={(e) => deleteBooking(memberBooking._id)}
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

const mapStateToProps = (state) => ({
  member: state.member,
  auth: state.auth,
  booking: state.booking,
});

export default connect(mapStateToProps, {
  getMember,
  getBookings,
  deleteBooking,
})(Member);
