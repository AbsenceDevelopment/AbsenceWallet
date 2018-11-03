import React, { Component } from 'react';
import QRCode from 'qrcode-react';

const {clipboard} = window.require('electron')

class ReceiveTokens extends Component {
  constructor(props){
    super(props);

    this.copyAddress = this.copyAddress.bind(this)
  }
  copyAddress(){
    clipboard.writeText(this.props.wallet)
  }
  render() {
    return (
      <div className="flex column flex-grid-6 receiveWrapper">
        <h1>Receive Tokens</h1>
        <div className="flex flexAuto column whiteBox">
          <div className="flex column flexAuto justify-center">
            <QRCode value={this.props.wallet}></QRCode>
          </div>
          <h3>Your wallet address is:</h3>
          <p>{this.props.wallet}</p>
          <button className="btn btnBlue" onClick={this.copyAddress}>Copy Address</button>
        </div>
      </div>
    );
  }
}


export default ReceiveTokens;
