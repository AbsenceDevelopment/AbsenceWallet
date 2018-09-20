import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux';

import { addWallet } from '../../actions/walletActions';
import { updateInitial } from '../../actions/appStateActions';

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="flex column justifyCenter">
        <h1>Settings</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})
const mapDispatchToProps = dispatch => ({
 addWallet: (data) => dispatch(addWallet(data)),
 updateInitial: (data) => dispatch(updateInitial(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
