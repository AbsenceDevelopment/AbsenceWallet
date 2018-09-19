import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectWallet } from '../../actions/walletActions';
import './donate.scss';

class Donate extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="flex column flexAuto mainContent justifyCenter">
        <div className="flex column justifyCenter flex-grid-6 donateFormWrapper whiteBox">
          <h1>Would you consider Donating?</h1>
          <div className="flex column inputWrap">
            <label>Amount to donate</label>
            <input type="number" placeholder="How much would you donate"/>
          </div>
          <button className="btn btnBlue">Donate</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})
const mapDispatchToProps = dispatch => ({
 selectWallet: (data) => dispatch(selectWallet(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Donate);
