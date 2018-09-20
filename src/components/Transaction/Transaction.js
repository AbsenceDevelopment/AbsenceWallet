import React, { Component } from 'react';
import './transaction.scss';
import moment from 'moment';

var ethers = require('ethers');
var provider = new ethers.providers.EtherscanProvider();
var priceUSD = 0;
provider.getEtherPrice().then(function(price) {
  priceUSD = (price / Math.pow(10, 18));
});

class Transaction extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    let date = moment(this.props.transaction.timestamp*1000);
    var month = date.format('MMMM');
    var day   = date.format('D');
    var dateYear = date.format('YYYY')
    var today = new Date();
    var todayYear = today.getFullYear();
    var year = "";
    if(dateYear != todayYear) {
      year = dateYear;
    }
    return (
      <div className="flex row transactionRow">
        <div className="flex column flex-grid-2">
          <p>{this.props.transactionAction}</p>
        </div>
        <div className="flex column flex-grid-4">
          <p>{Number(ethers.utils.formatEther(this.props.transaction.value)).toFixed(7)} ETH</p>
        </div>
        <div className="flex column flex-grid-3">
          <p>{Number((this.props.transaction.value*priceUSD)).toFixed(2)} USD</p>
        </div>
        <div className="flex column flex-grid-3 last-flex">
          <p>{month} {day} {year}</p>
        </div>
      </div>
    );
  }
}

export default Transaction;
