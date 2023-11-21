import React, { useState } from 'react';
import browserVideoThumbnail from "../../../../images/browser-extension-thumbnail.png"

const Video = ({ width, height }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleThumbnailClick = () => {
    setIsPlaying(true);
  };

  return (
    <div>
      {!isPlaying ? (
        <img
          src={browserVideoThumbnail}
          alt="Video Thumbnail"
          style={{ cursor: 'pointer', width, height }}
          onClick={handleThumbnailClick}
        />
      ) : (
        <div>
          <iframe
            title="YouTube Video"
            width={width}
            height={height}
            src={`https://www.youtube.com/embed/2_GOOzZkeSM?autoplay=1&mute=1`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default Video;
