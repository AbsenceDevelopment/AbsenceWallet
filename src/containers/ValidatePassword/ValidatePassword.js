import React, { Component } from 'react';
import { connect } from 'react-redux';

import {passwordDb} from '../../localdb.js';

class ValidatePassword extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.onKeyChange = this.onKeyChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onKeyChange(event){
    this.setState({password: event.target.value});
  }
  onSubmit(){
    if (this.state.password === this.props.password) {
      var passObj = {
        "_id": "mainPass",
        "password": this.state.password
      };
      passwordDb.put(passObj);
      this.props.history.push('/createWallet');
    }
  }
  render() {
    return (
      <div className="passwordForm">
        <header className="formHeader">
          <h1>Welcome to Absence</h1>
          <p>Validate your password</p>
        </header>
        <input type="text" placeholder="Validate your Password" onChange={this.onKeyChange}/>
        <button onClick={this.onSubmit}>Create Password</button>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  password: state.password
})
export default connect(mapStateToProps)(ValidatePassword);
