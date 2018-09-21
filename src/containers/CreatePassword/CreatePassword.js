import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateInitial } from '../../actions/appStateActions';
import { addPassword } from '../../actions/passwordActions';

class CreatePassword extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.onKeyChange = this.onKeyChange.bind(this);
    this.onConfirmChange = this.onConfirmChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onKeyChange(event){
    this.setState({password: event.target.value});
  }
  onConfirmChange(event){
    this.setState({confirmPassword: event.target.value});
  }
  onSubmit(event){
    event.preventDefault()
    if (this.state.password === this.state.confirmPassword) {
      this.props.updateInitial(false);
      this.props.addPassword(this.state.password);
      this.props.history.goBack();
    }
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
            <h2>Create Password</h2>
            <p>Create a new master password for your wallets</p>
            <form className="flex column flexAuto justifyEnd" onSubmit={this.onSubmit}>
              <div className="flex column inputWrap">
                <label htmlFor="password">Your Password</label>
                <input id="password" type="password" placeholder="Validate your Password" onChange={this.onKeyChange}/>
              </div>
              <div className="flex column inputWrap">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" placeholder="Confirm your Password" onChange={this.onConfirmChange}/>
              </div>
              <button className="btn btnBlue" onClick={this.onSubmit}>Create Account</button>
            </form>
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
 addPassword: (data) => dispatch(addPassword(data)),
 updateInitial: (data) => dispatch(updateInitial(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(CreatePassword);
