import React, { Component } from 'react';
import './transaction.scss';

var ethers = require('ethers');

class Transaction extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="flex row transactionRow">
        <div className="flex column flex-grid-2">
          <p>{this.props.transactionAction}</p>
        </div>
        <div className="flex column flex-grid-4">
          <p>{ethers.utils.formatEther(this.props.transaction.value)} ETH</p>
        </div>
        <div className="flex column flex-grid-3">
          <p>{ethers.utils.formatEther(this.props.transaction.value)} ETH</p>
        </div>
        <div className="flex column flex-grid-3 last-flex">
          <p>{this.props.transaction.timestamp}</p>
        </div>
      </div>
    );
  }
}

export default Transaction;
