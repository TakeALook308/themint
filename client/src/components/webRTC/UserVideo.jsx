import React from 'react';
import OpenViduVideo from './OpenViduVideo';
import './UserVideo.css';

function UserVideo({ streamManager }) {
  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideo streamManager={streamManager} />
        </div>
      ) : null}
    </div>
  );
}

export default UserVideo;
