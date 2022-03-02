import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Css/Navbar.css';
import { useAuth0, User } from '@auth0/auth0-react';



function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { loginWithRedirect} = useAuth0();
  const {isAuthenticated} = useAuth0();
  const  {logout}  = useAuth0();
  
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
      {!isAuthenticated ? (
        <div className='navbar-container'>

          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            GEMINIS
            <img className='navbar-icon' src='/images/inisLogo.png'/>{/*  La imagen no es cuadrada */}
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/games'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Games
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/profile'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
            </li>

            <li>
              <Link
                to='/profile'
                className='nav-links-mobile'
                onClick={() => loginWithRedirect(),closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button onClick={() => loginWithRedirect()} buttonStyle='btn--outline' >SIGN UP</Button>}

         

        
        </div>
         ): 
        (<div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          GEMINIS
          <img className='navbar-icon' src='/images/inisLogo.png'/>{/*  La imagen no es cuadrada */}
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/games'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Games
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/profile'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Profile
            </Link>
          </li>

          <li>
            <Link
              to='/profile'
              className='nav-links-mobile'
              onClick={() =>
                logout({
                  returnTo: window.location.origin,
                }), closeMobileMenu} 
            >
              Sign Out
            </Link>
          </li>
        </ul>
        {button && <Button  onClick={() =>
        logout({
          returnTo: window.location.origin,
        })} buttonStyle='btn--outline'  >SIGN OUT</Button>}

      </div>

          )}
      </nav>
    </>
  );
}

export default Navbar;
