import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateWallet, selectWallet } from '../../actions/walletActions';
import { addPassword } from '../../actions/passwordActions';

const cryptoJSON = require('crypto-json')

class AuthPassword extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.onKeyChange = this.onKeyChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onKeyChange(event){
    this.setState({password: event.target.value});
  }
  onSubmit(e){
    let self = this;
    e.preventDefault();
    for (var i = 0; i < this.props.wallets.length; i++) {
      if (cryptoJSON.decrypt(this.props.wallets[i], this.state.password)) {
        let decryptedWallet = cryptoJSON.decrypt(this.props.wallets[i], this.state.password);
        if (i === 0) {
          this.props.selectWallet(decryptedWallet.id);
        }
        decryptedWallet._id = this.props.wallets[i].id;
        this.props.addPassword(this.state.password);
        this.props.updateWallet(decryptedWallet);
      }
    }
    self.props.history.push('/main');
  }
  render() {
    return (
      <div className="flex column justifyCenter authWrapper">
        <div className="flex row authBox">
          <div className="flex column flex-grid-8">
            <h1>Welcome to Absence</h1>
            <p>The next generation Ethereum Wallet</p>
          </div>
          <div className="flex column flex-grid-4 formWrap">
            <h2>Unlock your Account</h2>
            <p>Provide your master password in order to unlock your account</p>
            <form className="flex column flexAuto justifyEnd" onSubmit={this.onSubmit}>
              <div className="flex column inputWrap">
                <label htmlFor="password">Your Password</label>
                <input id="password" type="password" placeholder="Validate your Password" onChange={this.onKeyChange}/>
              </div>
              <button className="btn btnBlue" onClick={this.onSubmit}>Unlock Account</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  wallets: state.wallets
})
const mapDispatchToProps = dispatch => ({
 updateWallet: (data) => dispatch(updateWallet(data)),
 selectWallet: (data) => dispatch(selectWallet(data)),
 addPassword: (data) => dispatch(addPassword(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(AuthPassword);
