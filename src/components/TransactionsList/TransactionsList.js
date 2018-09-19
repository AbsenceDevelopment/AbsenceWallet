import React, { Component } from 'react';
import { connect } from 'react-redux';

import Transaction from '../../components/Transaction/Transaction';

var ethers = require('ethers');
var provider = new ethers.providers.EtherscanProvider();

class TransactionsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      transactions: []
    }
    this.getTransactions = this.getTransactions.bind(this);
  }
  getTransactions(wallet){
    let self = this;
    provider.getHistory(wallet).then(function(history) {
      self.setState({transactions: history})
    });
  }
  componentWillReceiveProps(nextProps){
    if (this.props.selectedWallet.length > 0) {
      this.setState({transactions: []});
      this.getTransactions(nextProps.selectedWallet);
    }
  }
  componentWillMount(){
    if (this.props.selectedWallet.length > 0) {
      this.getTransactions(this.props.selectedWallet);
    }
  }
  render() {
    let transactions = this.state.transactions.map(transaction => (
      <Transaction transaction={transaction} transactionAction={transaction.from === this.props.selectedWallet ? "Sent" : "Received"}/>
    ));
    return (
      <div className="flex column">
        <h1>Recent Transactions</h1>
        <div className="flex row transactionhead">
          <div className="flex column flex-grid-2">
            <p>Action</p>
          </div>
          <div className="flex column flex-grid-4">
            <p>Exact Amount</p>
          </div>
          <div className="flex column flex-grid-3">
            <p>Current Converion</p>
          </div>
          <div className="flex column flex-grid-3 last-flex">
            <p>Date</p>
          </div>
        </div>
        {transactions}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  ...state
})
export default connect(mapStateToProps)(TransactionsList);
