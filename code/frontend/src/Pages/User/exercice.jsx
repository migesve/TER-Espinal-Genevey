import { useEffect, useState, createContext } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../Components/Button";
import { Schema1 } from "../../Components/Schema1";
import { Schema2 } from "../../Components/Schema2";
import { Schema3 } from "../../Components/Schema3";
// import { Schema4 } from "../../Components/Schema4";
import { NomPosition } from "../../Components/NomPosition";
import { Sigle } from "../../Components/Sigle";
import {
  fetchDataPosition,
  fetchDataInclinaison,
  // fetchDataSchema3,
  // fetchDataSchema4,
} from "../../utils/fetchData";
import { choixEnnonce } from "../../utils/outils";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ContextReponses = createContext(
  {
    ennonce: {},
    reponseNom: null,
    setReponseNom: () => { },
    reponseSigle: null,
    setReponseSigle: () => { },
    reponseSchema1: null,
    setReponseSchema1: () => { },
    reponseSchema2: null,
    setReponseSchema2: () => { },
    reponseSchema3: null,
    setReponseSchema3: () => { },
    // reponseSchema4: null,
    // setReponseSchema4: () => {},
    nomEstModifie: false,
    setNomEstModifie: () => { },
    sigleEstModifie: false,
    setSigleEstModifie: () => { },
    schema1EstModifie: false,
    setSchema1EstModifie: () => { },
    schema2EstModifie: false,
    setSchema2EstModifie: () => { },
    schema3EstModifie: false,
    setSchema3EstModifie: () => { },
    schema4EstModifie: false,
    setSchema4EstModifie: () => { },

  }
);

export function Exercice() {
  const location = useLocation();
  const initialState = location.state || {};
  const {
    ennonce: initialEnnonce,
    difficulte: initialDifficulte,
    indexQuestion: initialIndexQuestion,
    ...formData
  } = initialState;

  const navigate = useNavigate();
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [ennonce, setEnnonce] = useState({ ...initialEnnonce, retour: false });
  const [view, setView] = useState(initialEnnonce.representation);
  const [difficulte, setDifficulte] = useState(initialDifficulte);
  const [indexQuestion, setIndexQuestion] = useState(initialIndexQuestion);

  const [reponseNom, setReponseNom] = useState(null);
  const [reponseSigle, setReponseSigle] = useState(null);
  const [reponseSchema1, setReponseSchema1] = useState({
    angle: null,
    inclinaison: null,
  });
  const [reponseSchema2, setReponseSchema2] = useState({
    angle: null,
    inclinaison: null,
  });
  const [reponseSchema3, setReponseSchema3] = useState(null);
  // const [reponseSchema4, setReponseSchema4] = useState(null);
  const [nomEstModifie, setNomEstModifie] = useState(false);
  const [sigleEstModifie, setSigleEstModifie] = useState(false);
  const [schema1EstModifie, setSchema1EstModifie] = useState(0);
  const [schema2EstModifie, setSchema2EstModifie] = useState(0);
  const [schema3EstModifie, setSchema3EstModifie] = useState(0);
  const [schema4EstModifie, setSchema4EstModifie] = useState(0);
  const [listeSets, setListeSets] = useState([]);
  const [listeInclinaisons, setListeInclinaisons] = useState([]);
  const [retourReponse, setRetourReponse] = useState(false);

  var buttonsArea = "flex justify-between";
  var typesRepresentation = [];
  if (difficulte == 1) {
    buttonsArea = "grid md:grid-cols-5 space-x-2"; //grid-cols-6 si on est avec 6 representations
    typesRepresentation = [
      "Nom",
      "Sigle",
      "Schéma très simplifié",
      "Schéma simplifié",
      "Schéma réaliste",
      // "Schéma très réaliste",
    ];
  } else {
    buttonsArea = "grid md:grid-cols-3 space-x-2";
    typesRepresentation = ["Nom", "Sigle", "Schéma très simplifié"];
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const setsData = await fetchDataPosition();
        if (setsData.status) {
          setError(inclinaisonsData.status);
        } else {
          setListeSets(setsData);
        }

        const inclinaisonsData = await fetchDataInclinaison();
        if (inclinaisonsData.status) {
          setError(inclinaisonsData.status);
        } else {
          setListeInclinaisons(inclinaisonsData);
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  const onSubmit = methods.handleSubmit((data) => {
    setReponseSchema1(JSON.parse(localStorage.getItem("reponseSchema1")));
    setReponseSchema2(JSON.parse(localStorage.getItem("reponseSchema2")));

    if (indexQuestion == 4) {
      // On a fini les questions
    } else {
      console.log(ennonce);
      const answersValues = {
        reponseNom,
        reponseSigle,
        reponseSchema1,
        reponseSchema2,
        reponseSchema3,
        // reponseSchema4,
      };
      // navigate("/retourExercice", {
      //   state: { indexQuestion, answersValues, difficulte, ennonce },
      // });
      // localStorage.setItem(
      //   "response" + indexQuestion,
      //   JSON.stringify(answersValues)
      // );
      setRetourReponse(true)
    }
  });

  useEffect(() => {
    if (indexQuestion > 0) {
      const answersValues = {
        reponseNom,
        reponseSigle,
        reponseSchema1,
        reponseSchema2,
        reponseSchema3,
        // reponseSchema4,
      };

      localStorage.setItem(
        "response" + (indexQuestion - 1),
        JSON.stringify(answersValues)
      );
    }
  }, [
    reponseNom,
    reponseSigle,
    reponseSchema1,
    reponseSchema2,
    reponseSchema3,
    // reponseSchema4,
    indexQuestion,
    difficulte,
  ]);

  return (
    <>
      <h1>Exercice</h1>
      <h2>Question {indexQuestion + 1}/5</h2>
      <ContextReponses.Provider
            value={{
              ennonce,
              reponseNom,
              setReponseNom,
              reponseSigle,
              setReponseSigle,
              reponseSchema1,
              setReponseSchema1,
              reponseSchema2,
              setReponseSchema2,
              reponseSchema3,
              setReponseSchema3,
              // reponseSchema4,
              // setReponseSchema4,
              sigleEstModifie,
              setSigleEstModifie,
              nomEstModifie,
              setNomEstModifie,
              schema1EstModifie,
              setSchema1EstModifie,
              schema2EstModifie,
              setSchema2EstModifie,
              schema3EstModifie,
              setSchema3EstModifie,
              schema4EstModifie,
              setSchema4EstModifie,
            }}
          >
      <div className={buttonsArea}>
        {typesRepresentation.map((type) => (
          <Button
            key={type}
            text={type}
            color={
              ennonce && ennonce.representation === type
                ? "bg-yellow-500 hover:bg-yellow-600"
                : (view && view === type ? "bg-blue-800" : "bg-blue-600")
            }
            onClick={() => setView(type)}
            icon={(type === "Nom" && nomEstModifie === true
              || type === "Sigle" && sigleEstModifie === true
              || type === "Schéma très simplifié" && schema1EstModifie >= 2
              || type === "Schéma simplifié" && schema2EstModifie >= 2
              || type === "Schéma réaliste" && schema3EstModifie >= 3
              || type === "Schéma très réaliste" && schema4EstModifie >= 3
            ) ? FaCheck : null}
          />
        ))}
      </div>
      <div>
        <h3>Reponse</h3>
        <div className="rectangle">
          
            <NomPosition display={view === "Nom" ? "flex" : "hidden"} />
            <Sigle display={view === "Sigle" ? "flex" : "hidden"} />
            <Schema1
              display={view === "Schéma très simplifié" ? "flex" : "hidden"}
              schema={1}
            />
            <Schema2
              display={view === "Schéma simplifié" ? "flex" : "hidden"}
              schema={2}
            />
            <Schema3 display={view === "Schéma réaliste" ? "flex" : "hidden"} />
            {/* <Schema4
              display={view === "Schéma très réaliste" ? "flex" : "hidden"}
            /> */}
          
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button
          onClick={() => {
            setView(
              typesRepresentation[
              (typesRepresentation.indexOf(view) -
                1 +
                typesRepresentation.length) %
              typesRepresentation.length
              ]
            );
          }}
          text="Representation precedente"
          color="bg-green-600"
          hoverColor="hover:bg-green-800"
        />
        <Button
          onClick={() => {
            setView(
              typesRepresentation[
              (typesRepresentation.indexOf(view) + 1) %
              typesRepresentation.length
              ]
            );
          }}
          text="Representation suivante"
          color="bg-green-600"
          hoverColor="hover:bg-green-800"
        />
      </div>
      <div className="flex py-4 justify-end">
        <Button
          onClick={onSubmit}
          text="Finir Question"
          color="bg-red-600"
          hoverColor="bg-red-800"
        />
      </div>
    </ContextReponses.Provider>
    </>
  );
}
