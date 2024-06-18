import React, { useContext } from "react";
import { Rotation } from "./Rotation";
import { FixedRotation } from "./FixedRotation";
import { ContextReponses } from "../Pages/User/exercice";

export const Schema2 = ({ display, schema, type }) => {
  const context = useContext(ContextReponses);
  const enonce = context.enonce;

  return (
    <>
      <div className={`${display} flex-col items-center p-4`}>
        {enonce.representation === "Schéma simplifié" ||
        enonce?.retour === true ? (
          <FixedRotation schema={schema} type={type} />
        ) : (
          <Rotation schema={schema} />
        )}
      </div>
    </>
  );
};
