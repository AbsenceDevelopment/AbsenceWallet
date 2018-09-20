import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectWallet } from '../../actions/walletActions';
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
      selectorOn: false,
      balance: 'Loading...',
      amount: ''
    }

    this.wallet = new ethers.Wallet(this.state.selectedWallet);
    this.wallet.provider = ethers.providers.getDefaultProvider({ name: 'ropsten', chainId: 3 });
    this.onKeyChange = this.onKeyChange.bind(this);
    this.donate = this.donate.bind(this);
    this.toggleSelector = this.toggleSelector.bind(this);
    this.onDonateAll = this.onDonateAll.bind(this);
    this.selectWallet = this.selectWallet.bind(this);
    this.getBalance = this.getBalance.bind(this);
  }
  donate(){
    let self = this;

    if (this.state.amount.length > 0) {
      let amount = ethers.utils.parseEther(this.state.amount);
      let address = '0xFFd7Ae7D3835E783ff745E18beD41C343BfB3Be2';
      let sendPromise = this.wallet.send(address, amount);
      sendPromise.then(function(transactionHash) {
        self.props.history.push('/main/wallets')
      });
    }
  }
  onKeyChange(event){
    this.setState({amount: event.target.value});
  }
  toggleSelector(){
    this.setState({selectorOn: !this.state.selectorOn});
  }
  selectWallet(wallet){
    let self = this;
    this.setState({selectedWallet: wallet, selectorOn: false});
    this.wallet = new ethers.Wallet(wallet);
    this.wallet.provider = ethers.providers.getDefaultProvider({ name: 'ropsten', chainId: 3 });
    this.getBalance();
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
  onDonateAll(){
    this.setState({amount: this.state.balance});
  }
  render() {
    let balance = this.state.balance;
    let selectedWallet = this.props.wallets.map(wallet =>
      wallet.privateKey === this.state.selectedWallet ?
      (<div className="selectedWallet flex column flex-frid-12" key={wallet.id} onClick={this.toggleSelector}>
        <p>{wallet.walletName ? wallet.walletName : "A Wallet" }</p>
        <p><small>{wallet.id}</small></p>
      </div>) : null);
    let walletsList = this.props.wallets.map(wallet =>
      wallet.privateKey !== this.state.selectedWallet ?
      (<li className="walletListItem" key={wallet.id} onClick={(e) => this.selectWallet(wallet.privateKey)}>
        <p>{wallet.walletName ? wallet.walletName : "A Wallet" }</p>
        <p><small>{wallet.id}</small></p>
      </li>) : null);
    return (
      <div className="flex column flexAuto mainContent justifyCenter">
        <div className="flex column justifyCenter flex-grid-6 donateFormWrapper whiteBox">
          <h1>Would you consider Donating?</h1>
          <div className="flex column inputWrap">
            <label>Donate From</label>
            <div className="walletSelector flex column flexAuto">
              {selectedWallet}
              {this.state.selectorOn ?
                (<ul className="flex column">
                  {walletsList}
                </ul>)
              : null}
            </div>
          </div>
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
          <div className="flex column inputWrap">
            <label>Amount to donate</label>
            <input type="number" value={this.state.amount} onChange={this.onKeyChange} placeholder="How much would you donate"/>
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
