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

  onKeyChange(event){
    this.setState({password: event.target.value});
  }
  onSubmit(){
    if (this.state.password.length !== 0) {
      this.props.addPassword(this.state.password);
      this.props.history.push('/validatePassword');
    }
  }
  render() {
    return (
      <div className="passwordForm">
        <header className="formHeader">
          <h1>Welcome to Absence</h1>
          <p>Provide your password</p>
        </header>
        <input type="text" placeholder="Your Password" onChange={this.onKeyChange}/>
        <button onClick={this.onSubmit}>Create Password</button>
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
