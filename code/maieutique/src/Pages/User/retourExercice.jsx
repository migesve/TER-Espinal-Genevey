import { useEffect,useState } from "react";
import { RetourCas } from "../../Components/RetourCas";

export function RetourExercice() {

  return (
    <>
      <h1>Retour Exercice X</h1>
      <h2>Question X/X</h2>
      <button className="items-center gap-1 p-4 m-5 font-semibold text-white bg-green-600 rounded-md hover:bg-green-800">
        Prochaine Question
      </button>
      <div className="grid md:grid-cols-6">
        <RetourCas />
        <RetourCas />
        <RetourCas />
        <RetourCas />
        <RetourCas />
        <RetourCas />
      </div>
      <div>
        <div className="rectangle" />
        <div className="rectangle2" />
      </div>
      <button className="items-center gap-1 p-4 m-5 font-semibold text-white bg-green-600 rounded-md hover:bg-green-800">
        Prochaine Question
      </button>
    </>
  );
}
