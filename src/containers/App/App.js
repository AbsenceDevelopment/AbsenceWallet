import React, {Component} from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import ImportKey from '../ImportKey/ImportKey';
import ImportMnemonic from '../ImportMnemonic/ImportMnemonic';
import MainWallet from '../MainWallet/MainWallet';
import Landing from '../Landing/Landing';
import CreateWallet from '../CreateWallet/CreateWallet';
import CreatePassword from '../CreatePassword/CreatePassword';
import AuthPassword from '../AuthPassword/AuthPassword';

import './app.scss';


class App extends Component {
  render(){
    return(
      <Router>
        <div className="containerFluid flex column appWrapper">
          <Switch>
            <Route path="/createWallet" component={CreateWallet}/>
            <Route path="/importKey" component={ImportKey}/>
            <Route path="/importMnemonic" component={ImportMnemonic}/>
            <Route path="/main" component={MainWallet}/>
            <Route path="/createPassword" component={CreatePassword}/>
            <Route path="/validatePassword" component={AuthPassword}/>
            <Route component={Landing}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App
