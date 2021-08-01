import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Private.css";
import Calculator from './Calculator';



const Private = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      }
      try {
        const { data } = await axios.get("/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized. Please login.");
      }
    }
    fetchPrivateData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  }

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <div id="wrapper">
        <div id="app">
          <Calculator />
          <button className="logout-button" onClick={logoutHandler}>Logout</button>
          <span>{privateData}</span>
        </div>
      </div>
    </>
  );
}



export default Private;