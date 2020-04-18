import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addSession } from "../../actions/sessionActions";

const AddSessionForm = ({ addSession }) => {
  const [sessionDate, setDate] = useState("");
  return (
    <div className='container'>
      <span>
        <h1 className='text-center'>
          <span className='badge badge-dark p-3 mt-4'>Add Session</span>
        </h1>
      </span>
      <p className='text-dark'>Session date</p>
      <form
        className='form-group'
        onSubmit={(e) => {
          e.preventDefault();
          addSession({ sessionDate });
          setDate("");
        }}
      >
        <input
          type='date'
          value={sessionDate}
          onChange={(e) => setDate(e.target.value)}
          required
          className='form-control'
          name='sessionDate'
        />
        <input
          type='submit'
          className='btn btn-success mt-4'
          value='Add Session'
        />

        <Link to='/sessions' className='btn btn-danger ml-3 mt-4'>
          Cancel
        </Link>
      </form>
    </div>
  );
};

AddSessionForm.propTypes = {
  addSession: PropTypes.func.isRequired,
};

export default connect(null, { addSession })(AddSessionForm);
