import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

import './sidebar.scss';
import logo from '../../assets/img/logo.png';

class Cart extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="flex column flex-grid-2 sidebarWrapper">
        <div className="flex column logoWrapper">
          <img src={logo}/>
        </div>
        <div className="flex column navWrapper">
          <ul>
            <li>
              <Link to="/main">Wallets</Link>
            </li>
            <li>
              <Link to="/main">Settings</Link>
            </li>
            <li>
              <Link to="/main">Donate</Link>
            </li>
          </ul>
        </div>
        <div className="flex flexAuto column newWalletWrapper">
          <h3>Import a Wallet</h3>
          <Link to="/main" className="btn">FROM MNEMONIC</Link>
          <Link to="/main" className="btn btnPink">FROM PRIVATE KEY</Link>
          <Link to="/main" className="btn btnDarkBlue">CREATE WALLET</Link>
        </div>
      </div>
    );
  }
}


export default Cart;
