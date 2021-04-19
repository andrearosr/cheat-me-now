import React, { useState, useEffect, useRef } from "react";
import Header from './Header';
import Microphone from '../images/microphone.svg';
import Play from '../images/play.png';
const audioType = "audio/ogg";

function Recorder({ soundClass, soundCategory, nextStep }) {
  const mediaRecorder = useRef(null);
  const [time, setTime] = useState(5);
  const [recording, setRecording] = useState(false);

  const startTimer = () => {
    const interval = setInterval(
      () => {
        setTime(time => {
          if (time === 0) {
            clearInterval(interval);
            stopRecording();
            return 5;
          } else {
            return time - 1;
          }
        });
      },
      1000,
    );
  }

  const startRecording = (e) => {
    if (!recording) {
      e.preventDefault();
      mediaRecorder.current.start();
      setRecording(true);
      startTimer();
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      setRecording(false);
      setTime(5);
    }
  }

  const saveAudio = (chunks) => {
    const audioBlob = new Blob([chunks], { type: audioType });
    const audioURL = window.URL.createObjectURL(audioBlob);
    nextStep({ audioBlob, audioURL });
  }

  useEffect(() => {
    const initializeRecorder = async () => {
      if (navigator.mediaDevices) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream, { type: audioType });
        mediaRecorder.current.ondataavailable = e => {
          saveAudio(e.data);
        };
      } else {
        console.log("Media Devices will work only with SSL...");
      }
    }

    initializeRecorder();
  }, []);
  
  return (
    <div className="game-screen">
      <Header title={soundCategory.label} color={soundCategory.color} />
      <div className="record">
        {recording && (
          <div className="record__timer">
            <span>{time}</span>
          </div>
        )}
        Try to imitate the sound of a <br />
        <div className="record__class">
          <span>{soundClass.label}</span>
        </div>
        <button className={`record__button ${recording ? 'record__button--active' : ''}`} onClick={startRecording}>
          <img src={Microphone} alt="mic" />
        </button>
        {/* {audioURL && (
          <button className="record__button playback__button" onClick={handlePlayback}>
            <img className="playback__icon" src={Play} alt="play" />
          </button>
        )} */}
      </div>
    </div>
  );
}

export { Recorder };