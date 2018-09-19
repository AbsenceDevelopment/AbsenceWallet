import React, { Component } from 'react';
import './transaction.scss';
import moment from 'moment';

var ethers = require('ethers');

class Transaction extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    let date = moment(this.props.transaction.timestamp);
    var month = date.format('MMMM');
    var day   = date.format('D');
    return (
      <div className="flex row transactionRow">
        <div className="flex column flex-grid-2">
          <p>{this.props.transactionAction}</p>
        </div>
        <div className="flex column flex-grid-4">
          <p>{Number(ethers.utils.formatEther(this.props.transaction.value)).toFixed(7)} ETH</p>
        </div>
        <div className="flex column flex-grid-3">
          <p>{Number(ethers.utils.formatEther(this.props.transaction.value)).toFixed(7)} ETH</p>
        </div>
        <div className="flex column flex-grid-3 last-flex">
          <p>{month} {day}</p>
        </div>
      </div>
    );
  }
}

export default Transaction;
