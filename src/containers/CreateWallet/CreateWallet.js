import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWallet } from '../../actions/walletActions';
import bip39 from 'bip39';

var ethers = require('ethers');
var provider = ethers.providers.getDefaultProvider();

class CreateWallet extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.onKeyChange = this.onKeyChange.bind(this);
    this.generateMnemonic = this.generateMnemonic.bind(this);
    this.createWallet = this.createWallet.bind(this);
  }

  createWallet(){
    var wallet = ethers.Wallet.fromMnemonic(this.state.mnemonic);
    alert(wallet.address);
  }
  onKeyChange(event){
    this.setState({privateKey: event.target.value});
  }
  generateMnemonic(){
    var mnemonic = bip39.generateMnemonic();
    alert(mnemonic);
    this.setState({mnemonic: mnemonic})
  }
  render() {
    return (
      <div className="importForm">
        <header className="formHeader">
          <h1>Welcome to Absence</h1>
          <p>Create Wallet</p>
          <p>{this.state.mnemonic}</p>
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
