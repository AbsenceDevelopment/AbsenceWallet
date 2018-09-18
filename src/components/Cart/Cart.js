import React, { Component } from 'react';
import './cart.scss';

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
    let cardClasses = this.props.selectedWallet ? "flex column cardWrapper active" : "flex column cardWrapper";
    return (
      <div className={cardClasses} onClick={() => this.props.onClick(this.props.wallet.id)}>
        <h1>{this.props.wallet.walletName ? this.props.wallet.walletName : "A Wallet"}</h1>
        <p><small>{this.state.address}</small></p>
        <div className="flex row cardBalanceWrapper">
          <div className="flex flex-grid-6">
            <p>Ethereum</p>
          </div>
          <div className="flex flex-grid-6 last-flex">
            <h2>{Number(this.state.balance).toFixed(7)}</h2>
          </div>
        </div>
      </div>
    );
  }
}


export default Cart;
