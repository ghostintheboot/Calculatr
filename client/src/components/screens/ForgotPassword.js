import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "./ForgotPassword.css";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <h1 className="forgotpassword-screen__calculator-title">CALCULATR</h1>
      <div className="forgotpassword-screen">
        <form
          onSubmit={forgotPasswordHandler}
          className="forgotpassword-screen__form"
        >
          <h3 className="forgotpassword-screen__title">Forgot Password</h3>
          {error && <span className="forgotpassword__error-message">{error}</span>}
          {success && <span className="forgotpassword__success-message">{success}</span>}
          <div className="form-group">
            <p className="forgotpassword-screen__subtext">
              Please enter the email address you registered your account with.
              We will send your reset password confirmation to this email.
            </p>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send Email!
          </button>

          <span className="forgotpassword-screen__subtext">
            <Link to="/login">Return to Login page.</Link>
          </span>

        </form>
      </div>
    </div>
  );
};



export default ForgotPassword;