import React, { useState } from 'react';
import { Recorder } from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';

function AudioRecorder() {
  const [audioDetails, setAudioDetails] = useState({
    url: null,
    blob: null,
    chunks: null,
    duration: {
      h: 0,
      m: 0,
      s: 0
    }
  });

  function handleAudioStop(data) {
    setAudioDetails(data);
  }

  function handleAudioUpload(file) {
    console.log(file);
  }

  function handleReset() {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
    };
    setAudioDetails(reset);
  }

  return (
    <div>
      <Recorder
        record={true}
        title={"Start recording"}
        audioURL={audioDetails.url}
        showUIAudio
        handleAudioStop={handleAudioStop}
        handleAudioUpload={handleAudioUpload}
        handleReset={handleReset}
      />
    </div>
  );
}

export { AudioRecorder };
