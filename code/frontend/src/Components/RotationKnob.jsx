import React from 'react';
import { Knob, Pointer } from 'rc-knob';

const RotationKnob = ({ rotation, setRotation }) => {
  const handleDragRotate = (value) => {
    // Ensure the state update happens outside the render phase
    requestAnimationFrame(() => {
      setRotation(value);
    });
  };

  return (
    <Knob
      size={200}
      min={0}
      max={360}
      value={rotation}
      onChange={handleDragRotate}
    >
      <Pointer width={3} radius={80} type="circle" color="#FC5A96" />
    </Knob>
  );
};

export default RotationKnob;
