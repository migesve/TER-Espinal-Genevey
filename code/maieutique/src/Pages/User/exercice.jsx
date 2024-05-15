import { useEffect,useState } from "react";
import { Cas } from "../../Components/Cas";

export function Exercice() {

  return (
    <>
      <h1>Exercice X</h1>
      <h2>Question X/X</h2>
      <button className="bg-red-500" >Finir Question</button>
      <div className="grid md:grid-cols-6">
        <Cas />
        <Cas />
        <Cas />
        <Cas />
        <Cas />
        <Cas />
      </div>
      <button>Cas suivant</button>
    </>
  );
}
