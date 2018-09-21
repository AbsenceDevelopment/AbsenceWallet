import React, { Component } from 'react';
import { connect } from 'react-redux';

import Transaction from '../../components/Transaction/Transaction';

var ethers = require('ethers');
var provider = new ethers.providers.EtherscanProvider();

class TransactionsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      transactions: [],
      loading: true
    }
    this.getTransactions = this.getTransactions.bind(this);
    this.mounted = false;
  }
  getTransactions(wallet){
    let self = this;
    this.setState({loading: true});
    provider.getHistory(wallet).then(function(history) {
      if (self.mounted) {
        self.setState({loading: false, transactions: history})
      }
    });
  }
  componentWillReceiveProps(nextProps){
    if (this.props.selectedWallet !== nextProps.selectedWallet && nextProps.selectedWallet.length > 0) {
      this.setState({transactions: []});
      this.getTransactions(nextProps.selectedWallet);
    }
  }
  componentWillMount(){
    this.mounted = true;
    if (this.props.selectedWallet.length > 0) {
      this.getTransactions(this.props.selectedWallet);
    }
  }
  componentWillUnmount(){
    this.mounted = false;
  }
  render() {
    let transactions = [].concat(this.state.transactions)
      .sort(function(a,b){
        return new Date(b.timestamp) - new Date(a.timestamp);
      })
      .map(transaction => (
      <Transaction transaction={transaction} currency={this.props.selectedCurrency} transactionValue={this.props.ethereumPrice} key={transaction.hash} transactionAction={transaction.from === this.props.selectedWallet ? "Sent" : "Received"}/>
    ));
    if (this.state.loading) {
      return (
        <div className="flex column">
          <h1>Recent Transactions</h1>
          <div className="flex row transactionRow emptyRow">
            <div className="flex column flex-grid-12">
              <p>Loading...</p>
            </div>
          </div>
        </div>
      )
    }else{
      if (this.state.transactions.length > 0) {
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
      }else{
        return (
          <div className="flex column">
            <h1>Recent Transactions</h1>
            <div className="flex row transactionRow emptyRow">
              <div className="flex column flex-grid-12">
                <p>No transactions at the Moment</p>
              </div>
            </div>
          </div>
        )
      }
    }
  }
}


const mapStateToProps = state => ({
  ...state
})
export default connect(mapStateToProps)(TransactionsList);
