import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectWallet } from '../../actions/walletActions';
import { ethPrice } from '../../actions/appStateActions';
import Cart from '../../components/Cart/Cart';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import ReceiveTokens from '../../components/ReceiveTokens/ReceiveTokens';
import SendTokens from '../../components/SendTokens/SendTokens';
const {ipcRenderer} = window.require('electron')

class Wallets extends Component {
  constructor(props){
    super(props);

    this.state = {
      isDown: false,
      startX: null,
      scrollLeft: null,
      x: null
    }
    this.sliderRef = React.createRef();
    this.ticker = this.ticker.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
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
    ipcRenderer.on('updateNotReady', function(event, text) {
      alert('You have already the latest version running!');
    });
    ipcRenderer.on('error', function(event, text) {
      alert('Oopsie');
    });
  }
  componentWillUnmount(){
    clearInterval(this.tickerInterval);
  }
  onMouseDown(e){
    this.setState({isDown: true, startX: e.pageX - 30, scrollLeft: this.sliderRef.current.scrollLeft });
  }
  onMouseUp(){
    this.setState({isDown: false, startX: null});
  }
  onMouseLeave(){
    this.setState({isDown: false});
  }
  onMouseMove(e){
    if(!this.state.isDown) return;
    e.preventDefault();
    this.sliderRef.current.scrollLeft = this.state.scrollLeft - (e.pageX - this.state.startX);
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
          <div className={this.state.isDown ? "flex row cardsList active" : "flex row cardsList"} ref={this.sliderRef} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseLeave={this.onMouseLeave} onMouseUp={this.onMouseUp}>
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
