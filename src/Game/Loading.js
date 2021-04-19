import React, { useEffect } from "react";
import Header from './Header';
import FadeLoader from "react-spinners/FadeLoader";

function Loading({ soundCategory, audioBlob, nextStep }) {
  useEffect(() => {
    const predict = () => {
      var reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64 = reader.result.split(',')[1];
        const res = await fetch('http://predict-ml.carrasco.uruit.com/audio/classification/predict/b59932e0-a0ce-11eb-a9ba-865c7b2bf2ae', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ format: 'ogg', base64_audio: base64 }),
        });
        const prediction = await res.json();
        nextStep({ prediction });
      }
    }

    predict();
  }, []);

  // const handlePlayback = () => {
  //   const audio = new Audio(audioURL);
  //   audio.play();
  // }

  return (
    <div className="game-screen">
      <Header title={soundCategory.label} color={soundCategory.color} />
      <div className="record">
        <span className="record__loading">
          Loading...
        </span>
        <FadeLoader
          color="rgb(98,98,98)"
          height={30}
          width={15}
          radius={10}
          margin={25}
          css="margin-left: -23px;"
        />
      </div>
    </div>
  );
}

export { Loading };