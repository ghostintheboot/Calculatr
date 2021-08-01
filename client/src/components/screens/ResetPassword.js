/*2️⃣2️⃣*/
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";



const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 4000);
      return setError("Passwords don't match.");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/resetpassword/${match.params.resetToken}`,
        { password },
        config
      );

      // console.log(`📁screens/RePaSc.js📁 data var: ${data}`);
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <h1 className="resetpassword-screen__calculator-title">CALCULATR</h1>
      <div className="resetpassword-screen">
        <form
          onSubmit={resetPasswordHandler}
          className="resetpassword-screen__form"
        >
          <h3 className="resetpassword-screen__title">Forgot Password</h3>
          {error && <span className="resetpassword__error-message">{error} </span>}
          {success && (
            <span className="resetpassword__success-message">
              {success} <Link to="/login">Login</Link>
            </span>
          )}
          <div className="form-group">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              required
              id="password"
              placeholder="Enter new password"
              autoComplete="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmpassword">Confirm New Password:</label>
            <input
              type="password"
              required
              id="confirmpassword"
              placeholder="Confirm new password"
              autoComplete="true"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};



export default ResetPassword;