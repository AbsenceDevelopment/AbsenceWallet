import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectWallet } from '../../actions/walletActions';

import WalletSelector from '../../components/WalletSelector/WalletSelector';

import './donate.scss';

const ethers = require('ethers');

class Donate extends Component {
  constructor(props){
    super(props);

    let selectedWallet = this.props.wallets.filter(obj => {
      return obj.id === this.props.selectedWallet
    });

    this.state = {
      selectedWallet: selectedWallet[0]['privateKey'],
      balance: 'Loading...',
      amount: ''
    }

    this.wallet = new ethers.Wallet(this.state.selectedWallet);
    this.wallet.provider = ethers.providers.getDefaultProvider();
    this.onKeyChange = this.onKeyChange.bind(this);
    this.donate = this.donate.bind(this);
    this.onDonateAll = this.onDonateAll.bind(this);
    this.selectWallet = this.selectWallet.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.calculateGas = this.calculateGas.bind(this);
  }
  donate(){
    let self = this;

    if (this.state.amount.length > 0 && !this.state.errorInput) {
      let amount = ethers.utils.parseEther(this.state.amount);
      let address = '0xDBb97F262Bc1068beF47138e7E95579Ae7dF7280';
      let sendPromise = this.wallet.send(address, amount);
      sendPromise.then(function(transactionHash) {
        self.props.history.push('/main/wallets')
      });
    }
  }
  calculateGas(amount){
    let self = this;
    if (amount) {
      this.wallet.estimateGas(ethers.utils.parseEther(amount)).then(function(gasEstimate){
        if (amount + parseInt(ethers.utils.formatEther(gasEstimate)) > self.state.balance) {
          self.setState({errorInput: true});
        }else{
          self.setState({errorInput: false});
        }
      });
    }else{
      self.setState({errorInput: false});
    }
  }
  onKeyChange(event){
    this.setState({amount: event.target.value});
    this.calculateGas(event.target.value);
  }
  selectWallet(wallet){
    this.setState({selectedWallet: wallet, selectorOn: false});
    this.wallet = new ethers.Wallet(wallet);
    this.wallet.provider = ethers.providers.getDefaultProvider();
    this.getBalance();
  }
  getBalance(){
    let self = this;
    let walletBalance = "";
    this.wallet.getBalance()
    .then((data) => {
      if (ethers.utils.formatEther(data) !== "0.0") {
        this.wallet.estimateGas(data).then(function(gasEstimate){
          walletBalance = data;
          self.setState({
            balance: ethers.utils.formatEther(walletBalance) - ethers.utils.formatEther(gasEstimate),
          })
        })
      }else{
        self.setState({
          balance: ethers.utils.formatEther(data),
        })
      }
    });
  }
  componentDidMount(){
    this.getBalance();
  }
  onDonateAll(){
    this.setState({amount: this.state.balance});
  }
  render() {
    let balance = this.state.balance;
    return (
      <div className="flex column flexAuto mainContent justifyCenter">
        <div className="flex column justifyCenter flex-grid-6 donateFormWrapper whiteBox">
          <h1>Would you consider Donating?</h1>
          <WalletSelector selectedWallet={this.state.selectedWallet} onClick={this.selectWallet} wallets={this.props.wallets} label="Donate From"/>
          <div className="inputWrap flex column availableBalanceWrap">
            <label>Amount available</label>
            <div className="row flex flexAuto">
              <div className="flex column flexAuto">
                <p>{balance}</p>
              </div>
              <div className="flex column useAllBalanceTag">
                <p onClick={this.onDonateAll}>Donate All</p>
              </div>
            </div>
          </div>
          <div className={this.state.errorInput ? "flex column inputWrap error" : "flex column inputWrap"}>
            <label>Amount to donate</label>
            <input type="number" value={this.state.amount} onChange={this.onKeyChange} placeholder={this.state.errorInput ? "Insufficient Balance" : "How much would you donate"}/>
          </div>
          <button className="btn btnBlue" onClick={this.donate}>Donate</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})
const mapDispatchToProps = dispatch => ({
 selectWallet: (data) => dispatch(selectWallet(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Donate);
