// import { useEffect,useState } from "react";
// import { RetourCas } from "../../Components/RetourCas";

// export function RetourExercice() {

//   return (
//     <>
//       <h1>Exercice</h1>
//       <h2>Question {indexQuestion + 1}/5</h2>
//       <div className={buttonsArea}>
//         {typesRepresentation.map((type) => (
//           <Button
//             key={type}
//             text={type}
//             color={
//               ennonce && ennonce.representation === type
//                 ? "bg-yellow-500 hover:bg-yellow-600"
//                 : "bg-blue-600"
//             }
//             onClick={() => setView(type)}
//           />
//         ))}
//       </div>
//       <div className="grid gap-5 md:grid-cols-2">
//         <div>
//           <h3>Reponse</h3>
//           <div className="rectangle">

//           </div>
//         </div>
//         <div>
//           <h3>Retour</h3>
//         </div>
//       </div>
//       <div className="flex justify-between">
//         <Button
//           onClick={() => {
//             setView(
//               typesRepresentation[
//                 (typesRepresentation.indexOf(view) -
//                   1 +
//                   typesRepresentation.length) %
//                   typesRepresentation.length
//               ]
//             );
//           }}
//           text="Representation precedente"
//           color="bg-green-600"
//           hoverColor="hover:bg-green-800"
//         />
//         <Button
//           onClick={() => {
//             setView(
//               typesRepresentation[
//                 (typesRepresentation.indexOf(view) + 1) %
//                   typesRepresentation.length
//               ]
//             );
//           }}
//           text="Representation suivante"
//           color="bg-green-600"
//           hoverColor="hover:bg-green-800"
//         />
//       </div>
//       <div className="flex py-4 justify-end">
//         <Button
//           onClick={onSubmit}
//           text="Prochaine Question"
//           color="bg-red-600"
//           hoverColor="bg-red-800"
//         />
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../../Components/Button";
import { Schema1 } from "../../Components/Schema1";
import { Schema2 } from "../../Components/Schema2";
import { Schema3 } from "../../Components/Schema3";
import { Schema4 } from "../../Components/Schema4";
import { NomPosition } from "../../Components/NomPosition";
import { Sigle } from "../../Components/Sigle";
import { fetchDataPosition, fetchDataInclinaison } from "../../utils/fetchData";
import { choixEnnonce } from "../../utils/outils";
import { useNavigate } from "react-router-dom";

export function RetourExercice() {
  const navigate = useNavigate();

  const location = useLocation();
  const initialState = location.state || {};
  const {
    indexQuestion: initialIndexQuestion,
    answersValues: initialAnswersValues,
    difficulte: initialDifficulte,
    ennonce: ennonceOriginale,
  } = initialState;

  console.log(initialAnswersValues);

  // const checkNull = (initialAnswersValues) => {
  //   let ennonce = [];
  //   for (let key in initialAnswersValues) {
  //     if (initialAnswersValues[key] === null) {
  //       ennonce.push(key);
  //     } else if (
  //       initialAnswersValues[key].angle === null &&
  //       initialAnswersValues[key].inclinaison === null
  //     ) {
  //       ennonce.push(key);
  //     }
  //   }
  //   return ennonce;
  // };

  const [error, setError] = useState(null);
  const [ennonce, setEnnonce] = useState({
    ...ennonceOriginale,
    representationEnnonce: ennonceOriginale.representation,
    retour: true,
  });
  const [view, setView] = useState(ennonce.representation);
  const [difficulte, setDifficulte] = useState(initialDifficulte);
  const [indexQuestion, setIndexQuestion] = useState(initialIndexQuestion);

  const positionCorrecte = JSON.parse(localStorage.getItem("tableauPos"))[
    indexQuestion
  ];
  const inclinaisonCorrecte = JSON.parse(localStorage.getItem("tableauIncl"))[
    indexQuestion
  ];

  console.log(positionCorrecte);
  console.log(inclinaisonCorrecte);

  const [listeSets, setListeSets] = useState([]);
  const [listeInclinaisons, setListeInclinaisons] = useState([]);

  //const reponses = JSON.parse(localStorage.getItem("reponseSchema1"));

  var buttonsArea = "flex justify-between";
  var typesRepresentation = [];
  if (difficulte == 1) {
    buttonsArea = "grid md:grid-cols-5 space-x-2";
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

  const onSubmit = () => {
    setIndexQuestion((prev) => {
      const newIndex = prev + 1;
      choixEnnonce(listeSets, listeInclinaisons, newIndex, setEnnonce, setView);
      return newIndex;
    });

    navigate("/retourExercice", {
      state: { indexQuestion, difficulte },
    });

    //clean answersValues
  };

  return (
    <>
      <h1>Retour Exercice</h1>
      <h2>Question {indexQuestion + 1}/5</h2>
      <div className={buttonsArea}>
        {typesRepresentation.map((type) => (
          <Button
            key={type}
            text={type}
            color={
              ennonce && ennonce.representationEnnonce === type
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600"
            }
            onClick={() => setView(type)}
          />
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <h3>Votre Reponse</h3>
          <div className="rectangle">
            <NomPosition
              display={view === "Nom" ? "flex" : "hidden"}
              ennonce={ennonce}
              answersValues={initialAnswersValues}
            />
            <Sigle
              display={view === "Sigle" ? "flex" : "hidden"}
              ennonce={ennonce}
              answersValues={initialAnswersValues}
            />
            <Schema1
              display={view === "Schéma très simplifié" ? "flex" : "hidden"}
              schema={1}
              ennonce={ennonce}
              answersValues={initialAnswersValues}
            />
            <Schema2
              display={view === "Schéma simplifié" ? "flex" : "hidden"}
              schema={2}
              ennonce={ennonce}
              answersValues={initialAnswersValues}
            />
            <Schema3
              display={view === "Schéma réaliste" ? "flex" : "hidden"}
              ennonce={ennonce}
              answersValues={initialAnswersValues}
            />
            {/* <Schema4
            display={view === "Schéma très réaliste" ? "flex" : "hidden"}
            ennonce={ennonce}
            answersValues={initialAnswersValues}
            /> */}

          </div>
        </div>
        <div>
          <h3>Correction</h3>
          <div className="rectangle">
            <NomPosition
              display={view === "Nom" ? "flex" : "hidden"}
              ennonce={ennonce}
              answersValues={initialAnswersValues}
            />
            <Sigle
              display={view === "Sigle" ? "flex" : "hidden"}
              ennonce={ennonce}
              answersValues={initialAnswersValues}
            />
            <Schema1
              display={view === "Schéma très simplifié" ? "flex" : "hidden"}
              schema={1}
              ennonce={ennonce}
              answersValues={initialAnswersValues}
            />
            <Schema2
              display={view === "Schéma simplifié" ? "flex" : "hidden"}
              schema={2}
              ennonce={ennonce}
              answersValues={initialAnswersValues}
            />
            <Schema3
              display={view === "Schéma réaliste" ? "flex" : "hidden"}
              ennonce={ennonce}
              answersValues={initialAnswersValues}
            />
            {/* <Schema4
            display={view === "Schéma très réaliste" ? "flex" : "hidden"}
            ennonce={ennonce}
            answersValues={initialAnswersValues}
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
          text="Prochaine Question"
          color="bg-red-600"
          hoverColor="bg-red-800"
        />
      </div>
    </>
  );
}
