import React, { useState, useEffect, useRef, useCallback } from "react";
import MicrophoneIcon from './MicrophoneIcon';
import styles from '../styles.module.css';
const audioType = "audio/ogg";

function Recorder(props) {
  const mediaRecorder = useRef(null);
  const [time, setTime] = useState(5);
  const [recording, setRecording] = useState(false);
  const [mediaNotFound, setMediaNotFound] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  let chunks = [];

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
    e.preventDefault();
    chunks = [];
    mediaRecorder.current.start();
    setRecording(true);
    startTimer();
  }

  const stopRecording = () => {
    console.log(mediaRecorder)
    //mediaRecorder.current.stop();
    if (mediaRecorder.current.state === 'recording') {
      setRecording(false);
      saveAudio();
      setTime(5);
    }
  }

  const saveAudio = () => {
    const blob = new Blob(chunks, { type: audioType });
    const URL = window.URL.createObjectURL(blob);
    setAudioBlob(blob);
    setAudioURL(URL);
  }

  const handleReset = () => {
    setRecording(false);
    setMediaNotFound(false);
    setAudioBlob(null);
    setAudioURL(null);
    setTime(5);
  }

  const handleUpload = () => {
    // whoosh use audioBlob
  }

  useEffect(() => {
    const initializeRecorder = async () => {
      if (navigator.mediaDevices) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream, { type: audioType });
        mediaRecorder.current.ondataavailable = e => {
          chunks.push(e.data);
        };
      } else {
        setMediaNotFound(true);
        console.log("Media Devices will work only with SSL...");
      }
    }

    initializeRecorder();
  }, []);
  
  return (
    <div className={styles.recorder_library_box}>
      <div className={styles.recorder_box}>
        <div className={styles.recorder_box_inner}>
          {!mediaNotFound ? (
            <div className={styles.record_section}>
              <div className={styles.btn_wrapper}>
                <button
                  onClick={handleUpload}
                  className={`${styles.btn} ${styles.upload_btn}`}
                >
                  Upload
                </button>
                <button
                  onClick={handleReset}
                  className={`${styles.btn} ${styles.clear_btn}`}
                >
                  Clear
                </button>
              </div>
              <div className={styles.duration_section}>
                <div className={styles.audio_section}>
                  {audioURL !== null && (
                    <audio controls>
                      <source src={audioURL} type="audio/ogg" />
                    </audio>
                  )}
                </div>
                <div className={styles.duration}>
                  <span className={styles.mins}>
                    {time}
                  </span>
                </div>
              </div>
              {!recording && (
                <a
                  onClick={startRecording}
                  href=" #"
                  className={styles.mic_icon}
                >
                  <span className={styles.microphone_icon_sec}>
                    <MicrophoneIcon />
                  </span>
                </a>
              )}
            </div>
          ) : (
            <p style={{ color: "#fff", marginTop: 30, fontSize: 25 }}>
              Oh no! Seems like your browser doesn't support audio recording :(
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export { Recorder };