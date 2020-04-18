import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMember } from "../../actions/memberActions";

const MemberItem = ({ member, booking: { bookings }, deleteMember }) => {
  // Filter out bookings matching the member ID and get the number of them
  const noOfBookings = bookings.filter(
    (booking) => booking.member._id === member._id
  ).length;

  return (
    <div>
      <div className='row'>
        <div className='col'>
          <span>
            <h2>
              {member.firstName} {member.lastName}
            </h2>
            <p>{noOfBookings} bookings</p>
          </span>
        </div>
        <div className='col-3'>
          <p className='text-center'>
            <Link
              to={`/members/${member._id}`}
              className='btn btn-success mr-3 mt-1'
            >
              <i className='fas fa-eye'></i>
            </Link>
            <Link
              to={`/members/edit/${member._id}`}
              className='btn btn-info mr-3 mt-1'
            >
              <i className='fas fa-edit'></i>
            </Link>

            <button
              className='btn btn-danger mr-3 mt-1'
              onClick={(e) => deleteMember(member._id)}
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

export default connect(mapStateToProps, { deleteMember })(MemberItem);
