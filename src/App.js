import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./Authentication/Auth";
import { Reset } from 'styled-reset';


import PrivateRoute from "./Authentication/PrivateRoute";

import Scan from "./Pages/User/Scan";
import Home from "./Home";
import Login from "./Authentication/Login";
import MenuUser from "./Pages/MenuUser";
import Profile from "./Pages/User/Profile";
import VideoCall from "./Pages/User/VideoCall";
import Expert from "./Pages/User/Expert";

function App() {
  return (
    <AuthProvider>
      
      <Reset />
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/scan" component={Scan} />
          <PrivateRoute exaxt path="/video" component={VideoCall} />
          <PrivateRoute exact path="/expert" component={Expert} />
          <PrivateRoute exact path="/menuuser" component={MenuUser} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
