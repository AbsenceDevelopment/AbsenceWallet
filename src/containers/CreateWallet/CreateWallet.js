import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWallet } from '../../actions/walletActions';
import bip39 from 'bip39';
import { walletDb } from '../../localdb.js';

var ethers = require('ethers');
const cryptoJSON = require('crypto-json');

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
    if (bip39.validateMnemonic(this.state.mnemonic)) {
      var wallet = ethers.Wallet.fromMnemonic(this.state.mnemonic);
      let walletData = {_id: wallet.address, privateKey: wallet.privateKey, walletName: this.state.walletName, walletMnemonic: this.state.mnemonic};
      let walletOutput = cryptoJSON.encrypt(walletData, this.props.password);
      walletDb.insert(walletOutput, function (err, newDoc) {
        self.props.addWallet(walletData);
        self.props.history.push('/main');
      });
    }
  }
  componentWillMount(){
    if (this.props.initialLogin) {
      this.props.history.push('/createPassword');
    }else{
      this.generateMnemonic();
    }
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
          <input type="text" defaultValue={this.state.mnemonic} placeholder="Type in 12 words"/>
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
