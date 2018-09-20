import React, { Component } from 'react';

const ethers = require('ethers');

class SendTokens extends Component {
  constructor(props){
    super(props);


    this.wallet = new ethers.Wallet(this.props.wallet);
    this.wallet.provider = ethers.providers.getDefaultProvider({ name: 'ropsten', chainId: 3 });
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onSendTokens = this.onSendTokens.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.onSendAll = this.onSendAll.bind(this);
    this.state = {
      amount: '',
      address: ''
    }
  }

  onSendTokens(){
    let self = this;
    if (this.state.amount.length > 0 && this.state.address.length > 0) {
      let amount = ethers.utils.parseEther(this.state.amount);
      let address = this.state.address;

      let sendPromise = this.wallet.send(address, amount);
      sendPromise.then(function(transactionHash) {
        self.props.history.push('/main/wallets')
      });
    }
  }
  onAmountChange(event){
    this.setState({amount: event.target.value});
  }
  onAddressChange(event){
    this.setState({address: event.target.value});
  }
  onSendAll(){
    this.setState({amount: this.state.balance});
  }
  getBalance(){
    let self = this;
    this.wallet.getBalance()
    .then((data) => {
      this.setState({
        balance: ethers.utils.formatEther(data),
      })
    });
  }
  componentDidMount(){
    this.getBalance();
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.wallet.length > 0) {
      this.wallet = new ethers.Wallet(nextProps.wallet);
      this.wallet.provider = ethers.providers.getDefaultProvider({ name: 'ropsten', chainId: 3 });
      this.getBalance();
      this.setState({amount: '', address: ''})
    }
  }
  render() {
    let balance = this.state.balance;
    return (
      <div className="flex column flex-grid-6 sendTokens last-flex">
        <h1>Send Ethereum</h1>
        <div className="flex flexAuto column whiteBox">
          <div className="flex column inputWrap">
            <label htmlFor="amountInput">Receiver Address</label>
            <input id="amountInput" type="text" value={this.state.address} onChange={this.onAddressChange} placeholder="0x..."/>
          </div>
          <div className="flex column inputWrap">
            <label htmlFor="amountInput">Amount to Transfer</label>
            <input id="amountInput" type="number" value={this.state.amount} onChange={this.onAmountChange} placeholder="How much would you like to send"/>
          </div>
          <div className="inputWrap flex column availableBalanceWrap">
            <label>Amount available</label>
            <div className="row flex flexAuto">
              <div className="flex column flexAuto">
                <p>{balance}</p>
              </div>
              <div className="flex column useAllBalanceTag">
                <p onClick={this.onSendAll}>Send All</p>
              </div>
            </div>
          </div>
          <button className="btn btnBlue" onClick={this.onSendTokens}>Confirm Transaction</button>
        </div>
      </div>
    );
  }
}


export default SendTokens;
