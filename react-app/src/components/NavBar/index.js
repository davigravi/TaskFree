
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

//font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const NavBar = () => {




  return (
    <nav className='nav-bar'>
          <NavLink to='/' exact={true} activeClassName='active'>
            {/* <FontAwesomeIcon icon="fa-solid fa-house" id='home-icon'/> */}
            <FontAwesomeIcon icon="fa-solid fa-mug-saucer" id='home-icon'/>
          </NavLink>
          <LogoutButton/>
          {/* <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink> */}
    </nav>
  );
}

export default NavBar;
