import React, { useState } from 'react';

export const ExerciceContinu = () => {
  const [rotation, setRotation] = useState(0);
  const [translation, setTranslation] = useState({ x: 0, y: 0 });

  const handleRotationChange = (event) => {
    setRotation(parseInt(event.target.value));
  };

  const handleTranslationChange = (event) => {
    const { name, value } = event.target;
    setTranslation((prevTranslation) => ({
      ...prevTranslation,
      [name]: parseInt(value),
    }));
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      <div className="relative flex items-center w-96 h-96">
        <img
          src="images/bassin.png"
          alt="Bassin"
          className="absolute flex items-center inset-0 object-cover w-full h-fit z-20"
        />
        <div
          className="absolute flex items-center inset-0 transform-gpu z-10"
          style={{
            transform: `rotate(${rotation}deg)`,
            /*transformOrigin: `center`,*/
          }}
        >
          <img
            src="images/tete.png"
            alt="Tete"
            className="object-cover w-full h-fit"
          />
          <div
            className="absolute flex items-center inset-0 transform-gpu z-0"
            style={{
              transform: `translate(${translation.x}px, ${translation.y}px)`,
            }}
          >
            <img
              src="images/fontanelles.png"
              alt="Tete"
              className="object-cover w-full h-fit"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 w-96">
        <label htmlFor="rotation" className="block mb-2">
          Rotation (degrees):
        </label>
        <input
          type="number"
          id="rotation"
          value={rotation}
          onChange={handleRotationChange}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-4 w-96">
        <label htmlFor="translationX" className="block mb-2">
          Translation X (pixels):
        </label>
        <input
          type="number"
          id="translationX"
          name="x"
          value={translation.x}
          onChange={handleTranslationChange}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-4 w-96">
        <label htmlFor="translationY" className="block mb-2">
          Translation Y (pixels):
        </label>
        <input
          type="number"
          id="translationY"
          name="y"
          value={translation.y}
          onChange={handleTranslationChange}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};
