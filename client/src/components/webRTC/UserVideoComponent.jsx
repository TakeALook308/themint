import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  }

  render() {
    return (
      <>
        {this.props.streamManager !== undefined ? (
<<<<<<< HEAD
          <OpenViduVideoComponent streamManager={this.props.streamManager} />
=======
          <div className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <div>
              <p>{this.getNicknameTag()}</p>
            </div>
          </div>
>>>>>>> c6f13abc577a9a4d6e0d3cb9a57ea7ae5ac0023f
        ) : null}
      </>
    );
  }
}
