import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectWallet } from '../../actions/walletActions';
import { ethPrice } from '../../actions/appStateActions';
import Cart from '../../components/Cart/Cart';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import ReceiveTokens from '../../components/ReceiveTokens/ReceiveTokens';
import SendTokens from '../../components/SendTokens/SendTokens';

class Wallets extends Component {
  constructor(props){
    super(props);

    this.ticker = this.ticker.bind(this);
  }
  ticker(){
    let self = this;
    let url = self.props.selectedCurrency !== "USD" ? 'https://api.coinmarketcap.com/v2/ticker/1027/?convert='+self.props.selectedCurrency : 'https://api.coinmarketcap.com/v2/ticker/1027/';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      self.props.ethPrice(responseJson.data.quotes[self.props.selectedCurrency]["price"]);
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  componentDidMount(){
    this.tickerInterval = setInterval(() => this.ticker(), 5000);
  }
  componentWillUnmount(){
    clearInterval(this.tickerInterval);
  }
  render() {
    let wallets = this.props.wallets.map((wallet, i) =>
      <Cart wallet={wallet} key={i} rate={this.props.ethereumPrice} currency={this.props.selectedCurrency} selectedWallet={wallet.id === this.props.selectedWallet ? true : false} onClick={this.props.selectWallet}/>
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
          {this.props.wallets.length > 0 ? (<SendTokens wallet={selectedWallet[0]['privateKey']} />) : null}
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
  selectWallet: (data) => dispatch(selectWallet(data)),
  ethPrice: (data) => dispatch(ethPrice(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
