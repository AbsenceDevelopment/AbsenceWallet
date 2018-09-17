import React, { Component } from 'react';
import { connect } from 'react-redux';
import { walletsDb } from '../../localdb.js';
import { addWallet } from '../../actions/walletActions';
import Cart from '../../components/Cart/Cart';
import Sidebar from '../../components/Sidebar/Sidebar';

import './mainWallet.scss';

class MainWallet extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  componentWillMount(){
    let self = this;
    walletsDb.allDocs().then(function(res){
      if (res.total_rows !== 0) {
        for (var i = 0; i < res.rows.length; i++) {
          walletsDb.get(res.rows[i].id).then(function(res){
            self.props.addWallet(res);
          })
        }
      }
    });
    // walletsDb.get('0xAFEEBCFE8D8AF79D8EA3559941898495D9B77F359FF5AE10286F829550AF8316').then(function (doc) {
    //   return walletsDb.remove(doc);
    // });
  }

  render() {
    let wallets = this.props.wallets.map((wallet, i) =>
      <Cart wallet={wallet} key={i}/>
    );
    return (
      <div className="flex row mainContainerWrap">
        <Sidebar/>
        <div className="flex column flex-grid-8 last-flex mainContentWrapper">
          <div className="flex column cardsListWrapper">
            <h1>My Wallets</h1>
            <div className="flex row cardsList">
              {wallets}
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
 addWallet: (data) => dispatch(addWallet(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(MainWallet);
// AFEEBCFE8D8AF79D8EA3559941898495D9B77F359FF5AE10286F829550AF8316
