import React, { Component } from 'react';
const {ipcRenderer} = window.require("electron");

class UpdateBar extends Component {
  render() {
    return (
      <div className="flex row flexAuto notificationBar updateBar">
        <div className="flex column flexAuto">
          <p>A new version of the app is available!</p>
        </div>
        <div className="flex row notificationsActions">
          <button className="btn" onClick={() => ipcRenderer.send('quitAndInstall')}>Update</button>
        </div>
      </div>
    );
  }
}


export default UpdateBar;
