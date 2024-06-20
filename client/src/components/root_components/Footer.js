import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img src="../img/footer-logo.png" alt="Driver Hiring logo" />
      </div>
      <ul className="footer__nav">
        <li>
          <NavLink to="/">About us</NavLink>
        </li>
        <li>
          <a href="/#">Download apps</a>
        </li>
        <li>
          <NavLink to="signup">Become a Driver</NavLink>
        </li>
        <li>
          <a href="/#">Contact</a>
        </li>
      </ul>
      <p className="footer__copyright">
        &copy; by SriKrishna Adiga. All rights reserved.
      </p>
    </div>
  );
}
