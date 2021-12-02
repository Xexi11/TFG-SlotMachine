import React from 'react';
import '../../App.css';
import '../Css/Profile.css';
import { useAuth0 } from '@auth0/auth0-react';


export default function Profile() {
  const {user, isAuthenticated, isLoading} = useAuth0();
  const {name, picture, email,} = user;
  
  if (isLoading){ return <div>Loading...</div> }
  
 

  return(
    
  <div className="profile">
     <div className="profile_contanier">
      <div className="profile_contanier_imatge">
        <img src={picture} className="profile_contanier_imatge_src"/>
        </div>
        <div className="profile_contanier_name" >
          <h1>{user.name}</h1>
          <h1 className= "user_contanier_locale">{user.locale}</h1>
        </div>
      <h1 className= "user_contanier_email" >{user.email }</h1>
      <h1>Wallet: 1000 </h1>
      
      
     
     {/*  <h1>{user.name}</h1>
      <h1>{user.locale}</h1>
      <h1>{user.user_metadata.wallet}</h1>
      <h1>{user.app_metadata.wallet}</h1> */}
    </div>
  </div>
    
  );
  
}
