import React, { Component } from 'react';
import './SavedCalcsScreen.css';


class SavedCalcsScreen extends Component {
  render() {
    return (
      <div className="guest-card">
        <div className="card-head">
          <div>
            <button title="Edit Calc">
              <i className="fas fa-user-edit" onClick={() => console.log('edit')}></i>
            </button>
            <button onClick={() => console.log('remove')} title="Remove Calc"><i className="fas fa-trash-alt remove"></i></button>
          </div>
        </div>
        <div className="card-body">
          <h2>Hello</h2>
          <div className="contact">
            <p>World</p>
          </div>
        </div>
        <tr>
          <td>
            {this.props.obj._id}
          </td>
          <td>
            {this.props.obj.calculations}
          </td>
          <td>
            {this.props.obj.notes}
          </td>
        </tr>
      </div>
    );
  }
}



export default SavedCalcsScreen;