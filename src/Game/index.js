import React, { useState } from 'react';
import { SpinWheel } from './SpinWheel';
import { Recorder } from './Recorder';

function Game() {
  return (
    <div>
      <SpinWheel />
      <Recorder />
    </div>
  );
}

export { Game };
