import React, { useContext } from "react";
import { Rotation } from "./Rotation";
import { FixedRotation } from "./FixedRotation";
import { ContextReponses } from "../Pages/User/exercice";

export const Schema2 = ({
  display,
  schema,
  ennonce: ennonceProp,
}) => {
  
  const context = useContext(ContextReponses);
  const ennonce = ennonceProp || context.ennonce;
  console.log(ennonce);
  
  return (
    <>
      <div className={`${display} flex-col items-center p-4`}>
        {ennonce.representation === "Schéma simplifié" || ennonce?.retour === true ? (
          <FixedRotation />
        ) : (
          <Rotation schema={schema} />
        )}
      </div>
    </>
  );
};
