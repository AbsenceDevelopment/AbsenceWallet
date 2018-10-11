import React, { Component } from 'react';
import marked from 'marked';
const {ipcRenderer} = window.require("electron");

class UpdateBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      releaseNotes: null,
      modal: false
    }
  }
  componentDidMount(){
    fetch('https://api.github.com/repos/AbsenceDevelopment/AbsenceWallet/releases')
    .then(response =>  response.json())
    .then(resData => {
      var obj = resData[0];
      if (obj.body) {
        this.setState({releaseNotes: obj.body, version: obj.name});
      }else{
        this.setState({releaseNotes: '<p>No notes available</p>', version: obj.name});
      }
    })
  }
  render() {
    let versionInfo = this.state.releaseNotes ? (<div className="content" dangerouslySetInnerHTML={{__html: marked(this.state.releaseNotes)}}></div>) : 'Fetching...';
    let modalClasses = this.state.modal ? "flex column flexAuto modalWrap active" : "flex column flexAuto modalWrap";
    return (
      <div className="flex row flexAuto notificationBar updateBar">
        <div className="flex column flexAuto">
          <p>A new version of the app is available!</p>
        </div>
        <div className="flex row notificationsActions">
          <button className="btn btnWhiteLined" onClick={() => {this.setState({modal: !this.state.modal})}}>What's New?</button>
          <button className="btn" onClick={() => ipcRenderer.send("quitAndInstall")}>Update</button>
        </div>
        <div className={modalClasses}>
          <div className="flex column flex-grid-8 whiteBox">
            <h1>Version {this.state.version} Update</h1>
            {versionInfo}
            <button className="btn btnBlue" onClick={() => {this.setState({modal: !this.state.modal})}}>Got it</button>
          </div>
          <div className="modalOverlay" onClick={() => {this.setState({modal: !this.state.modal})}}></div>
        </div>
      </div>
    );
  }
}


export default UpdateBar;
