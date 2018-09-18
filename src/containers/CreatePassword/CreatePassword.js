import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPassword } from '../../actions/passwordActions';
import { updateInitial } from '../../actions/appStateActions';

class CreatePassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      password: null,
      passwordConfirm: null
    }

    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  onPasswordChange(event){
    this.setState({password: event.target.value});
  }
  onPasswordConfirmChange(event){
    this.setState({passwordConfirm: event.target.value});
  }
  onSubmit(){
    let self = this;
    if (self.state.password === self.state.passwordConfirm) {
      this.props.addPassword(self.state.password);
      this.props.updateInitial(false);
      this.props.history.goBack();
    }
  }
  onCreate(){
    this.setState({passwordSet: true});
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
            <h2>Create a Password</h2>
            <p>In order to proceed you need to set a master password.</p>

            <form className="flex column flexAuto justifyEnd" onSubmit={this.onCreate}>
              <div className="flex column inputWrap">
                <label htmlFor="createPassword">Your Password</label>
                <input id="createPassword" type="password" placeholder="Set Password" value={this.state.password} onChange={this.onPasswordChange}/>
              </div>
              <div className="flex column inputWrap">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" placeholder="Confirm Password" value={this.state.passwordConfirm} onChange={this.onPasswordConfirmChange}/>
              </div>
              <button className="btn btnBlue" onClick={this.onSubmit}>Create Password</button>
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
