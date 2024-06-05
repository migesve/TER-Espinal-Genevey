import { useEffect, useState } from "react";
import { FormCreerExercice } from "../../Components/FormCreerExercice";
import {
  fetchDataPosition,
  fetchDataInclinaison,
  fetchDataSchema3,
  fetchDataSchema4,
} from "../../utils/fetchData";

export function Exercices() {
  const [error, setError] = useState(null);
  const [listeSets, setListeSets] = useState([]);
  const [listeInclinaisons, setListeInclinaisons] = useState([]);
  const [newTableauPos, setNewTableauPos] = useState([]);
  const [newTableauIncl, setNewTableauIncl] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const setsData = await fetchDataPosition();
        if (setsData.status) {
          setError(setsData.status); // Corrected the variable name here
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
    if (listeSets.length > 0 && listeInclinaisons.length > 0) {
      const generateExercice = async () => {
        const newPos = [];
        const newIncl = [];

        while (newPos.length < 5) {
          const rdm = Math.floor(Math.random() * listeSets.length);
          if (!newPos.includes(rdm)) {
            newPos.push(rdm);
          }
        }

        for (let i = 0; i < 5; i++) {
          let rdm;
          let found = false;
          while (!found) {
            rdm = Math.floor(Math.random() * listeInclinaisons.length);
            const position_id = listeSets[newPos[i]].position_id;
            const inclinaison_id = listeInclinaisons[rdm].inclinaison_id;

            try {
              const schema3Data = await fetchDataSchema3(
                position_id,
                inclinaison_id
              );
              if (schema3Data.Succes && schema3Data.Schemas3.length > 0) {
                const schema4Data = await fetchDataSchema4(
                  position_id,
                  inclinaison_id
                );
                if (schema4Data.Succes && schema4Data.Schemas4.length > 0) {
                  newIncl.push(rdm);
                  found = true;
                }
              }
            } catch (error) {
              console.error("Error fetching schemas:", error);
            }
          }
        }

        setNewTableauPos(newPos);
        setNewTableauIncl(newIncl);
      };

      generateExercice();
    }
  }, [listeSets, listeInclinaisons]);

  return (
    <>
      <h1>Lancer exercice</h1>
      <FormCreerExercice tableauPos={newTableauPos} tableauIncl={newTableauIncl} />
    </>
  );
}
