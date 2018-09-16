import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWallet } from '../../actions/walletActions';
import bip39 from 'bip39';

import {walletsDb} from '../../localdb.js';

var ethers = require('ethers');

class CreateWallet extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.onMenmonicChange = this.onMenmonicChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.generateMnemonic = this.generateMnemonic.bind(this);
    this.createWallet = this.createWallet.bind(this);
  }

  createWallet(){
    let self = this;
    var wallet = ethers.Wallet.fromMnemonic(this.state.mnemonic);
    let walletData = {_id: wallet.address, privateKey: wallet.privateKey, walletName: this.state.walletName};
    this.props.addWallet(walletData);
    walletsDb.put(walletData).then(function(){
      self.props.history.push('/main');
    });
  }
  onMenmonicChange(event){
    this.setState({mnemonic: event.target.value});
  }
  onNameChange(event){
    this.setState({walletName: event.target.value});
  }
  generateMnemonic(){
    var mnemonic = bip39.generateMnemonic();
    this.setState({mnemonic: mnemonic})
  }
  render() {
    return (
      <div className="importForm">
        <header className="formHeader">
          <h1>Welcome to Absence</h1>
          <p>Create Wallet</p>
          <input type="text" value={this.state.mnemonic} placeholder="Type in 12 words"/>
          <input type="text" value={this.state.walletName} placeholder="Wallet Name"/>
          <button onClick={this.generateMnemonic}>Generate Mnemonic</button>
          <button onClick={this.createWallet}>Create Wallet</button>
        </header>
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateWallet);
