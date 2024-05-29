import React, { useState, useRef, useEffect } from 'react';
import './RotatingImages.css';

const RotationKnob = () => {
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const centerRef = useRef(null);

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const rect = centerRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      const newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      setAngle(newAngle);
    }
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <div className="image-container" onMouseDown={handleMouseDown} ref={centerRef}>
      <img
        src="images/bassin.png"
        alt="Image 1"
        className="rotating-image"
      />
      <img
        src="images/tete.png"
        alt="Image 2"
        className="rotating-image"
        style={{ transform: `rotate(${angle}deg)` }}
      />
      <img
        src="images/fontanelles.png"
        alt="Image 3"
        className="rotating-image"
        style={{ transform: `rotate(${angle}deg)` }}
      />
    </div>
  );
};

export default RotationKnob;
