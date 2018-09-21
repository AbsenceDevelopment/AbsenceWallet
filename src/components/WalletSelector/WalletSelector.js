import React, { Component } from 'react';

class WalletSelector extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectorOn: false
    }

    this.toggleSelector = this.toggleSelector.bind(this);
  }
  toggleSelector(){
    this.setState({selectorOn: !this.state.selectorOn});
  }
  render() {
    let selectedWallet = this.props.wallets.map(wallet =>
      wallet.privateKey === this.props.selectedWallet ?
      (<div className="selectedWallet flex column flex-frid-12" key={wallet.id} onClick={this.toggleSelector}>
        <p>{wallet.walletName ? wallet.walletName : "A Wallet" }</p>
        <p><small>{wallet.id}</small></p>
      </div>) : null);
    let walletsList = this.props.wallets.map(wallet =>
      wallet.privateKey !== this.props.selectedWallet ?
      (<li className="walletListItem" key={wallet.id} onClick={(e) => {this.props.onClick(wallet.privateKey); this.toggleSelector()}}>
        <p>{wallet.walletName ? wallet.walletName : "A Wallet" }</p>
        <p><small>{wallet.id}</small></p>
      </li>) : null);
    return (
      <div className="flex column inputWrap">
        <label>{this.props.label}</label>
        <div className="walletSelector flex column flexAuto">
          {selectedWallet}
          {this.state.selectorOn ?
            (<ul className="flex column">
              {walletsList}
            </ul>)
          : null}
        </div>
      </div>
    );
  }
}

export default WalletSelector;
