import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux';

import { walletDb } from '../../localdb.js';
import { addWallet } from '../../actions/walletActions';
import { updateInitial } from '../../actions/appStateActions';

class Landing extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  componentDidMount(){
    let self = this;
    walletDb.find({}, function (err, docs) {
      if (docs.length !== 0) {
        self.props.updateInitial(false);
        for (var i = 0; i < docs.length; i++) {
          self.props.addWallet(docs[i]);
        }
        self.props.history.push('/validatePassword');
      }else{
        self.props.updateInitial(true);
      }
    });
  }
  render() {
    return (
      <div className="importForm">
        <h1>Welcome to Absence</h1>
        <Link to="/createWallet">Create Wallet</Link>
        <Link to="/importKey">Import From Public Key</Link>
        <Link to="/importMnemonic">Import From Mnemonic</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})
const mapDispatchToProps = dispatch => ({
 addWallet: (data) => dispatch(addWallet(data)),
 updateInitial: (data) => dispatch(updateInitial(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
