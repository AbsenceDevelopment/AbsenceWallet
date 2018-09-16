import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

import {walletsDb} from '../../localdb.js';

class Landing extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  componentDidMount(){
    let self = this;
    walletsDb.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
    }).catch(function (err) {
      console.log(err);
    });
  }
  render() {
    return (
      <div className="importForm">
        <header className="formHeader">
          <h1>hey</h1>
          <Link to="/createWallet">Create Wallet</Link>
          <Link to="/importKey">Import From Public Key</Link>
          <Link to="/importBip">Import From Mnemonic</Link>
        </header>
      </div>
    );
  }
}

export default Landing;
