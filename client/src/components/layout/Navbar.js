import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div className='nav'>
      <Link to='/sessions' className='nav-link text-light'>
        <i className='fas fa-calendar-alt'></i>
        Sessions
      </Link>

      <Link to='/members' className='nav-link text-light'>
        <i className='fas fa-user'></i>
        Members
      </Link>
      <a onClick={logout} className='nav-link text-light' href='#!'>
        <i className='fas fa-sign-out-alt'></i>
        Logout
      </a>
    </div>
  );

  const guestLinks = (
    <div className='nav'>
      <Link to='/register' className='nav-link text-light'>
        Register
      </Link>

      <Link to='/login' className='nav-link text-light'>
        Login
      </Link>
    </div>
  );
  return (
    <nav className='navbar navbar-light bg-dark'>
      <Link to='/' className='navbar-brand text-light text-header'>
        <h2>
          <i className='fas fa-users mr-4'></i>
          Session Booker
        </h2>
      </Link>

      <nav className='nav'>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
