// import React, { Fragment, useContext } from 'react'
// import PropTypes from 'prop-types'
import React from 'react';
// import { Link } from 'react-router-dom';


/*
const Navbar = () => {
  const [showWelcome, setWelcome] = useState(false);

  if (localStorage.getItem("authToken")) {
    setWelcome(true);
    
    console.log("Navbar. There's an auth token.");
  }
  return (
    <div>
      <p>halp</p>
    </div>
  )
}
*/
class Navbar extends React.Component {
    state = {
      showWelcome: false
  }

  componentDidMount() {
    if (localStorage.getItem("authToken")) {
      this.setState({ showWelcome: true });
      console.log("Navbar. There's an auth token.");
    }
  }
  render() {

    return (
      <div>
        {this.state.showWelcome && (
          <div>
            <li>Hello</li>
          </div>
        )}

        {!this.state.showWelcome && (
          <div>
            <li>NOT LOGGED IN</li>
          </div>
        )}
      </div>
    );
  }
}


export default Navbar;