import React, { Component } from 'react';
import { connect } from 'react-redux';

import {walletsDb} from '../../localdb.js';

import { addWallet } from '../../actions/walletActions';

class AuthPassword extends Component {
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
    let self = this;
    if (this.state.password === this.props.password) {
      self.props.history.push('/main');
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
const mapDispatchToProps = dispatch => ({
 addWallet: (data) => dispatch(addWallet(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(AuthPassword);
