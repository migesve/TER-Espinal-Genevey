import React, { useContext } from "react";
import { RotationKnob } from "./RotationKnob";
import { FixedRotationKnob } from "./FixedRotationKnob";
import { ContextReponses } from "../Pages/User/exercice";

export const ExerciceContinu = ({
  display,
  schema
}) => {
  const { ennonce } = useContext(ContextReponses);

  return (
    <>
      <div className={`${display} flex-col items-center p-4`}>
        {ennonce.representation === "Schéma très simplifié" || ennonce.representation === "Schéma simplifié"  ? (
          <FixedRotationKnob />
        ) : (
          <RotationKnob schema={schema} />
        )}
      </div>
    </>
  );
};
