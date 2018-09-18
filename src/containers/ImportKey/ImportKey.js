import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWallet } from '../../actions/walletActions';
import { walletDb } from '../../localdb.js';

const cryptoJSON = require('crypto-json')
var ethers = require('ethers');


class ImportKey extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.onKeyChange = this.onKeyChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }
  componentWillMount(){
    if (this.props.initialLogin) {
      this.props.history.push('/createPassword');
    }
  }
  importKey(event){
    let self = this;
    if (this.state.privateKey && new ethers.Wallet(this.state.privateKey)) {
      var wallet = new ethers.Wallet(this.state.privateKey);
      let walletData = {_id: wallet.address, privateKey: this.state.privateKey, walletName: this.state.walletName};
      let walletOutput = cryptoJSON.encrypt(walletData, this.props.password);
      walletDb.insert(walletOutput, function (err, newDoc) {
        if (err) {
          console.log(err);
        }else{
          self.props.addWallet(walletData);
          self.props.history.push('/main');
        }
      });
    }else{
      alert('Please provide a valid private key')
    }
  }
  onKeyChange(event){
    this.setState({privateKey: event.target.value});
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
            <h2>Import Private Key</h2>
            <p>Import a wallet from an existing private key</p>
            <form className="flex column flexAuto justifyEnd" onSubmit={this.importKey}>
              <div className="flex column inputWrap">
                <label htmlFor="walletName">Wallet Name</label>
                <input id="walletName" type="text" placeholder="Your Wallet Name" onChange={this.onNameChange}/>
              </div>
              <div className="flex column inputWrap">
                <label htmlFor="privateKey">Private Key</label>
                <input id="privateKey" type="text" placeholder="Your Private Key" onChange={this.onKeyChange}/>
              </div>
              <button className="btn btnBlue" onClick={this.importKey}>Import Wallet</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(ImportKey);
