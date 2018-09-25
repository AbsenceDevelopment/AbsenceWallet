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
import Topbar from '../../components/Topbar/Topbar';
import UpdateBar from '../../components/UpdateBar/UpdateBar';

import './app.scss';
const electron = window.require("electron");
const Menu = electron.remote.Menu;
const {ipcRenderer} = window.require('electron')

class App extends Component {
  constructor(){
    this.state = {
      updateReady: false
    }
  }
  componentDidMount(){
    var rightClickTemplate = [
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { type: "separator" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ];
    let rightClickMenu = Menu.buildFromTemplate(rightClickTemplate);

    window.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      rightClickMenu.popup(electron.remote.getCurrentWindow())
    }, false);
    ipcRenderer.on('updateReady', function(event, text) {
      this.setState({updateReady: true})
    });
    ipcRenderer.on('updateAvailable', function(){
      alert('There is an update available!');
    })
  }
  render(){
    let updatebar = null;
    if (this.state.updateReady) {
      updatebar = (<UpdateBar/>)
    }
    return(
      <Router>
        <div className="containerFluid flex column appWrapper">
          <Topbar/>
          {updatebar}
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
