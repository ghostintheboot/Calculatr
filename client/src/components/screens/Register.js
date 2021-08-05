import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css';



const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history])

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: { "Content-Type": "application/json" }
    }

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 4000);
      return setError("Passwords do not match.");
    }

    try {
      // Destructure data from axios request.
      const { data } = await axios.post(
        "/api/auth/register",
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
    <div style={{
      background: 'linear-gradient(rgba(208, 36, 255, 0.48), rgba(145, 0, 110, 0.44))',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      height: '100vh'
    }}>
      <h1 className="register-screen__calculator-title">CALCULATR</h1>
      <div className="register-screen">
        <form onSubmit={registerHandler} className="register-screen__form">
          <h3 className="register-screen__title">Register</h3>
          {error && <span className="error-message">{error}</span>}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              tabIndex={1}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              required
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              tabIndex={3}
            />
          </div>

          <button type="submit" className="btn btn-primary" tabIndex={4}>
            Register
          </button>

          <span className="register-screen__subtext">
            Already have an account? <Link to="/login" tabIndex={5}>Login here.</Link>
          </span>

        </form>
      </div>
    </div>
  );
}



export default Register;