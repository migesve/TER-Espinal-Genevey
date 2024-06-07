import { useEffect,useState } from "react";
import { RetourCas } from "../../Components/RetourCas";

export function RetourExercice() {

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
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <h3>Reponse</h3>
          <div className="rectangle">
            <NomPosition
              indexQuestion={indexQuestion + 2}
              sendToParent={handleChildClick}
              display={view === "Nom" ? "flex" : "hidden"}
              estEnnonce={ennonce?.representation === "Nom" ? "true" : "false"}
              position={ennonce?.position}
              inclinaison={ennonce?.inclinaison}
            />
            <Sigle
              indexQuestion={indexQuestion + 3}
              sendToParent={handleChildClick}
              display={view === "Sigle" ? "flex" : "hidden"}
              estEnnonce={
                ennonce?.representation === "Sigle" ? "true" : "false"
              }
              position={ennonce?.position}
              inclinaison={ennonce?.inclinaison}
            />
            <ExerciceContinu
              estEnnonce={
                ennonce?.representation === "Schéma très simplifié"
                  ? true
                  : false
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
              indexQuestion={indexQuestion}
              sendToParent={handleChildClick}
              display={view === "Schéma réaliste" ? "flex" : "hidden"}
              estEnnonce={
                ennonce?.representation === "Schéma réaliste" ? "true" : "false"
              }
              position={ennonce?.position}
              inclinaison={ennonce?.inclinaison}
            />
            <Schema4
              indexQuestion={indexQuestion + 1}
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
        <div>
          <h3>Retour</h3>
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
