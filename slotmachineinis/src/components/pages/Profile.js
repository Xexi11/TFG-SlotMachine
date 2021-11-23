import React from 'react';
import '../../App.css';
import { useAuth0 } from '@auth0/auth0-react';


export default function Profile() {
  const {user, isAuthenticated, isLoading} = useAuth0();
  if (isLoading){ return <div>Loading...</div> }
  return(
    
  <div>
  <h1 className='profile'>{user.name}</h1>
  </div>
    
  );
  
}
