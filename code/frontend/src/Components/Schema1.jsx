import React, { useContext } from "react";
import { Rotation } from "./Rotation";
import { FixedRotation } from "./FixedRotation";
import { ContextReponses } from "../Pages/User/exercice";

export const Schema1 = ({
  display,
  schema
}) => {
  const { ennonce } = useContext(ContextReponses);

  return (
    <>
      <div className={`${display} flex-col items-center p-4`}>
        {ennonce.representation === "Schéma très simplifié" ? (
          <FixedRotation />
        ) : (
          <Rotation schema={schema} />
        )}
      </div>
    </>
  );
};
