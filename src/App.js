import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Authentication/Login";
import { AuthProvider } from "./Authentication/Auth";
import PrivateRoute from "./Authentication/PrivateRoute";
import Scan from "./Pages/User/Scan";
import MenuUser from "./Pages/MenuUser";
import { Reset } from 'styled-reset'

function App() {
  return (
    <AuthProvider>
      <Reset />
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/scan" component={Scan} />
          <PrivateRoute exact path="/menuuser" component={MenuUser} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
