import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

import './sidebar.scss';
import logo from '../../assets/img/logo.png';

class Sidebar extends Component {
  render() {
    return (
      <div className="flex column sidebarWrapper last-flex">
        <div className="flex column logoWrapper">
          <img src={logo} alt="Ansence logo"/>
        </div>
        <div className="flex column navWrapper">
          <ul>
            <li>
              <Link to="/main/wallets" className={this.props.location === "/main/wallets" ? "active" : null}>Wallets</Link>
            </li>
            <li>
              <Link to="/main/settings" className={this.props.location === "/main/settings" ? "active" : null}>Settings</Link>
            </li>
            <li>
              <Link to="/main/donate" className={this.props.location === "/main/donate" ? "active" : null}>Donate</Link>
            </li>
          </ul>
        </div>
        <div className="flex flexAuto column newWalletWrapper">
          <h3>Import a Wallet</h3>
          <Link to="/importMnemonic" className="btn">FROM MNEMONIC</Link>
          <Link to="/importKey" className="btn btnPink">FROM PRIVATE KEY</Link>
          <Link to="/createWallet" className="btn btnDarkBlue">CREATE WALLET</Link>
        </div>
      </div>
    );
  }
}


export default Sidebar;
