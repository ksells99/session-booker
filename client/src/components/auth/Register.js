import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alertActions";
import { register } from "../../actions/authActions";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    // get copy of formdata, then set specific input with the value entered
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      // Call register function - pass in user input
      console.log(name);
      register({ name, email, password });
    }
  };

  // Redirect if authenticated (prevent access to register page if already logged in)
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <section className='container'>
        <h1 className='text-center'>
          <span className='badge badge-dark p-3 mt-4'>Sign Up</span>
        </h1>
        <p className='text-center lead mt-5'>
          <i className='fas fa-user'></i> Register for a free account
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div>
            <input
              type='text'
              className='form-control mt-3'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div>
            <input
              type='email'
              className='form-control mt-2'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div>
            <input
              type='password'
              className='form-control mt-2'
              placeholder='Password'
              name='password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div>
            <input
              type='password'
              className='form-control mt-2'
              placeholder='Confirm Password'
              name='password2'
              minLength='6'
              value={password2}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <input
            type='submit'
            className='login-btn btn btn-info mt-2'
            value='Register'
          />
        </form>
        <p className='lead mt-4 text-center'>
          Already have an account?{" "}
          <Link to='/login'>
            <strong>Sign In</strong>
          </Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  // only need to know if user is authenticated
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
