import { useEffect,useState } from "react";
import { ExerciceCard } from "../Components/ExerciceCard";

export function Exercices() {

  return (
    <>
      <h1>Exercices</h1>
      <div className="grid md:grid-cols-5">
        <ExerciceCard />
        <ExerciceCard />
        <ExerciceCard />
        <ExerciceCard />
        <ExerciceCard />
        <ExerciceCard />
        <ExerciceCard />
      </div>
    </>
  );
}
