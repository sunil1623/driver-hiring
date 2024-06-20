import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header({ cookies, photo, removeCookies, role }) {
  const handleLogout = () => {
    removeCookies('jwt', { path: '/' });
  };

  return (
    <header className="header">
      <NavLink to="/">
        <img src="../img/logo.png" alt="Logo" className="logo" />
      </NavLink>
      <nav>
        {role?.type === 'user' || !cookies?.jwt ? (
          <NavLink
            to={cookies.jwt ? 'drivers' : 'login'}
            className="navlink hire-driver"
          >
            Hire Driver
          </NavLink>
        ) : (
          <NavLink
            to={cookies.jwt ? 'dashboard' : 'login'}
            className="navlink hire-driver"
          >
            Dashboard
          </NavLink>
        )}
        {!cookies.jwt ? (
          <>
            <NavLink to="login" className="navlink login">
              Login
            </NavLink>
            <NavLink to="signup" className="navlink signup">
              SignUp
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="login"
              className="navlink logout"
              onClick={handleLogout}
            >
              Logout
            </NavLink>
            <NavLink to="profile" className="navlink profile">
              <img
                src={`../img/users/${photo ? photo : 'default.jpg'}`}
                alt="user"
                className="profile-img"
              />
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
