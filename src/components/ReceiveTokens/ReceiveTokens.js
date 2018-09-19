import React, { Component } from 'react';
import QRCode from 'qrcode';

const {clipboard} = window.require('electron')

class ReceiveTokens extends Component {
  constructor(props){
    super(props);

    this.copyAddress = this.copyAddress.bind(this)
  }
  copyAddress(){
    clipboard.writeText(this.props.wallet)
  }
  componentDidMount(){
    if (this.props.wallet.length > 0) {
      var canvas = document.getElementById('walletQR')

      QRCode.toCanvas(canvas, this.props.wallet, function (error) {
        if (error) console.error(error)
        console.log('success!');
      });
    }
  }
  render() {
    return (
      <div className="flex column flex-grid-6 receiveWrapper">
        <h1>Receive Tokens</h1>
        <div className="flex flexAuto column whiteBox">
          <canvas id="walletQR"></canvas>
          <h3>Your wallet address is:</h3>
          <p>{this.props.wallet}</p>
          <button className="btn btnBlue" onClick={this.copyAddress}>Copy Address</button>
        </div>
      </div>
    );
  }
}


export default ReceiveTokens;
