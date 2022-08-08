import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function OpenViduVideo({ streamManager }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);
  return <video autoPlay={true} ref={videoRef} />;
}

export default OpenViduVideo;
