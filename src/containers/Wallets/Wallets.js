import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectWallet } from '../../actions/walletActions';
import Cart from '../../components/Cart/Cart';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import ReceiveTokens from '../../components/ReceiveTokens/ReceiveTokens';
import SendTokens from '../../components/SendTokens/SendTokens';

class Wallets extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    let wallets = this.props.wallets.map((wallet, i) =>
      <Cart wallet={wallet} key={i} selectedWallet={wallet.id === this.props.selectedWallet ? true : false} onClick={this.props.selectWallet}/>
    );
    let selectedWallet = this.props.wallets.filter(obj => {
      return obj.id === this.props.selectedWallet
    });
    return (
      <div className="flex column flexAuto mainContent">
        <div className="flex column cardsListWrapper">
          <h1>My Wallets</h1>
          <div className="flex row cardsList">
            {wallets}
          </div>
        </div>
        <div className="flex row actionsRow">
          <ReceiveTokens wallet={this.props.selectedWallet} />
          <SendTokens wallet={selectedWallet[0]['privateKey']} />
        </div>
        <div className="flex column transactionsListWrapper">
          {this.props.selectedWallet ? (<TransactionsList/>) : null}
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
export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
