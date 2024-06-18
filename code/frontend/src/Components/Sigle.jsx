import { useState, useEffect, useContext } from "react";
import { ContextReponses } from "../Pages/User/exercice";

export function Sigle({ display, type }) {
  const [error, setError] = useState(null);
  const [enonceSigle, setEnonceSigle] = useState("");
  const [reponse, setReponse] = useState("");

  const context = useContext(ContextReponses);
  const enonce = context.enonce;
  const reponseSigle = context.reponseSigle || "";
  const setReponseSigle = context.setReponseSigle || (() => {});
  const setSigleEstModifie = context.setSigleEstModifie || (() => {});

  const responseSigle = enonce?.answersValues?.reponseSigle;

  useEffect(() => {
    if (enonce?.retour && type === "reponse") {
      setEnonceSigle(responseSigle);
    } else {
      setEnonceSigle(enonce.sigle + " " + enonce.label);
      setReponse("");
      setReponseSigle("enonce");
    }
  }, [enonce]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (enonce?.representation === "Sigle" || enonce?.retour) {
    return (
      <section
        className={`${display} flex-col items-center gap-1 p-4 m-5`}
      >
        <h4 className="font-semibold text-xl">Sigle de la position</h4>
        <div className="flex items-center">
          <p>{enonceSigle}</p>
        </div>
      </section>
    );
  } else {
    return (
      <section
        className={`${display} flex-col items-center gap-1 p-4 m-5`}
      >
        <h4 className="font-semibold text-xl">Sigle de la position</h4>
        <div className="flex items-center">
          <input
            className="mx-4"
            value={reponse || ""}
            onChange={(e) => {
              setReponse(e.target.value);
              setReponseSigle(e.target.value);
              setSigleEstModifie(true);
            }}
          />
        </div>
      </section>
    );
  }
}
