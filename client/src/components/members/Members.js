import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getMembers } from "../../actions/memberActions";

import MemberItem from "./MemberItem";
import { getBookings } from "../../actions/bookingActions";

const Members = ({ member: { members }, getMembers, getBookings }) => {
  useEffect(() => {
    getMembers();
    getBookings();
    // eslint-disable-next-line
  }, []);
  return (
    <div className='container'>
      <span>
        <h1 className='text-center'>
          <span className='badge badge-dark p-3 mt-4'>Members</span>
        </h1>

        <Link to='/members/addmember' className='btn btn-info mb-3'>
          Add member
        </Link>
      </span>

      <ul className='list-group mb-4'>
        {members
          .sort((a, b) =>
            a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1
          )
          .map((member) => (
            <li className='list-group-item'>
              <MemberItem member={member} key={member._id} />
            </li>
          ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  member: state.member,
});

export default connect(mapStateToProps, { getMembers, getBookings })(Members);
