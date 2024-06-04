import { useEffect, useState } from "react";
import { Cas } from "../../Components/Cas";
import { Button } from "../../Components/Button";
import { useForm } from "react-hook-form";
import { ExerciceContinu } from "../../Components/ExerciceContinu";
import { Schema3 } from "../../Components/Schema3";
import { Schema4 } from "../../Components/Schema4";
import { NomPosition } from "../../Components/NomPosition";
import { Sigle } from "../../Components/Sigle";

export function Exercice() {
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [listeSets, setListeSets] = useState([]);
  const [listeInclinaisons, setListeInclinaisons] = useState([]);
  const [tableauIncl, setTableauIncl] = useState([]);
  const [tableauPos, setTableauPos] = useState([]);
  const [ennonce, setEnnonce] = useState(null);
  const [view, setView] = useState("");
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [reponseSchema3, setReponseSchema3] = useState(null);
  const [reponseSchema4, setReponseSchema4] = useState(null);
  const [reponseNom, setReponseNom] = useState(null);
  const [reponseSigle, setReponseSigle] = useState(null);
  const [typesRepresentation, setTypesRepresentation] = useState([
    "Nom",
    "Sigle",
    "Schéma très simplifié",
    "Schéma simplifié",
    "Schéma réaliste",
    "Schéma très réaliste",
  ]);
  const [key, setKey] = useState(0);

  function handleChildClick(data) {
    switch (data.representation) {
      case "Nom":
        setReponseNom(data.choix);
        break;
      case "Sigle":
        setReponseNom(data.choix);
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
    const fetchData = async () => {
      try {
        const setsResponse = await fetch("http://localhost:4000/sets/getAll", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!setsResponse.ok) {
          throw new Error("Failed to fetch sets");
        }

        const setsData = await setsResponse.json();
        if (setsData.status) {
          setError(setsData.status);
          return;
        }

        setListeSets(setsData.sets);

        const inclinaisonsResponse = await fetch(
          "http://localhost:4000/inclinaison/getAll",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!inclinaisonsResponse.ok) {
          throw new Error("Failed to fetch inclinaisons");
        }

        const inclinaisonsData = await inclinaisonsResponse.json();
        if (inclinaisonsData.status) {
          setError(inclinaisonsData.status);
          return;
        }

        setListeInclinaisons(inclinaisonsData.inclinaisons);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (listeSets.length > 0 && listeInclinaisons.length > 0) {
      const generateExercice = async () => {
        const newTableauPos = [];
        const newTableauIncl = [];

        while (newTableauPos.length < 5) {
          const rdm = Math.floor(Math.random() * listeSets.length);
          if (!newTableauPos.includes(rdm)) {
            newTableauPos.push(rdm);
          }
        }

        for (let i = 0; i < 5; i++) {
          let rdm;
          let found = false;
          while (!found) {
            rdm = Math.floor(Math.random() * listeInclinaisons.length);
            const position_id = listeSets[newTableauPos[i]].position_id;
            const inclinaison_id = listeInclinaisons[rdm].inclinaison_id;

            const schema3Response = await fetch(
              `http://localhost:4000/schema3/getByIds/${position_id}/${inclinaison_id}`,
              {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              }
            );

            if (!schema3Response.ok) {
              console.error("Failed to fetch schema3");
              continue;
            }

            const schema3Data = await schema3Response.json();
            if (schema3Data.Succes && schema3Data.Schemas3.length > 0) {
              const schema4Response = await fetch(
                `http://localhost:4000/schema4/getByIds/${position_id}/${inclinaison_id}`,
                {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                }
              );

              if (!schema4Response.ok) {
                console.error("Failed to fetch schema4");
                continue;
              }

              const schema4Data = await schema4Response.json();
              if (schema4Data.Succes && schema4Data.Schemas4.length > 0) {
                newTableauIncl.push(rdm);
                found = true;
              }
            }
          }
        }

        setTableauPos(newTableauPos);
        setTableauIncl(newTableauIncl);
        setSuccess(true);
        choixEnnonce(
          newTableauPos,
          listeSets,
          newTableauIncl,
          listeInclinaisons,
          indexQuestion
        );
      };

      generateExercice();
    }
  }, [listeSets, listeInclinaisons]);

  console.log("ListeSets : ", listeSets);
  console.log("ListeInclinaisons : ", listeInclinaisons);
  console.log("TableauPos : ", tableauPos);
  console.log("TableauIncl : ", tableauIncl);
  console.log("Ennonce : ", ennonce);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const choixEnnonce = (
    tableauPos,
    listeSets,
    tableauIncl,
    listeInclinaisons,
    indexQuestion
  ) => {
    if (
      !tableauPos ||
      !listeSets ||
      tableauPos.length === 0 ||
      listeSets.length === 0 ||
      indexQuestion >= tableauPos.length
    ) {
      console.error("Invalid tableauPos or listeSets");
      return;
    }

    const rdm = Math.floor(Math.random() * 6);
    const selectedSet = listeSets[tableauPos[indexQuestion]];
    const selectedInclinaison = listeInclinaisons[tableauIncl[indexQuestion]];

    if (!selectedSet || !selectedInclinaison) {
      console.error("Invalid selectedSet ou selectedInclinaison");
      return;
    }
    console.log("SelectedSet : ", selectedSet);
    console.log("SelectedInclinaison : ", selectedInclinaison);

    switch (rdm) {
      case 0:
        setEnnonce({ representation: 'Nom', position: selectedSet.nom, inclinaison: selectedInclinaison.label});
        setView('Nom');
        break;
      case 1:
        setEnnonce({ representation: 'Sigle', position: selectedSet.abreviation, inclinaison: selectedInclinaison.label});
        setView('Sigle');
        break;
      case 2:
        setEnnonce({
          representation: "Schéma très simplifié",
          angle:
            selectedSet.angle2 - selectedSet.angle1 >= 11
              ? getRandomIntInclusive(
                  selectedSet.angle1,
                  selectedSet.angle1 + 78
                )
              : getRandomIntInclusive(
                  selectedSet.angle1,
                  selectedSet.angle1 + 10
                ) % 360,
        });
        setView("Schéma très simplifié");
        break;
      case 3:
        setEnnonce({
          representation: "Schéma simplifié",
          angle:
            selectedSet.angle2 - selectedSet.angle1 >= 11
              ? getRandomIntInclusive(
                  selectedSet.angle1,
                  selectedSet.angle1 + 78
                )
              : getRandomIntInclusive(
                  selectedSet.angle1,
                  selectedSet.angle1 + 10
                ) % 360,
        });
        setView("Schéma simplifié");
        break;
      case 4:
        setEnnonce({
          representation: "Schéma réaliste",
          angle: null,
          position: selectedSet.position_id,
          inclinaison: selectedInclinaison.inclinaison_id,
        });
        setView("Schéma réaliste");
        break;
      case 5:
        setEnnonce({
          representation: "Schéma très réaliste",
          angle: null,
          position: selectedSet.position_id,
          inclinaison: selectedInclinaison.inclinaison_id,
        });
        setView("Schéma très réaliste");
        break;
      default:
        setEnnonce({ representation: "Nom" });
        setView("Nom");
        break;
    }
  };

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
          <NomPosition key={key+2}
            sendToParent={handleChildClick}
            display={(view === 'Nom') ? "flex" : "hidden"}
            estEnnonce={(ennonce?.representation === 'Nom') ? "true" : "false"}
            position={ennonce?.position}
            inclinaison={ennonce?.inclinaison}
          />
          <Sigle key={key+3}
            sendToParent={handleChildClick}
            display={(view === 'Sigle') ? "flex" : "hidden"}
            estEnnonce={(ennonce?.representation === 'Sigle') ? "true" : "false"}
            position={ennonce?.position}
            inclinaison={ennonce?.inclinaison}
          />
          <ExerciceContinu display={(view === 'Schéma très simplifié') ? "flex" : "hidden"} />
          <ExerciceContinu display={(view === 'Schéma simplifié') ? "flex" : "hidden"} />
          <Schema3 key={key}
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
