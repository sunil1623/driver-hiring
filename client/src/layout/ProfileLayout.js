import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function Profile({ role }) {
  const { pathname } = useLocation();

  return (
    <>
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            <li
              className={
                undefined === pathname.split('/')[2] ? 'side-nav--active' : ''
              }
            >
              <NavLink to="../profile">
                <svg>
                  <use href="../img/icons.svg#icon-settings"></use>
                </svg>
                Settings
              </NavLink>
            </li>
            <li
              className={
                'my-bookings' === pathname.split('/')[2]
                  ? 'side-nav--active'
                  : ''
              }
            >
              <NavLink to="my-bookings">
                <svg>
                  <use href="../img/icons.svg#icon-briefcase"></use>
                </svg>
                My bookings
              </NavLink>
            </li>
            <li
              className={
                'my-reviews' === pathname.split('/')[2]
                  ? 'side-nav--active'
                  : ''
              }
            >
              <NavLink to="my-reviews">
                <svg>
                  <use href="../img/icons.svg#icon-star"></use>
                </svg>
                My reviews
              </NavLink>
            </li>
            <li
              className={
                'billing' === pathname.split('/')[2] ? 'side-nav--active' : ''
              }
            >
              <NavLink to="billing">
                <svg>
                  <use href="../img/icons.svg#icon-credit-card"></use>
                </svg>
                Billing
              </NavLink>
            </li>
          </ul>
          {role?.type === 'admin' ? (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <li
                  className={
                    'drivers' === pathname.split('/')[2]
                      ? 'side-nav--active'
                      : ''
                  }
                >
                  <NavLink to="my-reviews">
                    <svg>
                      <use href="../img/icons.svg#icon-map"></use>
                    </svg>
                    Manage Drivers
                  </NavLink>
                </li>
                <li
                  className={
                    'users' === pathname.split('/')[2] ? 'side-nav--active' : ''
                  }
                >
                  <NavLink to="my-reviews">
                    <svg>
                      <use href="../img/icons.svg#icon-users"></use>
                    </svg>
                    Manage users
                  </NavLink>
                </li>
                <li
                  className={
                    'reviews' === pathname.split('/')[2]
                      ? 'side-nav--active'
                      : ''
                  }
                >
                  <NavLink to="my-reviews">
                    <svg>
                      <use href="../img/icons.svg#icon-star"></use>
                    </svg>
                    Manage reviews
                  </NavLink>
                </li>
                <li
                  className={
                    'bookings' === pathname.split('/')[2]
                      ? 'side-nav--active'
                      : ''
                  }
                >
                  <NavLink to="my-reviews">
                    <svg>
                      <use href="../img/icons.svg#icon-briefcase"></use>
                    </svg>
                    Manage bookings
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : (
            ''
          )}
        </nav>
        <Outlet />
      </div>
    </>
  );
}
