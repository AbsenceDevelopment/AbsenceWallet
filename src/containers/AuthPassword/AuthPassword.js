import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateWallet } from '../../actions/walletActions';
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
  onSubmit(){
    let self = this;
    for (var i = 0; i < this.props.wallets.length; i++) {
      if (cryptoJSON.decrypt(this.props.wallets[i], this.state.password)) {
        let decryptedWallet = cryptoJSON.decrypt(this.props.wallets[i], this.state.password);
        decryptedWallet._id = this.props.wallets[i].id;
        this.props.addPassword(this.state.password);
        this.props.updateWallet(decryptedWallet)
      }
    }
    self.props.history.push('/main');
  }
  render() {
    return (
      <div className="passwordForm">
        <header className="formHeader">
          <h1>Welcome to Absence</h1>
          <p>Validate your password</p>
        </header>
        <input type="text" placeholder="Validate your Password" onChange={this.onKeyChange}/>
        <button onClick={this.onSubmit}>Create Password</button>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  wallets: state.wallets
})
const mapDispatchToProps = dispatch => ({
 updateWallet: (data) => dispatch(updateWallet(data)),
 addPassword: (data) => dispatch(addPassword(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(AuthPassword);
