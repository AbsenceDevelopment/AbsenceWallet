import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWallet, selectWallet } from '../../actions/walletActions';
import Cart from '../../components/Cart/Cart';
import Sidebar from '../../components/Sidebar/Sidebar';
import TransactionsList from '../../components/TransactionsList/TransactionsList';

import './mainWallet.scss';

var ethers = require('ethers');
var provider = new ethers.providers.EtherscanProvider();

class MainWallet extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  componentWillMount(){
    if (this.props.wallets.length === 0) {
      this.props.history.push('/landing')
    }
    else if (this.props.selectedWallet.length === 0) {
      this.props.selectWallet(this.props.wallets[this.props.wallets.length - 1].id);
    }
  }

  render() {
    let wallets = this.props.wallets.map((wallet, i) =>
      <Cart wallet={wallet} key={i} selectedWallet={wallet.id === this.props.selectedWallet ? true : false} onClick={this.props.selectWallet}/>
    );
    return (
      <div className="flex row mainContainerWrap">
        <Sidebar location={this.props.location.pathname}/>
        <div className="flex column flexAuto last-flex mainContentWrapper">
          <div className="flex column cardsListWrapper">
            <h1>My Wallets</h1>
            <div className="flex row cardsList">
              {wallets}
            </div>
          </div>
          <div className="flex column transactionsListWrapper">
            {this.props.selectedWallet ? (<TransactionsList/>) : null}
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
 selectWallet: (data) => dispatch(selectWallet(data)),
 addWallet: (data) => dispatch(addWallet(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(MainWallet);
// AFEEBCFE8D8AF79D8EA3559941898495D9B77F359FF5AE10286F829550AF8316
