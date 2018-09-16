import React, { Component } from 'react';
import { connect } from 'react-redux';

var ethers = require('ethers');
var provider = ethers.providers.getDefaultProvider();

class MainWallet extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
    if (this.props.wallets && this.props.wallets.length !== 0) {
      const privateKeyString = this.props.wallets[0].privateKey;
      var wallet = new ethers.Wallet(privateKeyString, provider);
      wallet.getBalance()
      .then((data) => {
        this.setState({
          balance: ethers.utils.formatEther(data),
          address: wallet.address
        })
      });
    }else{
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="importForm">
        <header className="formHeader">
          <h1>hey</h1>
          <p>Address: {this.state.address}</p>
          <p>Balance: {this.state.balance}</p>
        </header>
      </div>
    );
  }
}


const mapStateToProps = state => ({
 ...state
})
export default connect(mapStateToProps)(MainWallet);
// AFEEBCFE8D8AF79D8EA3559941898495D9B77F359FF5AE10286F829550AF8316
