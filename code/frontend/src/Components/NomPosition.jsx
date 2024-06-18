import { useState, useEffect, useContext } from "react";
import { ContextReponses } from "../Pages/User/exercice";

export function NomPosition({ display, type }) {
  const [error, setError] = useState(null);
  const [enonceNom, setEnonceNom] = useState("");
  const [reponse, setReponse] = useState("");

  const context = useContext(ContextReponses);
  const enonce = context.enonce;
  const reponseNom = context.reponseNom || "";
  const setReponseNom = context.setReponseNom || (() => {});
  const setNomEstModifie = context.setNomEstModifie || (() => {});

  const responseNom = enonce?.answersValues?.reponseNom;

  useEffect(() => {
    if (enonce?.retour && type === "reponse") {
      setEnonceNom(responseNom);
    } else {
      setEnonceNom(enonce.nom + " " + enonce.label );
      setReponse("");
    }
  }, [enonce]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (enonce?.representation === "Nom" || enonce?.retour) {
    return (
      <section
        className={`${display} flex-col items-center gap-1 p-4 m-5`}
      >
        <h4 className="font-semibold text-xl">Nom de la position</h4>
        <div className="flex items-center">
          <p>{enonceNom}</p>
        </div>
      </section>
    );
  } else {
    return (
      <section
        className={`${display} flex-col items-center gap-1 p-4 m-5`}
      >
        <h4 className="font-semibold text-xl">Nom de la position</h4>
        <div className="flex items-center">
          <input
            className="mx-4"
            value={reponseNom || ""}
            onChange={(e) => {
              setReponse(e.target.value);
              setReponseNom(e.target.value);
              setNomEstModifie(true);
            }}
          />
        </div>
      </section>
    );
  }
}
