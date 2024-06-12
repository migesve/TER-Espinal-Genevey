import React, { useContext } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ContextReponses } from "../Pages/User/exercice";

export const FixedRotation = () => {
  const context = useContext(ContextReponses);
  const ennonce = context.ennonce;
  console.log(ennonce);

  if (ennonce.retourReponse === false ) {
    const angle = ennonce.angle;
    const inclinaison = ennonce.inclinaison;
  } else {
    const angle = ennonce.answervalues.angle;
    const inclinaison = ennonce.answervalues.inclinaison;
  }

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
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <img
          src="images/fontanelles.png"
          alt="Fontanelles"
          className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-20 pointer-events-auto"
          style={{
            transform: `rotate(${
              angle
            }deg) translateY(${-inclinaison}px)`,
          }}
        />
        <img
          src="images/tete.png"
          alt="Tete"
          className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-10 pointer-events-none"
          style={{ transform: `rotate(${angle}deg)` }} // scaleY(${translateY}) pour modifier la taille de la tete et la faire tourner
        />
      </div>
      <div className="relative flex flex-col items-center h-72 mx-auto select-none">
        <div className="mb-2">Bien flechi</div>
        <Slider
          min={-10}
          max={10}
          value={inclinaison}
          className="z-50 max-h-[200px]"
          vertical={true}
          disabled={true}
        />
        <div className="mt-2">Pas flechi</div>
      </div>
    </div>
  );
};
