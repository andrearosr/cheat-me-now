import React, { useState, useEffect, useRef } from "react";
import MicrophoneIcon from './MicrophoneIcon';
import Header from './Header';
import styles from '../styles.module.css';
const audioType = "audio/ogg";

function Recorder({ soundClass, soundCategory }) {
  const mediaRecorder = useRef(null);
  const [time, setTime] = useState(5);
  const [recording, setRecording] = useState(false);
  const [mediaNotFound, setMediaNotFound] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

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
    mediaRecorder.current.start();
    setRecording(true);
    startTimer();
  }

  const stopRecording = () => {
    if (mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      setRecording(false);
      setTime(5);
    }
  }

  const saveAudio = (chunks) => {
    const blob = new Blob([chunks], { type: audioType });
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
    var reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1];
      fetch('http://predict-ml.carrasco.uruit.com/audio/classification/predict/e3bdc8f8-9f9c-11eb-a09d-865c7b2bf2ae', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ format: 'ogg', base64_audio: base64 }),
      });
    }
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
        setMediaNotFound(true);
        console.log("Media Devices will work only with SSL...");
      }
    }

    initializeRecorder();
  }, []);
  
  return (
    <div className="game-screen">
      <Header title={soundCategory.label} color={soundCategory.color} />
      <div className="record">
        Try to imitate the sound of a <br />
        <span className="record__class">{soundClass.label}</span>
      </div>
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