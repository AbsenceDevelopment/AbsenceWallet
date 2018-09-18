import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPassword } from '../../actions/passwordActions';
import { updateInitial } from '../../actions/appStateActions';

class CreatePassword extends Component {
  constructor(props){
    super(props);
    this.state = {}

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
      <div className="passwordForm">
        <header className="formHeader">
          <h1>Welcome to Absence</h1>
        </header>
        {!this.state.passwordSet ? (
          <div>
            <p>Provide your password</p>
            <input type="text" placeholder="Set Password" defaultValue={this.state.password} onChange={this.onPasswordChange}/>
            <button onClick={this.onCreate}>Create Password</button>
          </div>
        ) : (
          <div>
            <p>Confirm your password</p>
            <input type="text" placeholder="Confirm Password" defaultValue={this.state.passwordConfirm} onChange={this.onPasswordConfirmChange}/>
            <button onClick={this.onSubmit}>Confirm Password</button>
          </div>
        )}
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
