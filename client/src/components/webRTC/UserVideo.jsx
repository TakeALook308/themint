import React from 'react';
import OpenViduVideo from './OpenViduVideo';
import './UserVideo.css';

function UserVideo({ streamManager }) {
  const getNickNametag = () => JSON.parse(streamManager.stream.connection.data).clientData;
  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideo streamManager={streamManager} />
          <div>
            <p>{getNickNametag()}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserVideo;
