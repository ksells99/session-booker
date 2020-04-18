import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    // get copy of formdata, then set specific input with the value entered
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // call login function, pass in email/pw
    login(email, password);
  };

  // Redirect if user is authenticated
  if (isAuthenticated) {
    return <Redirect to='/sessions' />;
  }

  return (
    <Fragment>
      <section className='container'>
        <h1 className='text-center'>
          <span className='badge badge-dark p-3 mt-4'>Sign In</span>
        </h1>
        <p className='text-center lead mt-5'>
          <i className='fas fa-user'></i> Sign into your Account
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div>
            <input
              type='email'
              className='form-control mt-3'
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

          <input
            type='submit'
            className='btn login-btn btn-info mt-2'
            value='Login'
          />
        </form>
        <p className='lead mt-4 text-center'>
          Don't have an account?{" "}
          <Link to='/register'>
            <strong>Sign Up</strong>
          </Link>
        </p>
      </section>
    </Fragment>
  );
};

login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  // only need to know if user is authenticated
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
