import "./Private.css";
import Calculator from './Calculator';



const Dev = () => {
  return (
    <>
      <div id="wrapper">
        <div id="app">
          <Calculator />
          <button className="logout-button">Logout</button>
        </div>
      </div>
    </>
  );
}



export default Dev;