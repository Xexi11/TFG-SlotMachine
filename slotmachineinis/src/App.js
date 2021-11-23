import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import Profile from './components/pages/Profile';
import SignUp from './components/pages/SignUp';
import Games from './components/pages/Games';
import { useAuth0, User } from '@auth0/auth0-react';

import { useEffect } from "react";

import SlotMachine_Page from './components/pages/SlotMachine_Page';
import SlotMachine from './components/SlotMachine';

function App() {
  const history = useHistory();
  const {isAuthenticated} = useAuth0();

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
        {isAuthenticated ? (
          <Switch>
          <Route path='/' exact component={Home} />
        
          <Route path='/profile' component={Profile} />
          <Route path='/games' component={Games} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/slotmachine' component={SlotMachine} />
          </Switch>
        ): (
          <Route path='/' exact component={Home} />
        )}
          </Switch> 
      
      </Router>
    </>
  );
}

export default App;
