export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const choixEnnonce = (
  listeQuestionsSets,
  listeQuestionsInclinaisons,
  indexQuestion,
  setEnnonce,
  setView
) => {
  const tableauPos = JSON.parse(localStorage.getItem("tableauPos"));
  const tableauIncl = JSON.parse(localStorage.getItem("tableauIncl"));

  if (
    !tableauPos ||
    !listeQuestionsSets ||
    tableauPos.length === 0 ||
    listeQuestionsSets.length === 0 ||
    indexQuestion >= tableauPos.length
  ) {
    console.error("Invalid tableauPos or listeQuestionsSets");
    return;
  }

  const ennonceAleatoire = Math.floor(Math.random() * 6);
  const selectedSet = listeQuestionsSets[tableauPos[indexQuestion]];
  const selectedInclinaison =
    listeQuestionsInclinaisons[tableauIncl[indexQuestion]];

  if (!selectedSet || !selectedInclinaison) {
    console.error("Invalid selectedSet ou selectedInclinaison");
    return;
  }

  switch (ennonceAleatoire) {
    case 0:
      setEnnonce({
        representation: "Nom",
        position: selectedSet.nom,
        inclinaison: selectedInclinaison.label,
      });
      setView("Nom");
      break;
    case 1:
      setEnnonce({
        representation: "Sigle",
        position: selectedSet.abreviation,
        inclinaison: selectedInclinaison.label,
      });
      setView("Sigle");
      break;
    case 2:
      setEnnonce({
        representation: "Schéma très simplifié",
        angle:
          selectedSet.angle2 - selectedSet.angle1 >= 11
            ? getRandomIntInclusive(selectedSet.angle1, selectedSet.angle1 + 78)
            : getRandomIntInclusive(
                selectedSet.angle1,
                selectedSet.angle1 + 10
              ) % 360,
        inclinaison: selectedInclinaison.inclinaison_id == 1 ? 10 : -10,
      });
      setView("Schéma très simplifié");
      break;
    case 3:
      setEnnonce({
        representation: "Schéma simplifié",
        angle:
          selectedSet.angle2 - selectedSet.angle1 >= 11
            ? getRandomIntInclusive(selectedSet.angle1, selectedSet.angle1 + 78)
            : getRandomIntInclusive(
                selectedSet.angle1,
                selectedSet.angle1 + 10
              ) % 360,
        inclinaison: selectedInclinaison.inclinaison_id == 1 ? 10 : -10,
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
