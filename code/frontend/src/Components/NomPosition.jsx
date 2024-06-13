import { useState, useEffect, useContext } from "react";
import { ContextReponses } from "../Pages/User/exercice";

export function NomPosition({ display, type }) {
  const [error, setError] = useState(null);
  const [ennonceNom, setEnnonceNom] = useState("");
  const [reponse, setReponse] = useState("");

  const context = useContext(ContextReponses);
  const ennonce = context.ennonce;
  console.log(ennonce);
  const reponseNom = context.reponseNom || "";
  const setReponseNom = context.setReponseNom || (() => {});
  const setNomEstModifie = context.setNomEstModifie || (() => {});

  const responseNom = ennonce?.answerValues?.reponseNom;

  useEffect(() => {
    if (ennonce?.retour && type === "reponse") {
      setEnnonceNom(responseNom);
    } else {
      setEnnonceNom(ennonce.nom + " " + ennonce.label);
      setReponse("");
    }
  }, [ennonce]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (ennonce?.representation === "Nom" || ennonce?.retour) {
    return (
      <section
        className={`${display} flex-col items-center gap-1 p-4 m-5 border border-gray-200`}
      >
        <h4 className="font-semibold text-xl">Nom de la position</h4>
        <div className="flex items-center">
          <p>{ennonceNom}</p>
        </div>
      </section>
    );
  } else {
    return (
      <section
        className={`${display} flex-col items-center gap-1 p-4 m-5 border border-gray-200`}
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
