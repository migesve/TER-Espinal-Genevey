import React, { useState, useRef, useEffect } from "react";

const RotationKnob = () => {
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [translateY, setTranslateY] = useState({ img1: 0, img2: 0, img3: 0, img4: 0 });
  const [draggingImage, setDraggingImage] = useState(null);
  const centerRef = useRef(null);
  const radius = 20;

  const handleMouseDown = (e, imageKey) => {
    e.preventDefault(); // Prevent default text selection behavior
    setDragging(true);
    if (imageKey) {
      setDraggingImage(imageKey);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setDraggingImage(null);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      e.preventDefault();
      if (draggingImage) {
        // Handle Y-axis translation for the image
        setTranslateY((prev) => ({
          ...prev,
          [draggingImage]: prev[draggingImage] + e.movementY
        }));
      } else {
        const rect = centerRef.current.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const dx = e.clientX - x;
        const dy = e.clientY - y;
        const newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        setAngle(newAngle);
      }
    }
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const circleX = 50 + radius * Math.cos(((angle) * Math.PI) / 180);
  const circleY = 50 + radius * Math.sin(((angle) * Math.PI) / 180);

  return (
    <div className="relative w-72 h-72 mx-auto select-none" ref={centerRef}>
      <img
        src="images/bassin.png"
        alt="Bassin"
        className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-40 pointer-events-none"
      />
      <img
        src="images/teteNegative.png"
        alt="Tete"
        className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-30 pointer-events-none"
        style={{ transform: `rotate(${angle}deg)` }}
        onMouseDown={(e) => handleMouseDown(e, 'img1')}
      />
      <img
        src="images/fontanelles.png"
        alt="Fontanelles"
        className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-20 pointer-events-auto"
        style={{ transform: `rotate(${angle}deg) translateY(${translateY.img2}px)` }}
        onMouseDown={(e) => handleMouseDown(e, 'img2')}
      />
      <img
        src="images/tete.png"
        alt="Tete"
        className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-10 pointer-events-none"
        style={{ transform: `rotate(${angle}deg)` }}
        onMouseDown={(e) => handleMouseDown(e, 'img3')}
      />
      <svg
        className="absolute cursor-pointer z-50 pointer-events-auto w-2.5 h-2.5 select-none"
        onMouseDown={handleMouseDown}
        style={{
          left: `${circleX}%`,
          top: `${circleY}%`,
          transform: `translate(-50%, -50%)`,
          WebkitUserDrag: "none",
        }}
      >
        <circle cx="50%" cy="50%" r="5" fill="red" />
      </svg>
    </div>
  );
};

export default RotationKnob;
