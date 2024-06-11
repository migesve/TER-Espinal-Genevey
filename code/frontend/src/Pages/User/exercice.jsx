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
import { useNavigate } from "react-router-dom";

export const ContextReponses = createContext();

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
  const [ennonce, setEnnonce] = useState(initialEnnonce);
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
  const [listeSets, setListeSets] = useState([]);
  const [listeInclinaisons, setListeInclinaisons] = useState([]);

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
      const answersValues = {
        reponseNom,
        reponseSigle,
        reponseSchema1,
        reponseSchema2,
        reponseSchema3,
        // reponseSchema4,
      };
      navigate("/retourExercice", { state: { indexQuestion, answersValues,difficulte } });
      // localStorage.setItem(
      //   "response" + indexQuestion,
      //   JSON.stringify(answersValues)
      // );

      setIndexQuestion((prev) => {
        const newIndex = prev + 1;
        choixEnnonce(
          listeSets,
          listeInclinaisons,
          newIndex,
          setEnnonce,
          setView
        );
        return newIndex;
      });
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
  ]);

  return (
    <>
      <h1>Exercice</h1>
      <h2>Question {indexQuestion + 1}/5</h2>
      <div className={buttonsArea}>
        {typesRepresentation.map((type) => (
          <Button
            key={type}
            text={type}
            color={
              ennonce && ennonce.representation === type
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600"
            }
            onClick={() => setView(type)}
          />
        ))}
      </div>
      <div>
        <h3>Reponse</h3>
        <div className="rectangle">
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
            }}
          >
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
          </ContextReponses.Provider>
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
    </>
  );
}
