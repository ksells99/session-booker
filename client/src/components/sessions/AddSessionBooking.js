import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBooking } from "../../actions/bookingActions";
import { getSession } from "../../actions/sessionActions";
import { Link } from "react-router-dom";
import Select from "react-select";
import Moment from "react-moment";
import moment from "moment";
import { getMembers } from "../../actions/memberActions";

const AddSessionBooking = ({
  getSession,
  getMembers,
  session: { session, loading },
  members,
  match,
  addBooking,
}) => {
  useEffect(() => {
    getSession(match.params.id);
    getMembers();
    // eslint-disable-next-line
  }, []);

  const [memberID, setMemberID] = useState();

  // Create options array based on members array from state - sort alphabetically by surname, then map through and create an option for each
  const options = members
    .sort((a, b) =>
      a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1
    )
    .map((member) => ({
      label: `${member.firstName} ${member.lastName}`,
      value: member._id,
    }));

  return loading ||
    Object.keys(session).length === 0 ||
    members.length === 0 ? null : (
    <div className='container'>
      <span>
        <h1 className='text-center'>
          <span className='badge badge-dark p-3 mt-4'>
            Add Booking for{" "}
            <Moment format='DD/MM/YYYY'>{session.sessionDate}</Moment>{" "}
          </span>
        </h1>
      </span>
      <p className='text-dark'>Session date</p>
      <form
        className='form-group'
        onSubmit={(e) => {
          e.preventDefault();
          const sessionID = session._id;
          addBooking({ memberID, sessionID });
        }}
      >
        <input
          type='text'
          value={moment(session.sessionDate).format("DD/MM/YYYY")}
          disabled
          required
          className='form-control mb-4'
          name='sessionDate'
        />

        <p className='text-dark'>Member</p>

        <Select
          name='memberID'
          options={options}
          onChange={(option) => setMemberID(option.value)}
          placeholder='Select member'
        />

        <input
          type='submit'
          className='btn btn-success mt-4'
          value='Add Booking'
        />

        <Link to='/sessions' className='btn btn-danger ml-3 mt-4'>
          Cancel
        </Link>
      </form>
    </div>
  );
};

AddSessionBooking.propTypes = {
  addSession: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
  auth: state.auth,
  booking: state.booking,
  members: state.member.members,
});

export default connect(mapStateToProps, { getSession, getMembers, addBooking })(
  AddSessionBooking
);
