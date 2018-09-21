import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWallet } from '../../actions/walletActions';
import { walletDb } from '../../localdb.js';
import bip39 from 'bip39';
import cryptoJSON from '../../lib/crypto-json';

var ethers = require('ethers');

class ImportMnemonic extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.onMnemonicChange = this.onMnemonicChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.createWallet = this.createWallet.bind(this);
  }

  createWallet(e){
    let self = this;
    e.preventDefault();
    if (bip39.validateMnemonic(this.state.mnemonic)) {
      var wallet = ethers.Wallet.fromMnemonic(this.state.mnemonic);
      let walletData = {_id: wallet.address, privateKey: wallet.privateKey, walletName: this.state.walletName, walletMnemonic: this.state.mnemonic};
      let walletOutput = cryptoJSON.encrypt(walletData, this.props.password);
      walletDb.insert(walletOutput, function (err, newDoc) {
        if (err) {
        }else{
          self.props.addWallet(walletData);
          self.props.history.push('/main/wallets');
        }
      });
    }
  }
  componentWillMount(){
    if (this.props.initialLogin) {
      this.props.history.push('/createPassword');
    }
  }
  onMnemonicChange(event){
    this.setState({mnemonic: event.target.value});
  }
  onNameChange(event){
    this.setState({walletName: event.target.value});
  }
  render() {
    return (
      <div className="flex column justifyCenter authWrapper">
        <div className="flex row authBox">
          <div className="flex column flex-grid-8">
            <h1>Welcome to Absence</h1>
            <p>The next generation Ethereum Wallet</p>
          </div>
          <div className="flex column flex-grid-4 formWrap">
            <h2>Import Mnemonic</h2>
            <p>Import an existing wallet from a mnemonic</p>
            <form className="flex column flexAuto justifyEnd" onSubmit={this.createWallet}>
              <div className="flex column inputWrap">
                <label htmlFor="walletName">Wallet Name</label>
                <input id="walletName" type="text" defaultValue={this.state.walletName} onChange={this.onNameChange} placeholder="Wallet Name"/>
              </div>
              <div className="flex column inputWrap">
                <label htmlFor="walletMnemonic">Wallet Mnemonic</label>
                <input id="walletMnemonic" type="text" defaultValue={this.state.mnemonic} onChange={this.onMnemonicChange} placeholder="Type in 12 words"/>
              </div>
              <button className="btn btnBlue" onClick={this.createWallet}>Import Wallet</button>
            </form>
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
 addWallet: (data) => dispatch(addWallet(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(ImportMnemonic);
