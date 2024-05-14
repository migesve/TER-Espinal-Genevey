
import { AiFillSignal } from "react-icons/ai";
import { useState } from 'react'

export const ExerciceCard = () => {

    return (
      <>
        <section className="flex flex-col items-center gap-5 p-5 border border-gray-200 rounded-md">
          <AiFillSignal className="text-5xl text-blue-500" />
          <h3 className="font-semibold text-xl">Exercice X</h3>
          <p className="text-slate-500">Description de l'exercice</p>
        </section>
      </>
    );
  }