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
  simpleAction = (event) => {
    let self = this;
    if (this.state.privateKey && new ethers.Wallet(this.state.privateKey)) {
      var wallet = new ethers.Wallet(this.state.privateKey);
      let walletData = {_id: wallet.address, privateKey: this.state.privateKey, walletName: this.state.walletName};
      let walletOutput = cryptoJSON.encrypt(walletData, this.props.password);
      walletDb.insert(walletOutput, function (err, newDoc) {
        self.props.addWallet(walletData);
        self.props.history.push('/main');
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
      <div className="importForm">
        <header className="formHeader">
          <h1>Welcome to Absence</h1>
          <p>Provide your private key and give your wallet a name to start with</p>
        </header>
        <input type="text" placeholder="Your Private Key" onChange={this.onKeyChange}/>
        <input type="text" placeholder="Your Wallet Name" onChange={this.onNameChange}/>
        <button onClick={this.simpleAction}>Submit</button>
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
