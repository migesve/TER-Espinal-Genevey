export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const choixEnonce = (
  listeQuestionsSets,
  listeQuestionsInclinaisons,
  indexQuestion,
  setEnonce,
  difficulte,
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

  const enonceAleatoire = difficulte === 1 ? Math.floor(Math.random() * 6) : Math.floor(Math.random() * 3);
  const selectedSet = listeQuestionsSets[tableauPos[indexQuestion]];
  const selectedInclinaison =
    listeQuestionsInclinaisons[tableauIncl[indexQuestion]];

  if (!selectedSet || !selectedInclinaison) {
    console.error("Invalid selectedSet ou selectedInclinaison");
    return;
  }
  const objet = {
    position: selectedSet.position_id,
    nom: selectedSet.nom,
    inclinaison: selectedInclinaison.inclinaison_id,
    label: selectedInclinaison.label,
    sigle: selectedSet.abreviation,
    angle:
      selectedSet.angle2 - selectedSet.angle1 >= 11
        ? getRandomIntInclusive(selectedSet.angle1, selectedSet.angle1 + 78)
        : getRandomIntInclusive(
          selectedSet.angle1,
          selectedSet.angle1 + 10
        ) % 360,

  };
  switch (enonceAleatoire) {
    case 0:
      objet.representation = "Nom";
      break;
    case 1:
      objet.representation = "Sigle";
      break;
    case 2:
      objet.representation = "Schéma très simplifié";
      break;
    case 3:
      objet.representation = "Schéma simplifié";
      break;
    case 4:
      objet.representation = "Schéma en vue antérieure";
      break;
    case 5:
      objet.representation = "Schéma en vue transversale"
      break;
    default:
      objet.representation = "Nom";
      break;
  }
  setEnonce(objet);
};

export async function saveImage(imageUrl, typeSchema, position, inclinaison, angle) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], 'image.png', { type: 'image/png' });

    const formData = new FormData();
    formData.append('image', file);
    formData.append('typeSchema', typeSchema);
    formData.append('position', position);
    formData.append('inclinaison', inclinaison);
    formData.append('angle', angle);

    console.log('Sending formData:', {
      typeSchema, 
      position, 
      inclinaison, 
      angle, 
      file: file.name
    });

    const uploadResponse = await fetch('http://localhost:4000/upload/', {
      method: 'POST',
      body: formData
    });

    const result = await uploadResponse.json();
    if (!result.success) {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error while saving image:', error);
    throw error;
  }
}
