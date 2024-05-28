
import { React, useState } from 'react'

export const Cas = ({text, color, onClick}) => {

    return (
      <>
        <section className={`flex flex-col items-center gap-1 p-4 m-5 border ${color}`} onClick={onClick}>
          <h4 className="font-semibold text-xl">{text}</h4>
        </section>
      </>
    );
  }

  