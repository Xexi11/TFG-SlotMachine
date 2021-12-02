import React from 'react';
import './Css/Button.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--small','btn--medium', 'btn--large'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return <button 
  className={`btn ${checkButtonStyle} ${checkButtonSize}`}
  onClick={onClick
  }type={type}
  >{children}
  </button>  
};
