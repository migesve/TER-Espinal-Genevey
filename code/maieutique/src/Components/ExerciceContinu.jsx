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
      <div>
        <img src="images/bassin.jpg" alt="Bassin" />
        <div
          style={{
            position: "relative",
            width: "fit-content",
            margin: "0 auto",
            transform: `rotate(${rotation}deg) translate(${translation.x}px, ${translation.y}px)`,
          }}
        >
          <img src="images/bassin.jpg" alt="Tete" />
        </div>
        <div>
          <label htmlFor="rotation">Rotation (degrees):</label>
          <input
            type="number"
            id="rotation"
            value={rotation}
            onChange={handleRotationChange}
          />
        </div>
        <div>
          <label htmlFor="translationX">Translation X (pixels):</label>
          <input
            type="number"
            id="translationX"
            name="x"
            value={translation.x}
            onChange={handleTranslationChange}
          />
        </div>
        <div>
          <label htmlFor="translationY">Translation Y (pixels):</label>
          <input
            type="number"
            id="translationY"
            name="y"
            value={translation.y}
            onChange={handleTranslationChange}
          />
        </div>
      </div>
    );
};