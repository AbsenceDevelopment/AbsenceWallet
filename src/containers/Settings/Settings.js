import React, { Component } from 'react';
import { connect } from 'react-redux';
import './settings.scss';

import { selectCurrency } from '../../actions/appStateActions';

import WalletSelector from '../../components/WalletSelector/WalletSelector';

const {clipboard} = window.require('electron');

class Settings extends Component {
  constructor(props){
    super(props);
    let selectedWallet = this.props.wallets.filter(obj => {
      return obj.id === this.props.selectedWallet
    });

    this.state = {
      selectedWallet: selectedWallet[0]['privateKey'],
      toggleSelector: false,
      password: '',
      passwordConfirmed: false,
      valueExported: '',
      typeOfExported: ''
    };
    this.toggleSelector = this.toggleSelector.bind(this);
    this.selectWallet = this.selectWallet.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
    this.exportWallet = this.exportWallet.bind(this);
  }
  toggleSelector(){
    this.setState({toggleSelector: !this.state.toggleSelector});
  }
  onCurrencySelect(currency){
    this.props.selectCurrency(currency)
    this.toggleSelector();
  }
  selectWallet(wallet){
    this.setState({selectedWallet: wallet});
  }
  onPasswordChange(event){
    this.setState({password: event.target.value, valueExported: ''});
    this.confirmPassword(event.target.value);
  }
  confirmPassword(value){
    if (value === this.props.password) {
      this.setState({passwordConfirmed: true});
    }else{
      this.setState({passwordConfirmed: false});
    }
  }
  exportWallet(value){
    this.setState({valueExported: value.data, typeOfExported: value.type});
  }
  copyValue(){
    clipboard.writeText(this.state.valueExported);
  }
  render() {
    let currencies = ["USD", "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR"];

    let currencyList = currencies.map(currency =>
      currency !== this.props.selectedCurrency ?
      (<li className="currencyListItem" key={currency} onClick={(e) => this.onCurrencySelect(currency)}>
        <p>{currency}</p>
      </li>) : null);

    let selectedWallet = this.props.wallets.filter(obj => {
      return obj.privateKey === this.state.selectedWallet
    });
    let exportWalletArray;
    if (this.state.passwordConfirmed && this.state.valueExported) {
      exportWalletArray = (
        <div className="flex column inputWrap">
          <label>Your {this.state.typeOfExported}</label>
          <input type="text" value={this.state.valueExported} readOnly />
          <div className="flex row inputWrap exportCancelActions">
            <div className="flex row inputWrap">
              <button className="btn btnPink" onClick={(e) => this.setState({typeOfExported: '', valueExported: ''})}>Cancel</button>
              <button className="btn btnBlue" onClick={(e) => this.copyValue()}>Copy {this.state.typeOfExported}</button>
            </div>
          </div>
        </div>
      );
    }else if(this.state.passwordConfirmed && !this.state.valueExported){
      exportWalletArray = (
        <div className="flex row inputWrap exportActions">
          {selectedWallet[0].walletMnemonic ? (
            <div className="flex row inputWrap">
              <button className="btn btnPink" onClick={(e) => this.exportWallet({type: 'Mnemonic', data: selectedWallet[0].walletMnemonic})}>Export Mnemonic</button>
              <button className="btn btnBlue" onClick={(e) => this.exportWallet({type: 'Private Key', data: selectedWallet[0].privateKey})}>Export Key</button>
            </div>
          ): (
            <div className="flex row inputWrap">
              <button className="btn btnBlue" onClick={(e) => this.exportWallet({type: 'Private Key', data: selectedWallet[0].privateKey})}>Export Key</button>
            </div>
          )}
        </div>
      );
    }else{
      exportWalletArray = null;
    }
    return (
      <div className="flex column justifyCenter">
        <div className="flex column selecterCurrencyWrapper">
          <h1>Settings</h1>
          <div className="flex column whiteBox">
            <div className="inputWrap flex column">
              <label>Currency to Convert</label>
              <div className="currencySelector">
                <div className="selectedCurrency" onClick={this.toggleSelector}>
                  <p>{this.props.selectedCurrency}</p>
                </div>
                {this.state.toggleSelector ? (
                  <ul>
                    {currencyList}
                  </ul>
                ) : null}
              </div>
            </div>
            <div className="flex column exportWallet">
              <div className="exportWalletHeader">
                <h1>Export your Wallet</h1>
                <p>In order to export your wallet you need to confirm your password and then select any way available to export your wallet.</p>
              </div>
              <WalletSelector selectedWallet={this.state.selectedWallet} onClick={this.selectWallet} wallets={this.props.wallets} label="Export Wallet"/>
              <div className="flex column inputWrap">
                <label>Confirm you Password</label>
                <input type="password" value={this.state.password} onChange={this.onPasswordChange} placeholder="Your Password"/>
              </div>
              {exportWalletArray}
            </div>
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
 selectCurrency: (data) => dispatch(selectCurrency(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
