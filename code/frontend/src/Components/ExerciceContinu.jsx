import React, { useState } from 'react';
import RotationKnob from './RotationKnob';

export const ExerciceContinu = ({display}) => {
  const [rotation, setRotation] = useState(0);

  return (
    <>
      <div
        className={`${display} flex-col items-center p-4`}
      >
        <RotationKnob />
      </div>
    </>
  );
};
