import React, { useState } from 'react';
import { SpinWheel } from './SpinWheel';
import { AudioRecorder } from './AudioRecorder';

function Game() {
  return (
    <div>
      <SpinWheel />
      <AudioRecorder />
    </div>
  );
}

export { Game };
