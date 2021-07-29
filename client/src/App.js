import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Routing.
import PrivateRoute from './components/routing/PrivateRoute';

// Screens.
import Private from './components/screens/Private';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import ForgotPassword from './components/screens/ForgotPassword';
import ResetPassword from './components/screens/ResetPassword';
import Dev from './components/screens/Dev';

// Auth Token.
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Private} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/passwordreset/:resetToken" component={ResetPassword} />
          <Route exact path="/dev" component={Dev} />
        </Switch>
      </div>
    </Router>
  );
}



export default App;