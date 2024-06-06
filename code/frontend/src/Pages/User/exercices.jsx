import { useEffect, useState } from "react";
import { FormCreerExercice } from "../../Components/FormCreerExercice";
import {
  fetchDataPosition,
  fetchDataInclinaison,
} from "../../utils/fetchData";

export function Exercices() {
  const [error, setError] = useState(null);
  const [listeSets, setListeSets] = useState([]);
  const [listeInclinaisons, setListeInclinaisons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const setsData = await fetchDataPosition();
        if (setsData.status) {
          setError(setsData.status); // Corrected the variable name here
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

  return (
    <>
      <h1>Lancer exercice</h1>
      <FormCreerExercice
        listeSets={listeSets}
        listeInclinaisons={listeInclinaisons}
      />
    </>
  );
}
