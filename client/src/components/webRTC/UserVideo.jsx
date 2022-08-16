import React from 'react';
import OpenViduVideo from './OpenViduVideo';
import './UserVideo.css';

function UserVideo({ streamManager }) {
  const getNickNametag = () => JSON.parse(streamManager.stream.connection.data).clientData;
  return (
    <>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideo streamManager={streamManager} />
<<<<<<< HEAD
          <div>{/* <p>{getNickNametag()}</p> */}</div>
=======
          <div>
            <p>{getNickNametag()}</p>
          </div>
>>>>>>> c6f13abc577a9a4d6e0d3cb9a57ea7ae5ac0023f
        </div>
      ) : null}
    </>
  );
}

export default UserVideo;
