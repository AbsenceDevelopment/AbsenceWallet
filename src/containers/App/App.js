import React, {Component} from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import ImportKey from '../ImportKey/ImportKey';
import MainWallet from '../MainWallet/MainWallet';
import Landing from '../Landing/Landing';
import CreateWallet from '../CreateWallet/CreateWallet';
import CreatePassword from '../CreatePassword/CreatePassword';
import ValidatePassword from '../ValidatePassword/ValidatePassword';


class App extends Component {
  render(){
    return(
      <Router>
        <div className="containerFluid flex column">
          <Switch>
            <Route path="/createWallet" component={CreateWallet}/>
            <Route path="/importKey" component={ImportKey}/>
            <Route path="/main" component={MainWallet}/>
            <Route path="/createPassword" component={CreatePassword}/>
            <Route path="/validatePassword" component={ValidatePassword}/>
            <Route component={Landing}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App
