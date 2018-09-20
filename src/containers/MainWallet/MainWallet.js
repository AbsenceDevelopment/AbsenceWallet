import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
} from 'react-router-dom'
import { selectWallet } from '../../actions/walletActions';
import Sidebar from '../../components/Sidebar/Sidebar';
import Wallets from '../Wallets/Wallets';
import Donate from '../Donate/Donate';
import Settings from '../Settings/Settings';
import { selectCurrency } from '../../actions/appStateActions';

import './mainWallet.scss';

class MainWallet extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  componentWillMount(){
    if (this.props.wallets.length === 0) {
      this.props.history.push('/landing')
    }
    else if (this.props.selectedWallet.length === 0) {
      this.props.selectWallet(this.props.wallets[this.props.wallets.length - 1].id);
    }
    if (this.props.selectedCurrency && this.props.selectedCurrency.length === 0) {
      this.props.selectCurrency("USD");
    }
  }
  render() {
    return (
      <div className="flex row mainContainerWrap">
        <Sidebar location={this.props.location.pathname}/>
        <div className="flex column flexAuto last-flex mainContentWrapper">
        <Switch>
          <Route path="/main/wallets" component={Wallets}/>
          <Route path="/main/donate" component={Donate}/>
          <Route path="/main/settings" component={Settings}/>
        </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})
const mapDispatchToProps = dispatch => ({
 selectWallet: (data) => dispatch(selectWallet(data)),
 selectCurrency: (data) => dispatch(selectCurrency(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(MainWallet);
