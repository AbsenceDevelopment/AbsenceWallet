import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux';

import { walletDb } from '../../localdb.js';
import { addWallet } from '../../actions/walletActions';
import { updateInitial } from '../../actions/appStateActions';
const {ipcRenderer} = window.require('electron');

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
        ipcRenderer.on('updateNotReady', function(event, text) {
          alert('You have already the latest version running!');
        });
        ipcRenderer.on('error', function(event, text) {
          alert('Oopsie');
        });
      }
    });
    // walletDb.remove({ }, { multi: true }, function (err, numRemoved) {
    //   walletDb.loadDatabase(function (err) {
    //     // done
    //   });
    // });
  }
  render() {
    return (
      <div className="flex column justifyCenter authWrapper">
        <div className="flex row landingWrap">
          <div className="flex column flex-grid-8 justifyCenter">
            <h1>Welcome to Absence</h1>
            <p>The next generation Ethereum Wallet</p>
          </div>
          <div className="flex column flex-grid-4 landingActionsWrap justifyCenter last-flex">
            <Link className="btn btnBlue" to="/createWallet">Create Wallet</Link>
            <Link className="btn btnDarkBlue" to="/importKey">Import From Public Key</Link>
            <Link className="btn btnPink" to="/importMnemonic">Import From Mnemonic</Link>
          </div>
        </div>
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
