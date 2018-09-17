import React, { Component } from 'react';

var ethers = require('ethers');
var provider = ethers.providers.getDefaultProvider();

class Cart extends Component {
  constructor(props){
    super(props);
    this.state = {
      balance: 'Loading...',
      address: 'Loading...'
    }
  }
  componentWillMount(){
    var wallet = new ethers.Wallet(this.props.wallet.privateKey, provider);
    wallet.getBalance()
    .then((data) => {
      this.setState({
        balance: ethers.utils.formatEther(data),
        address: wallet.address
      })
    });
  }

  render() {
    return (
      <div className="passwordForm">
        <h1>{this.props.wallet.walletName ? this.props.wallet.walletName : null}</h1>
        <p>Balance {this.state.balance}</p>
        <p>Address {this.state.address}</p>
      </div>
    );
  }
}


export default Cart;
