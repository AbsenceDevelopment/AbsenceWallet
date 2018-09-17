import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux';

import { passwordDb } from '../../localdb.js';
import { addPassword } from '../../actions/passwordActions';

class Landing extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  componentDidMount(){
    let self = this;
    passwordDb.get('mainPass').catch(function (err) {
      if (err.name === 'not_found') {
      }
    }).then(function (doc) {
      if (doc) {
        self.props.addPassword(doc.password);
        self.props.history.push('/validatePassword');
      }
    });
  }
  removePass(){
    passwordDb.get('mainPass').then(function (doc) {
      return passwordDb.remove(doc);
    });
  }
  render() {
    return (
      <div className="importForm">
        <h1>Welcome to Absence</h1>
        <Link to="/createPassword">Create Wallet</Link>
        <Link to="/importKey">Import From Public Key</Link>
        <Link to="/importBip">Import From Mnemonic</Link>
        <button onClick={this.removePass}>Empty Password</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})
const mapDispatchToProps = dispatch => ({
 addPassword: (data) => dispatch(addPassword(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
