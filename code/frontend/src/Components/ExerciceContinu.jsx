import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

export const ExerciceContinu = () => {
  const [rotation, setRotation] = useState(0);

  const handleDragRotate = (e, data) => {
    const newRotation = rotation + data.deltaX;
    setRotation(newRotation);
  };

  const nodeRef = useRef(null);

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      <Draggable nodeRef={nodeRef} onDrag={handleDragRotate}>
        <p ref={nodeRef}>ROTAR</p>
      </Draggable>
      <div className="relative flex items-center w-[384px] h-[288px]">
        <img
          src="images/bassin.png"
          alt="Bassin"
          className="absolute flex items-center inset-0 object-cover w-full h-fit z-20 pointer-events-none"
        />
        <div className="absolute flex items-center inset-0 transform-gpu z-10">
          <img
            src="images/tete.png"
            alt="Tete"
            className="object-cover w-full h-fit"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
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
