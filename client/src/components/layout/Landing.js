import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  // If user is logged in, don't show landing page - redirect to sessions page instead
  if (isAuthenticated) {
    return <Redirect to='/sessions' />;
  }

  return (
    <section className='landing text-center'>
      <h1 className='text-center'>
        <span className='badge badge-dark pt-3 pb-3 pl-5 pr-5 mt-4'>
          Session Booker
        </span>
      </h1>
      <p className='lead mt-5'>
        Create sessions, add members and manage their bookings.
      </p>
      <p className='lead mt-2'>
        Login to your existing account, or register for a free account, via the
        buttons below.
      </p>
      <div className='buttons mt-5'>
        <Link to='/register' className='btn btn-dark mr-5'>
          Sign Up
        </Link>
        <Link to='/login' className='btn btn-info'>
          Login
        </Link>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
