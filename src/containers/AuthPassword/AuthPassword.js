import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateWallet, selectWallet } from '../../actions/walletActions';
import { addPassword } from '../../actions/passwordActions';
import { decryptAsync } from '../../lib/dataHandler';
const {ipcRenderer} = window.require('electron');

class AuthPassword extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.onKeyChange = this.onKeyChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onKeyChange(event){
    this.setState({password: event.target.value, wrongPass: false});
  }
  onSubmit(e){
    let self = this;
    e.preventDefault();
    decryptAsync(this.props.wallets, this.state.password).then(function(data){
      for (var i = 0; i < data.length; i++) {
        let decryptedWallet = data[i];
        if (i === 0) {
          self.props.selectWallet(decryptedWallet.id);
        }
        self.props.addPassword(self.state.password);
        self.props.updateWallet(decryptedWallet);
      }
      self.props.history.push('/main/wallets');
    }).catch((err) => this.setState({wrongPass: true}));
  }
  componentWillMount(nextProps, nextState){
    if (this.props.wallets.length === 0) {
      this.props.history.push('/landing');
    }
  }
  componentDidMount(){
    ipcRenderer.on('updateNotReady', function(event, text) {
      alert('You have already the latest version running!');
    });
    ipcRenderer.on('error', function(event, text) {
      alert('There was an error while updating your app');
    });
  }
  render() {
    return (
      <div className="flex column justifyCenter authWrapper">
        <div className="flex row authBox">
          <div className={this.state.wrongPass ? "flex column flex-grid-8 formHead error" : "flex column flex-grid-8 formHead"} >
            <h1>Welcome to Absence</h1>
            <p>The next generation Ethereum Wallet</p>
          </div>
          <div className="flex column flex-grid-4 formWrap">
            <h2>Unlock your Account</h2>
            <p>Provide your master password in order to unlock your account</p>
            <form className="flex column flexAuto justifyEnd" onSubmit={this.onSubmit}>
              <div className={this.state.wrongPass ? "flex column inputWrap error" : "flex column inputWrap"}>
                <label htmlFor="password">{this.state.wrongPass ? "Wrong Password" : "Your Password"}</label>
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
