import React, { useState } from "react";
import { RotationKnob } from "./RotationKnob";
import { FixedRotationKnob } from "./FixedRotationKnob";

export const ExerciceContinu = ({
  display,
  angle,
  inclinaison,
  estEnnonce,
  sendToParent,
  schema,
}) => {

  return (
    <>
      <div className={`${display} flex-col items-center p-4`}>
        {estEnnonce ? (
          <FixedRotationKnob angle={angle} inclinaison={inclinaison} />
        ) : (
          <RotationKnob sendToParent={sendToParent} schema={schema} />
        )}
      </div>
    </>
  );
};
