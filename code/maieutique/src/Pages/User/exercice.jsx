import { useEffect, useState } from "react";
import { Cas } from "../../Components/Cas";
import { Button } from "../../Components/Button";
import { useForm } from "react-hook-form";
import { randomNumberBetween } from "@mui/x-data-grid/internals";
import { ExerciceContinu } from "../../Components/ExerciceContinu";


export function Exercice() {

  const methods = useForm()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null);
  const [listeSets, setListeSets] = useState([]);
  const [listeInclinaisons, setListeInclinaisons] = useState([]);
  const [exercice, setExercice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const setsResponse = await fetch('http://localhost:4000/sets/getAll', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!setsResponse.ok) {
          throw new Error('Failed to fetch sets');
        }

        const setsData = await setsResponse.json();
        if (setsData.status) {
          setError(setsData.status);
          return;
        }

        setListeSets(setsData.sets);

        const inclinaisonsResponse = await fetch('http://localhost:4000/inclinaison/getAll', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!inclinaisonsResponse.ok) {
          throw new Error('Failed to fetch inclinaisons');
        }

        const inclinaisonsData = await inclinaisonsResponse.json();
        if (inclinaisonsData.status) {
          setError(inclinaisonsData.status);
          return;
        }

        setListeInclinaisons(inclinaisonsData.inclinaisons);

      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (listeSets.length > 0 && listeInclinaisons.length > 0) {
      const generateExercice = async () => {
        const tableauPos = [];
        const tableauIncl = [];

        while (tableauPos.length < 5) {
          const rdm = Math.floor(Math.random() * listeSets.length);
          if (!tableauPos.includes(rdm)) {
            tableauPos.push(rdm);
          }
        }

        while (tableauIncl.length < 5) {
          const rdm = Math.floor(Math.random() * listeInclinaisons.length);
          const position_id = listeSets[tableauPos[tableauIncl.length]].position_id;
          const inclinaison_id = listeInclinaisons[rdm].inclinaison_id;

          const schema3Response = await fetch(`http://localhost:4000/schema3/getByIds/${position_id}/${inclinaison_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!schema3Response.ok) {
            console.error('Failed to fetch schema3');
            continue;
          }

          const schema3Data = await schema3Response.json();
          if (schema3Data.Succes && schema3Data.Schemas3.length > 0) {
            const schema4Response = await fetch(`http://localhost:4000/schema4/getByIds/${position_id}/${inclinaison_id}`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            });

            if (!schema4Response.ok) {
              console.error('Failed to fetch schema4');
              continue;
            }

            const schema4Data = await schema4Response.json();
            if (schema4Data.Succes && schema4Data.Schemas4.length > 0) {
              tableauIncl.push(rdm);
            }
          }
        }

        setExercice({
          question1: { position: listeSets[tableauPos[0]], inclinaison: listeInclinaisons[tableauIncl[0]] },
          reponse1: { position: {}, inclinaison: {} },
          question2: { position: listeSets[tableauPos[1]], inclinaison: listeInclinaisons[tableauIncl[1]] },
          reponse2: { position: {}, inclinaison: {} },
          question3: { position: listeSets[tableauPos[2]], inclinaison: listeInclinaisons[tableauIncl[2]] },
          reponse3: { position: {}, inclinaison: {} },
          question4: { position: listeSets[tableauPos[3]], inclinaison: listeInclinaisons[tableauIncl[3]] },
          reponse4: { position: {}, inclinaison: {} },
          question5: { position: listeSets[tableauPos[4]], inclinaison: listeInclinaisons[tableauIncl[4]] },
          reponse5: { position: {}, inclinaison: {} },
        });

        setSuccess(true);
      };

      generateExercice();
    }
  }, [listeSets, listeInclinaisons]);

  console.log('ListeSets : ', listeSets);
  console.log('ListeInclinaisons : ', listeInclinaisons);
  console.log('Exercice : ', exercice);

  const onSubmit = methods.handleSubmit(data => {
    console.log(data)
    methods.reset()
    setSuccess(true)
  })
  return (
    <>
      <h1>Exercice X</h1>
      <h2>Question X/X</h2>
      <Button onClick={onSubmit} text="Finir Question" color="red" hoverColor="red" />
      <div className="grid md:grid-cols-6">
        <Cas />
        <Cas />
        <Cas />
        <Cas />
        <Cas />
        <Cas />
      </div>
      <div>
        <h3>Reponse</h3>
        <div className="rectangle" />
        <ExerciceContinu />
      </div>
      <Button onClick={onSubmit} text="Cas suivant" color="green" hoverColor="green" />
    </>
  );
}
