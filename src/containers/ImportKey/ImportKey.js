import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWallet } from '../../actions/walletActions';
import {walletsDb} from '../../localdb.js';


var ethers = require('ethers');
var provider = ethers.providers.getDefaultProvider();

class ImportKey extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.onKeyChange = this.onKeyChange.bind(this);
  }

  simpleAction = (event) => {
    if (this.state.privateKey) {
      let walletData = {privateKey: this.state.privateKey, walletName: this.state.walletName};
      this.props.addWallet(walletData);
      this.props.history.push('/main');
    }else{
      alert('Please provide a private key')
    }
  }
  onKeyChange(event){
    this.setState({privateKey: event.target.value});
  }
  render() {
    return (
      <div className="importForm">
        <header className="formHeader">
          <h1>Welcome to Absence</h1>
          <p>Provide your private key and give your wallet a name to start with</p>
        </header>
        <input type="text" placeholder="Your Private Key" onChange={this.onKeyChange}/>
        <input type="text" placeholder="Your Wallet Name"/>
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
