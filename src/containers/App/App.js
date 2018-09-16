import React, {Component} from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import ImportKey from '../ImportKey/ImportKey';
import MainWallet from '../MainWallet/MainWallet';
import Landing from '../Landing/Landing';


class App extends Component {
  render(){
    return(
      <Router>
        <div className="containerFluid flex column">
          <Switch>
            <Route path="/importKey" component={ImportKey}/>
            <Route path="/main" component={MainWallet}/>
            <Route component={Landing}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App
