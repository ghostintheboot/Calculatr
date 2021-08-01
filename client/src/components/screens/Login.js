import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import LoginImg from './../../images/login-bg.jpg';



const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history])

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: { "Content-Type": "application/json" }
    }

    try {
      // Destructure data from axios request.
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      // Receieve token after axios request.
      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      // Axios gives an error, then a response, then data, then the error we created here.
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  }

  return (
    // Ghetto code once again.
    <div style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${LoginImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      height: '100vh'
    }}>
      <h1 className="login-screen__calculator-title">CALCULATR</h1>
      <div className="login-screen">
        <form onSubmit={loginHandler} className="login-screen__form">
          <h3 className="login-screen__title">Login</h3>
          {error && <span className="error-message">{error}</span>}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              tabIndex={1}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password: {""}
              <Link
                to="/forgotpassword"
                className="login-screen__forgotpassword"
                tabIndex={5}
              >Forgot Your Password?</Link>
            </label>
            <input
              type="password"
              required
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              tabIndex={2}
            />
          </div>

          <button type="submit" className="btn btn-primary" tabIndex={3}>
            Login To Calculatr
          </button>

          <span className="login-screen__subtext">
            Need an account? <Link to="/register" tabIndex={4}>Register here.</Link>
          </span>

        </form>
      </div>
    </div>
  );
}



export default Login;