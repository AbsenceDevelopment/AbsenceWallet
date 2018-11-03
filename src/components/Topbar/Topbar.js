import React, { Component } from 'react';
import './topbar.scss';

const {is} = window.require('electron-util');
const remote = window.require('electron').remote;

class Topbar extends Component {

  onClose(){
    var window = remote.BrowserWindow.getFocusedWindow();
    window.close();
  }
  onMin(){
    var window = remote.BrowserWindow.getFocusedWindow();
    window.minimize();
  }
  onMax(){
    var window = remote.BrowserWindow.getFocusedWindow();
    if (!window.isMaximized()) {
       window.maximize();
    } else {
       window.unmaximize();
    }
  }

  render() {
    let classes;
    if (is.macos) {
      classes = "topbar flex macTop row"
    }else{
      classes = "topbar flex row"
    }
    return (
      <div className={classes}>
        <div className="closeBtn" onClick={this.onClose}></div>
        <div className="minBtn" onClick={this.onMin}></div>
        <div className="maxBtn" onClick={this.onMax}></div>
      </div>
    );
  }
}

export default Topbar;
