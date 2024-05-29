import React, { useState } from 'react';
import RotationKnob from './RotationKnob';

export const ExerciceContinu = ({display}) => {
  const [rotation, setRotation] = useState(0);

  return (
    <>
      <div
        className={`${display} flex-col items-center p-4 min-h-screen w-[384px] h-[288px]`}
      >
        <div className="flex relative justify-center items-center w-full h-full">
          <img
            src="images/bassin.png"
            alt="Bassin"
            className="absolute inset-0 object-cover w-full h-full z-30 pointer-events-none"
          />
          <div
            className="absolute inset-0 transform-gpu z-20 pointer-events-none"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <img
              src="images/tete.png"
              alt="Tete"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 transform-gpu z-30 pointer-events-none">
              <img
                src="images/fontanelles.png"
                alt="Fontanelles"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <RotationKnob rotation={rotation} setRotation={setRotation} />
      </div>
    </>
  );
};
