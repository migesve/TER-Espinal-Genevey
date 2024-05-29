import React, { useState, useRef } from 'react';
import { Knob, Value, Pointer } from 'rc-knob';

export const ExerciceContinu = ({display}) => {
  const [rotation, setRotation] = useState(0);

  const handleDragRotate = (data) => {
    const newRotation = data;
    setRotation(newRotation);
  };
  return (
    <div className={`${display} flex-col items-center p-4 min-h-screen`}>
      <Knob
        size={200}
        min={0}
        max={360}
        onChange={(value) => handleDragRotate(value)}
      >
        <Pointer width={3} radius={80} type="circle" color="#FC5A96" />
      </Knob>
      <div className="relative flex items-center w-[384px] h-[288px]">
        <img
          src="images/bassin.png"
          alt="Bassin"
          className="absolute flex items-center inset-0 object-cover w-full h-fit z-20 pointer-events-none"
        />
        <div
          className="absolute flex items-center inset-0 transform-gpu z-10"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <img
            src="images/tete.png"
            alt="Tete"
            className="object-cover w-full h-fit"
          />
          <div className="absolute flex items-center inset-0 transform-gpu z-0">
            <img
              src="images/fontanelles.png"
              alt="Fontanelles"
              className="object-cover w-full h-fit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
