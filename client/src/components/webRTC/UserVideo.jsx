import React from 'react';
import OpenViduVideo from './OpenViduVideo';
import './UserVideo.css';

function UserVideo({ streamManager }) {
  return (
    <>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideo streamManager={streamManager} />
          <div>{/* <p>{getNickNametag()}</p> */}</div>
        </div>
      ) : null}
    </>
  );
}

export default UserVideo;
