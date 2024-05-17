import { useEffect,useState } from "react";
import { Cas } from "../../Components/Cas";

export function Exercice() {

  return (
    <>
      <h1>Exercice X</h1>
      <h2>Question X/X</h2>
      <button className="items-center gap-1 p-4 m-5 font-semibold text-white bg-red-600 rounded-md hover:bg-red-800">
        Finir Question
      </button>
      <div className="grid md:grid-cols-6">
        <Cas />
        <Cas />
        <Cas />
        <Cas />
        <Cas />
        <Cas />
      </div>
      <div>
        <h3>Reponse</h3>
        <div className="rectangle" />
      </div>
      <button className="items-center gap-1 p-4 m-5 font-semibold text-white bg-green-600 rounded-md hover:bg-green-800">
        Cas suivant
      </button>
    </>
  );
}
