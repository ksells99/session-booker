import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addMember } from "../../actions/memberActions";

const AddMemberForm = ({ addMember }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <div className='container'>
      <span>
        <h1 className='text-center'>
          <span className='badge badge-dark p-3 mt-4'>Add Member</span>
        </h1>
      </span>
      <p className='text-dark'>Member details</p>
      <form
        className='form-group'
        onSubmit={(e) => {
          e.preventDefault();
          addMember({ firstName, lastName });
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
          placeholder='Forename'
        />
        <input
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className='form-control'
          name='lastName'
          placeholder='Surname'
        />
        <input
          type='submit'
          className='btn btn-success mt-4'
          value='Add Member'
        />
        <Link to='/members' className='btn btn-danger ml-3 mt-4'>
          Cancel
        </Link>
      </form>
    </div>
  );
};

AddMemberForm.propTypes = {
  addSession: PropTypes.func.isRequired,
};

export default connect(null, { addMember })(AddMemberForm);
