import { useEffect, useState } from "react";
import { Cas } from "../../Components/Cas";
import { Button } from "../../Components/Button";
import { useForm } from "react-hook-form";
import { ExerciceContinu } from "../../Components/ExerciceContinu";
import { Schema3 } from "../../Components/Schema3";
import { Schema4 } from "../../Components/Schema4";
import { NomPosition } from "../../Components/NomPosition";
import { Sigle } from "../../Components/Sigle";
import {
  fetchDataPosition,
  fetchDataInclinaison,
  fetchDataSchema3,
  fetchDataSchema4,
} from "../../utils/fetchData";
import { choixEnnonce } from "../../utils/outils";

export function Exercice() {
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [ennonce, setEnnonce] = useState(null);
  const [view, setView] = useState("");
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [reponseSchema1, setReponseSchema1] = useState({
    angle: null,
    inclinaison: null,
  });
  const [reponseSchema2, setReponseSchema2] = useState({
    angle: null,
    inclinaison: null,
  });
  const [reponseSchema3, setReponseSchema3] = useState(null);
  const [reponseSchema4, setReponseSchema4] = useState(null);
  const [reponseNom, setReponseNom] = useState(null);
  const [reponseSigle, setReponseSigle] = useState(null);
  const typesRepresentation = [
    "Nom",
    "Sigle",
    "Schéma très simplifié",
    "Schéma simplifié",
    "Schéma réaliste",
    "Schéma très réaliste",
  ];
  const [key, setKey] = useState(0);
  const [tableauPos, setTableauPos] = useState(
    JSON.parse(localStorage.getItem("tableauPos"))
  );
  const [tableauIncl, setTableauIncl] = useState(
    JSON.parse(localStorage.getItem("tableauIncl"))
  );
  const [listeSets, setListeSets] = useState([]);
  const [listeInclinaisons, setListeInclinaisons] = useState([]);

  function handleChildClick(data) {
    switch (data.representation) {
      case "Nom":
        setReponseNom(data.choix);
        break;
      case "Sigle":
        setReponseSigle(data.choix);
        break;
      case "Schéma1":
        setReponseSchema1({ angle: data.angle, inclinaison: data.inclinaison });
        console.log("Reponse Schema 1 : ", reponseSchema1);
        break;
      case "Schéma2":
        setReponseSchema2({ angle: data.angle, inclinaison: data.inclinaison });
        console.log("Reponse Schema 2 : ", reponseSchema2);
        break;
      case "Schéma3":
        setReponseSchema3(data.choix);
        break;
      case "Schéma4":
        setReponseSchema4(data.choix);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const setsData = await fetchDataPosition();
        if (setsData.status) {
          setError(inclinaisonsData.status);
        } else {
          console.log("SetsData : ", setsData);
          setListeSets(setsData);
        }

        const inclinaisonsData = await fetchDataInclinaison();
        if (inclinaisonsData.status) {
          setError(inclinaisonsData.status);
        } else {
          console.log("InclinaisonsData : ", inclinaisonsData);
          setListeInclinaisons(inclinaisonsData);
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      }
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    if (
      tableauPos.length > 0 &&
      listeSets.length > 0 &&
      tableauIncl.length > 0 &&
      listeInclinaisons.length > 0
    ) {
      choixEnnonce(
        tableauPos,
        listeSets,
        tableauIncl,
        listeInclinaisons,
        indexQuestion,
        setEnnonce,
        setView
      );
    }
  }, [tableauPos, listeSets, tableauIncl, listeInclinaisons, indexQuestion]);

  // console.log("ListeSets : ", listeSets);
  // console.log("ListeInclinaisons : ", listeInclinaisons);
  // console.log("TableauPos : ", tableauPos);
  // console.log("TableauIncl : ", tableauIncl);
  // console.log("Ennonce : ", ennonce);

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    if (indexQuestion == 4) {
    } else {
      setIndexQuestion((prev) => {
        const newIndex = prev + 1;
        choixEnnonce(
          tableauPos,
          listeSets,
          tableauIncl,
          listeInclinaisons,
          newIndex
        ); // Appeler choixEnnonce avec le nouvel index de la question
        setKey((prevKey) => prevKey + 1); // Mettre à jour la clé pour recharger les composants Schema3 et Schema4
        return newIndex;
      });
    }
  });

  return (
    <>
      <h1>Exercice X</h1>
      <h2>Question {indexQuestion + 1}/5</h2>
      <Button
        onClick={onSubmit}
        text="Finir Question"
        color="bg-red-600"
        hoverColor="bg-red-800"
      />
      <div className="grid md:grid-cols-6">
        <Button
          text="Nom"
          color={
            ennonce && ennonce.representation === "Nom"
              ? "bg-green-600 hover:bg-green-800"
              : "bg-blue-600"
          }
          onClick={() => setView("Nom")}
        />
        <Button
          text="Sigle"
          color={
            ennonce && ennonce.representation === "Sigle"
              ? "bg-green-600 hover:bg-green-800"
              : "bg-blue-600"
          }
          onClick={() => setView("Sigle")}
        />
        <Button
          text="Schéma très simplifié"
          color={
            ennonce && ennonce.representation === "Schéma très simplifié"
              ? "bg-green-600 hover:bg-green-800"
              : "bg-blue-600"
          }
          onClick={() => setView("Schéma très simplifié")}
        />
        <Button
          text="Schéma simplifié"
          color={
            ennonce && ennonce.representation === "Schéma simplifié"
              ? "bg-green-600 hover:bg-green-800"
              : "bg-blue-600"
          }
          onClick={() => setView("Schéma simplifié")}
        />
        <Button
          text="Schéma réaliste"
          color={
            ennonce && ennonce.representation === "Schéma réaliste"
              ? "bg-green-600 hover:bg-green-800"
              : "bg-blue-600"
          }
          onClick={() => setView("Schéma réaliste")}
        />
        <Button
          text="Schéma très réaliste"
          color={
            ennonce && ennonce.representation === "Schéma très réaliste"
              ? "bg-green-600 hover:bg-green-800"
              : "bg-blue-600"
          }
          onClick={() => setView("Schéma très réaliste")}
        />
      </div>
      <div>
        <h3>Reponse</h3>
        <div className="rectangle">
          <NomPosition
            key={key + 2}
            sendToParent={handleChildClick}
            display={view === "Nom" ? "flex" : "hidden"}
            estEnnonce={ennonce?.representation === "Nom" ? "true" : "false"}
            position={ennonce?.position}
            inclinaison={ennonce?.inclinaison}
          />
          <Sigle
            key={key + 3}
            sendToParent={handleChildClick}
            display={view === "Sigle" ? "flex" : "hidden"}
            estEnnonce={ennonce?.representation === "Sigle" ? "true" : "false"}
            position={ennonce?.position}
            inclinaison={ennonce?.inclinaison}
          />
          <ExerciceContinu
            estEnnonce={
              ennonce?.representation === "Schéma très simplifié" ? true : false
            }
            sendToParent={handleChildClick}
            display={view === "Schéma très simplifié" ? "flex" : "hidden"}
            angle={ennonce?.angle}
            inclinaison={ennonce?.inclinaison}
            schema={1}
          />
          <ExerciceContinu
            estEnnonce={
              ennonce?.representation === "Schéma simplifié" ? true : false
            }
            sendToParent={handleChildClick}
            display={view === "Schéma simplifié" ? "flex" : "hidden"}
            angle={ennonce?.angle}
            inclinaison={ennonce?.inclinaison}
            schema={2}
          />
          <Schema3
            key={key}
            sendToParent={handleChildClick}
            display={view === "Schéma réaliste" ? "flex" : "hidden"}
            estEnnonce={
              ennonce?.representation === "Schéma réaliste" ? "true" : "false"
            }
            position={ennonce?.position}
            inclinaison={ennonce?.inclinaison}
          />
          <Schema4
            key={key + 1}
            sendToParent={handleChildClick}
            display={view === "Schéma très réaliste" ? "flex" : "hidden"}
            estEnnonce={
              ennonce?.representation === "Schéma très réaliste"
                ? "true"
                : "false"
            }
            position={ennonce?.position}
            inclinaison={ennonce?.inclinaison}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            setView(
              typesRepresentation[
                (typesRepresentation.indexOf(view) - 1) %
                  typesRepresentation.length <
                0
                  ? typesRepresentation.length - 1
                  : (typesRepresentation.indexOf(view) - 1) %
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
    </>
  );
}
