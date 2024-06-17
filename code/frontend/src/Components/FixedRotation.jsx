import React, { useContext } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ContextReponses } from "../Pages/User/exercice";

export const FixedRotation = ({ schema, type }) => {
  const context = useContext(ContextReponses);
  const ennonce = context.ennonce;
  console.log(ennonce);

  let angle, inclinaison, bassin, tete, fontanelles, teteNegative;

  const responseSchema = ennonce?.answersValues?.[`reponseSchema${schema}`];

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

  if (
    type === "reponse" &&
    responseSchema &&
    responseSchema.angle !== null &&
    responseSchema.inclinaison !== null
  ) {
    angle = responseSchema.angle;
    inclinaison = responseSchema.inclinaison;
  } else {
    angle = ennonce?.angle; 
    inclinaison = ennonce?.inclinaison; 
  }

  return (
    <div className="flex justify-between">
      <div className="relative w-72 h-72 mx-auto select-none">
        <img
          src= {bassin}
          alt="Bassin"
          className={
            bassin === "simple"
              ? "hidden absolute w-full h-full origin-center transition-transform ease-out duration-100 z-40 pointer-events-none"
              : "absolute w-full h-full origin-center transition-transform ease-out duration-100 z-40 pointer-events-none"
          }
        />
        <img
          src= {teteNegative}
          alt="Tete Negative"
          className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-30 pointer-events-none"
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <img
          src= {fontanelles}
          alt="Fontanelles"
          className="absolute w-full h-full origin-center transition-transform ease-out duration-100 z-20 pointer-events-auto"
          style={{
            transform: `rotate(${angle}deg) translateY(${-inclinaison}px)`,
          }}
        />
        <img
          src= {tete}
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
