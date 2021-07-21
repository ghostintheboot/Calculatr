import React, { Component } from 'react';
import axios from 'axios';
// import SavedCalcsScreen from './SavedCalcsScreen';



export default class CalcsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calcCollection: [],
      calcItem: {}
    }
  }

  componentDidMount() {
    this.getCalcs();
  }
  
  getCalcs = () => {
    axios.get('/api/calc')
      .then(response => {
        const data = response.data;
        this.setState({ calcCollection: data });
        console.log('Data received.');
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <ul>
        {this.state.calcCollection.map( item => {
          const {id} = item
            return (
              <li key={id}>
                wut
              </li>
            )
        })}
      </ul>
    );
  }
}