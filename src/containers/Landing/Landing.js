import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link
} from 'react-router-dom'

import {passwordDb, walletsDb} from '../../localdb.js';
import { addWallet } from '../../actions/walletActions';

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
        walletsDb.allDocs().then(function(res){
          if (res.total_rows !== 0) {
            for (var i = 0; i < res.rows.length; i++) {
              walletsDb.get(res.rows[i].id).then(function(res){
                self.props.addWallet(res);
                self.props.history.push('/main');
              })
            }
          }
        });
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
 addWallet: (data) => dispatch(addWallet(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
