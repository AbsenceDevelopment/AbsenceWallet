import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPassword } from '../../actions/passwordActions';

class CreatePassword extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.onKeyChange = this.onKeyChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onPasswordChange(event){
    this.setState({password: event.target.value});
  }
  onPasswordConfirmChange(event){
    this.setState({passwordConfirm: event.target.value});
  }
  onSubmit(){
    if (this.state.password === this.state.passwordConfirm) {
      this.props.addPassword(this.state.password);
      this.props.history.push('/createPassword');
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
          <p>Provide your password</p>
        </header>
        {this.state.passwordSet ? (
          <div>
            <input type="text" placeholder="Set Password" onChange={this.onKeyChange}/>
            <button onClick={this.onCreate}>Create Password</button>
          </div>
        ) : (
          <div>
            <input type="text" placeholder="Confirm Password" onChange={this.onPasswordConfirmChange}/>
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
 addPassword: (data) => dispatch(addPassword(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(CreatePassword);
