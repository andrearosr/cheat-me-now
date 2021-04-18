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
    console.log(audioDetails);
    let reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result.replace('data:audio/*;base64,', '');
      //console.log(reader.result);
      fetch('http://predict-ml.carrasco.uruit.com/audio/classification/predict/e3bdc8f8-9f9c-11eb-a09d-865c7b2bf2ae', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ format: "ogg", base64_audio: base64 })
      });
      // You can upload the base64 to server here.
    }

    reader.readAsDataURL(file);
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
        handleAudioStop={handleAudioStop}
        handleAudioUpload={handleAudioUpload}
        handleReset={handleReset}
        hideHeader
        showUIAudio
      />
    </div>
  );
}

export { AudioRecorder };
