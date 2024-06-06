import React, { useState, useRef, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export const RotationKnob = ({ sendToParent, schema }) => {
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const centerRef = useRef(null);
  const radius = 20;

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      e.preventDefault();
      const rect = centerRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      let newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      if (newAngle < 0) newAngle += 360;

      setAngle((prevAngle) => {
        const deltaAngle = newAngle - prevAngle;
        let adjustedAngle = prevAngle;

        if (deltaAngle > 180) {
          adjustedAngle += deltaAngle - 360;
        } else if (deltaAngle < -180) {
          adjustedAngle += deltaAngle + 360;
        } else {
          adjustedAngle += deltaAngle;
        }

        adjustedAngle = (adjustedAngle + 360) % 360;

        return adjustedAngle;
      });
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

  useEffect(() => {

    const responseKey = schema === 1 ? "reponseSchema1" : "reponseSchema2";
    const responseValue = { angle, translateY };
    localStorage.setItem(responseKey, JSON.stringify(responseValue));
    //sendToParent({ representation: responseKey, responseValue: responseValue });
  }, [angle, translateY]);

  const circleX = 50 + radius * Math.cos((angle * Math.PI) / 180);
  const circleY = 50 + radius * Math.sin((angle * Math.PI) / 180);

  const handleSliderChange = (value) => {
    setTranslateY(value);
  };

  return (
    <div className="flex justify-between">
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
        />
        <img
          src="images/fontanelles.png"
          alt="Fontanelles"
          className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-20 pointer-events-auto"
          style={{
            transform: `rotate(${angle}deg) translateY(${-translateY}px)`,
          }}
          onMouseDown={handleMouseDown}
        />
        <img
          src="images/tete.png"
          alt="Tete"
          className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-10 pointer-events-none"
          style={{ transform: `rotate(${angle}deg)` }}
          onMouseDown={handleMouseDown}
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
      <div className="relative flex flex-col items-center h-72 mx-auto select-none">
        <div className="mb-2">Bien flechi</div>
        <Slider
          min={-10}
          max={10}
          value={translateY}
          onChange={handleSliderChange}
          className="z-50 max-h-[200px]"
          vertical={true}
        />
        <div className="mt-2">Pas flechi</div>
      </div>
    </div>
  );
};
