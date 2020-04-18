import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMember, editMember } from "../../actions/memberActions";

const EditMemberForm = ({
  getMember,
  editMember,
  member: { member, loading },
  match,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    // Call getMember function, pass in member ID from URL

    getMember(match.params.id);
    // eslint-disable-next-line
  }, []);

  return loading ||
    Object.keys(member).length === 0 ||
    member.member === {} ? null : (
    <div className='container'>
      <span>
        <h1 className='text-center'>
          <span className='badge badge-dark p-3 mt-4'>
            Edit Member {"("}
            {member.firstName} {member.lastName}
            {")"}
          </span>
        </h1>
      </span>
      <p className='text-dark'>Member details</p>
      <form
        className='form-group'
        onSubmit={(e) => {
          e.preventDefault();
          const updMember = {
            firstName: firstName,
            lastName: lastName,
            id: member._id,
          };
          editMember(updMember);
          setFirstName("");
          setLastName("");
        }}
      >
        <input
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className='form-control mb-3'
          name='firstName'
          placeholder={`${member.firstName}`}
        />
        <input
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className='form-control'
          name='lastName'
          placeholder={`${member.lastName}`}
        />
        <input
          type='submit'
          className='btn btn-success mt-4'
          value='Save Changes'
        />
        <Link to='/members' className='btn btn-danger ml-3 mt-4'>
          Cancel
        </Link>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  member: state.member,
});

export default connect(mapStateToProps, { editMember, getMember })(
  EditMemberForm
);
