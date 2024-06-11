import React, { useContext } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ContextReponses } from "../Pages/User/exercice";

export const FixedRotation = ( {ennonce: ennonceProp }) => {
  const context = useContext(ContextReponses);
  const ennonce = ennonceProp || context.ennonce;
  console.log(ennonce);

  return (
    <div className="flex justify-between">
      <div className="relative w-72 h-72 mx-auto select-none">
        <img
          src="images/bassin.png"
          alt="Bassin"
          className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-40 pointer-events-none"
        />
        <img
          src="images/teteNegative.png"
          alt="Tete"
          className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-30 pointer-events-none"
          style={{ transform: `rotate(${ennonce.angle}deg)` }}
        />
        <img
          src="images/fontanelles.png"
          alt="Fontanelles"
          className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-20 pointer-events-auto"
          style={{
            transform: `rotate(${
              ennonce.angle
            }deg) translateY(${-ennonce.inclinaison}px)`,
          }}
        />
        <img
          src="images/tete.png"
          alt="Tete"
          className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-10 pointer-events-none"
          style={{ transform: `rotate(${ennonce.angle}deg)` }} // scaleY(${translateY}) pour modifier la taille de la tete et la faire tourner
        />
      </div>
      <div className="relative flex flex-col items-center h-72 mx-auto select-none">
        <div className="mb-2">Bien flechi</div>
        <Slider
          min={-10}
          max={10}
          value={ennonce.inclinaison}
          className="z-50 max-h-[200px]"
          vertical={true}
          disabled={true}
        />
        <div className="mt-2">Pas flechi</div>
      </div>
    </div>
  );
};
