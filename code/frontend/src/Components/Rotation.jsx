import React, { useState, useRef, useEffect, useContext } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ContextReponses } from "../Pages/User/exercice";

export const Rotation = ({ schema }) => {
  const [dragging, setDragging] = useState(false);
  const centerRef = useRef(null);
  var inclinaisonId = 0;
  var radius = 20;
  var min, max;
  if (schema === 1) {
    radius = 30;
    min = -22;
    max = 50;
  } else {
    radius = 20;
    min = -10;
    max = 35;
  }

  const {
    enonce,
    reponseSchema1,
    setReponseSchema1,
    reponseSchema2,
    setReponseSchema2,
    setSchema1EstModifie,
    setSchema2EstModifie,
  } = useContext(ContextReponses);
  const [angle, setAngle] = useState(0);
  const [inclinaison, setTranslateY] = useState(enonce.inclinaison);

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

  let bassin, tete, fontanelles, teteNegative;

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

    if (schema == 1) {
      if (inclinaison >= -22 && inclinaison < 15) {
        inclinaisonId = 3;
      } else if (inclinaison >= 15 && inclinaison < 45) {
        inclinaisonId = 2;
      } else {
        inclinaisonId = 1;
      }
    } else {
      if (inclinaison >= -10 && inclinaison < 13) {
        inclinaisonId = 3;
      } else if (inclinaison >= 13 && inclinaison < 31) {
        inclinaisonId = 2;
      } else {
        inclinaisonId = 1;
      }
    }
    const responseValue = { angle: angle, inclinaison: inclinaisonId };


    if (schema === 1) {
      setReponseSchema1(responseValue);
      setSchema1EstModifie((prev) => prev + 1);
    } else {
      setReponseSchema2(responseValue);
      setSchema2EstModifie((prev) => prev + 1);
    }
  }, [angle, inclinaison, schema]); // , setReponseSchema1, setReponseSchema2

  const circleX = 50 + radius * Math.cos((angle * Math.PI) / 180);
  const circleY = 50 + radius * Math.sin((angle * Math.PI) / 180);

  const handleSliderChange = (value) => {
    setTranslateY(value);
  };

  if (schema == 2) {
    bassin = "images/bassin.png";
    tete = "images/tete.png";
    fontanelles = "images/fontanelles.png";
    teteNegative = "images/teteNegative.png";
  } else {
    bassin = "simple";
    tete = "images/teteSimple.png";
    fontanelles = "images/fontanellesSimple.png";
    teteNegative = "images/teteNegativeSimple.png";
  }

  return (
    <div className="flex justify-between">
      <div className="relative w-72 h-72 mx-auto select-none" ref={centerRef}>
        <img
          src={bassin}
          alt="Bassin"
          className={
            bassin === "simple"
              ? "hidden absolute w-full h-full origin-center transition-transform ease-out duration-100 z-40 pointer-events-none"
              : "absolute w-full h-full origin-center transition-transform ease-out duration-100 z-40 pointer-events-none"
          }
        />
        <img
          src={teteNegative}
          alt="Tete"
          className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-30 pointer-events-none"
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <img
          src={fontanelles}
          alt="Fontanelles"
          className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-20 pointer-events-auto"
          style={{
            transform: `rotate(${angle}deg) translateY(${-inclinaison}px)`,
          }}
          onMouseDown={handleMouseDown}
        />
        <img
          src={tete}
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
      <div className="relative flex flex-col items-center h-72 mx-auto ml-10 select-none">
        <div className="my-2">Inclinaison</div>
        <Slider
          min={min}
          max={max}
          defaultValue={10}
          onChange={handleSliderChange}
          className="z-50 max-h-[200px]"
          vertical={true}
          handleStyle={{
            backgroundColor: "#ff6969",
            borderColor: "#f00",
            ringColor: "#f00", // a verifier
          }}
        />
        {/* <div className="mt-2">Pas flechi</div> */}
      </div>
    </div>
  );
};
