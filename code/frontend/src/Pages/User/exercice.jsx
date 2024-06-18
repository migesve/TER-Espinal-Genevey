import { useEffect, useState, createContext, useContext } from "react";
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
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { choixEnonce } from "../../utils/outils";
import { AccountContext } from "../../Components/AccountContext";

export const ContextReponses = createContext({
  enonce: {},
  reponseNom: null,
  setReponseNom: () => {},
  reponseSigle: null,
  setReponseSigle: () => {},
  reponseSchema1: null,
  setReponseSchema1: () => {},
  reponseSchema2: null,
  setReponseSchema2: () => {},
  reponseSchema3: null,
  setReponseSchema3: () => {},
  // reponseSchema4: null,
  // setReponseSchema4: () => {},
  nomEstModifie: false,
  setNomEstModifie: () => {},
  sigleEstModifie: false,
  setSigleEstModifie: () => {},
  schema1EstModifie: false,
  setSchema1EstModifie: () => {},
  schema2EstModifie: false,
  setSchema2EstModifie: () => {},
  schema3EstModifie: false,
  setSchema3EstModifie: () => {},
  schema4EstModifie: false,
  setSchema4EstModifie: () => {},
});

export function Exercice() {
  const { user } = useContext(AccountContext);
  const location = useLocation();
  const initialState = location.state || {};
  const {
    enonce: initialEnonce,
    difficulte: initialDifficulte,
    indexQuestion: initialIndexQuestion,
    ...formData
  } = initialState;

  const navigate = useNavigate();
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [retourReponse, setRetourReponse] = useState(false);
  const [enonce, setEnonce] = useState({ ...initialEnonce });
  const [view, setView] = useState(initialEnonce.representation);
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
  const [answersValues, setAnswersValues] = useState({
    reponseNom: "enonce",
    reponseSigle: "enonce",
    reponseSchema1: {angle: 361, inclinaison: 361},
    reponseSchema2: {angle: 361, inclinaison: 361},
    reponseSchema3: {schema3_id: 361},
    // reponseSchema4,
  });

  var buttonsArea = "flex justify-between";
  var typesRepresentation = [];
  if (difficulte == 1) {
    buttonsArea = "grid md:grid-cols-5 space-x-2"; //grid-cols-6 si on est avec 6 representations
    typesRepresentation = [
      "Nom",
      "Sigle",
      "Schéma très simplifié",
      "Schéma simplifié",
      "Schéma en vue antérieure",
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

  const onSubmit = methods.handleSubmit(async (data) => {
    if (!retourReponse) {
      setRetourReponse(true);
      setEnonce({
        ...initialEnonce,
        retour: true,
        answersValues: answersValues,
      });

      // envoyer dans la base de données
      try {
        const response = await fetch("http://localhost:4000/reponses/upload", {
          method: "POST",
          credentials: "include", // to allow cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            position_id: enonce.position,
            inclinaison_id: enonce.inclinaison,
            enonce: enonce.representation,
            nom: reponseNom,
            abreviation: reponseSigle,
            schema1_angle: Math.round(reponseSchema1.angle),
            schema1_inclinaison: 1, 
            schema2_angle: Math.round(reponseSchema2.angle),
            schema2_inclinaison: 1, // a verifier!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            schema3_id: reponseSchema3.schema3_id,
            schema4_id: 1,
            corr_nom: true,
            corr_abreviation: true,
            corr_schema1_angle: true,
            corr_schema1_inclinaison: true,
            corr_schema2_angle: true,
            corr_schema2_inclinaison: true,
            corr_schema3_id: true,
            corr_schema4_id: true,
            difficulte: 1,
            remarque_nom: "",
            remarque_abreviation: "",
            remarque_schema1_angle: "",
            remarque_schema1_inclinaison: "",
            remarque_schema2_angle: "",
            remarque_schema2_inclinaison: "",
            remarque_schema3_id: "",
            remarque_schema4_id: "",
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || errorData.status || "An error occurred");
          return;
        }

        const responseData = await response.json();
        console.log("Success:", responseData);

        if (responseData.LoggedIn) {
          setSuccess(true);
          //navigate('/');
        } else {
          setError(responseData.status);
        }
      } catch (error) {
        console.error("Error:", error);
        setError("An unexpected error occurred");
      }
    } else {
      if (indexQuestion >= 4) {
        // On a fini les questions
      } else {
        setIndexQuestion(indexQuestion + 1);
        setRetourReponse(false);
        choixEnonce(
          listeSets,
          listeInclinaisons,
          indexQuestion,
          setEnonce,
          difficulte
        );
        setReponseNom(null);
        setReponseSigle(null);
        setReponseSchema1(null);
        setReponseSchema2(null);
        setReponseSchema3(null);
        // setReponseSchema4(null);
        setNomEstModifie(false);
        setSigleEstModifie(false);
        setSchema1EstModifie(0);
        setSchema2EstModifie(0);
        setSchema3EstModifie(0);
        setSchema4EstModifie(0);
      }
    }
  });

  useEffect(() => {
    if (indexQuestion >= 0) {
      setAnswersValues({
        reponseNom: reponseNom,
        reponseSigle: reponseSigle,
        reponseSchema1: reponseSchema1,
        reponseSchema2: reponseSchema2,
        reponseSchema3: reponseSchema3,
        // reponseSchema4,
      });

      // localStorage.setItem(
      //   "response" + (indexQuestion - 1),
      //   JSON.stringify(answersValues)
      // ); // changer pour stocker en BD
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

  useEffect(() => {
    if (enonce && enonce.representation && !retourReponse) {
      setView(enonce.representation);
    }
  }, [enonce]);

  return (
    <>
      <h1>{retourReponse ? "Retour Exercice" : "Exercice"}</h1>
      <h2>Question {indexQuestion + 1}/5</h2>
      <ContextReponses.Provider
        value={{
          enonce,
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
                enonce && enonce.representation === type
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : view && view === type
                  ? "bg-blue-800"
                  : "bg-blue-600"
              }
              onClick={() => setView(type)}
              icon={
                (type === "Nom" && nomEstModifie === true) ||
                (type === "Sigle" && sigleEstModifie === true) ||
                (type === "Schéma très simplifié" && schema1EstModifie >= 3) ||
                (type === "Schéma simplifié" && schema2EstModifie >= 3) ||
                (type === "Schéma en vue antérieure" &&
                  schema3EstModifie >= 5) ||
                (type === "Schéma très réaliste" && schema4EstModifie >= 5)
                  ? FaCheck
                  : null
              }
            />
          ))}
        </div>
        <div
          className={
            retourReponse
              ? "grid gap-5 md:grid-cols-2"
              : "grid gap-5 md:grid-cols-1"
          }
        >
          <div>
            <h3>Reponse</h3>
            <div className="rectangle">
              <NomPosition
                display={view === "Nom" ? "flex" : "hidden"}
                type="reponse"
              />
              <Sigle
                display={view === "Sigle" ? "flex" : "hidden"}
                type="reponse"
              />
              <Schema1
                display={view === "Schéma très simplifié" ? "flex" : "hidden"}
                schema={1}
                type="reponse"
              />
              <Schema2
                display={view === "Schéma simplifié" ? "flex" : "hidden"}
                schema={2}
                type="reponse"
              />
              <Schema3
                display={
                  view === "Schéma en vue antérieure" ? "flex" : "hidden"
                }
                type="reponse"
              />
              {/* <Schema4
              display={view === "Schéma très réaliste" ? "flex" : "hidden"}
            /> */}
            </div>
          </div>
          <div className={retourReponse ? "flex" : "hidden"}>
            <h3>Correction</h3>
            <div className="rectangle">
              <NomPosition
                display={view === "Nom" ? "flex" : "hidden"}
                type="retour"
              />
              <Sigle
                display={view === "Sigle" ? "flex" : "hidden"}
                type="retour"
              />
              <Schema1
                display={view === "Schéma très simplifié" ? "flex" : "hidden"}
                schema={1}
                type="retour"
              />
              <Schema2
                display={view === "Schéma simplifié" ? "flex" : "hidden"}
                schema={2}
                type="retour"
              />
              <Schema3
                display={
                  view === "Schéma en vue antérieure" ? "flex" : "hidden"
                }
                type="retour"
              />
              {/* <Schema4
            display={view === "Schéma très réaliste" ? "flex" : "hidden"}
            /> */}
            </div>
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
            text={retourReponse ? "Prochaine Question" : "Finir Question"}
            color="bg-red-600"
            hoverColor="bg-red-800"
          />
        </div>
      </ContextReponses.Provider>
    </>
  );
}
