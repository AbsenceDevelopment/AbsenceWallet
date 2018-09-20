import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux';
import './settings.scss';

import { selectCurrency } from '../../actions/appStateActions';

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggleSelector: false
    };
    this.toggleSelector = this.toggleSelector.bind(this);
  }
  toggleSelector(){
    this.setState({toggleSelector: !this.state.toggleSelector});
  }
  onSelect(currency){
    this.props.selectCurrency(currency)
    this.toggleSelector();
  }
  render() {
    let currencies = ["USD", "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR"];

    let currencyList = currencies.map(currency =>
      currency !== this.props.selectedCurrency ?
      (<li className="currencyListItem" key={currency} onClick={(e) => this.onSelect(currency)}>
        <p>{currency}</p>
      </li>) : null);
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
