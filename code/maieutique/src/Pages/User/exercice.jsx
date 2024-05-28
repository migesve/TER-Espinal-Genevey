import { useEffect, useState } from "react";
import { Cas } from "../../Components/Cas";
import { Button } from "../../Components/Button";
import { set, useForm } from "react-hook-form";
import { randomNumberBetween } from "@mui/x-data-grid/internals";
import { ExerciceContinu } from "../../Components/ExerciceContinu";


export function Exercice() {

  const methods = useForm()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null);
  const [listeSets, setListeSets] = useState([]);
  const [listeInclinaisons, setListeInclinaisons] = useState([]);
  const [tableauIncl, setTableauIncl] = useState([]);
  const [tableauPos, setTableauPos] = useState([]);
  const [ennonce, setEnnonce] = useState('');

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
        const newTableauPos = [];
        const newTableauIncl = [];

        while (newTableauPos.length < 5) {
          const rdm = Math.floor(Math.random() * listeSets.length);
          if (!newTableauPos.includes(rdm)) {
            newTableauPos.push(rdm);
          }
        }

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
                newTableauIncl.push(rdm);
                found = true;
              }
            }
          }
        }

        setTableauPos(newTableauPos);
        setTableauIncl(newTableauIncl);
        setSuccess(true);
        choixEnnonce();
      };

      generateExercice();
    }
  }, [listeSets, listeInclinaisons]);

  console.log('ListeSets : ', listeSets);
  console.log('ListeInclinaisons : ', listeInclinaisons);
  console.log('TableauPos : ', tableauPos);
  console.log('TableauIncl : ', tableauIncl);
  console.log('Ennonce : ', ennonce);

  const choixEnnonce = () => {
    const rdm = Math.floor(Math.random() * 6);
    switch (rdm) {
      case 0:
        setEnnonce('Nom');
        break;
      case 1:
        setEnnonce('Sigle');
        break;
      case 2:
        setEnnonce('Schéma très simplifié');
        break;
      case 3:
        setEnnonce('Schéma simplifié');
        break;
      case 4:
        setEnnonce('Schéma réaliste');
        break;
      case 5:
        setEnnonce('Schéma très réaliste');
        break;
      default:
        setEnnonce('Nom');
        break;
    }
  }

  const onSubmit = methods.handleSubmit(data => {
    console.log(data)
    methods.reset()
    setSuccess(true)
  })
  return (
    <>
      <h1>Exercice X</h1>
      <h2>Question X/X</h2>
      <Button
        onClick={onSubmit}
        text="Finir Question"
        color="red"
        hoverColor="red"
      />
      <div className="grid md:grid-cols-6">
        <Cas text="Nom" color={ennonce==="Nom" ? 'text-green-600 border-green-600' : ''}/>
        <Cas text="Sigle" color={ennonce==="Sigle" ? 'text-green-600 border-green-600' : ''}/>
        <Cas text="Schéma très simplifié" color={ennonce==="Schéma très simplifié" ? 'text-green-600 border-green-600' : ''}/>
        <Cas text="Scéma simplifié" color={ennonce==="Scéma simplifié" ? 'text-green-600 border-green-600' : ''}/>
        <Cas text="Schéma réaliste" color={ennonce==="Schéma réaliste" ? 'text-green-600 border-green-600' : ''}/>
        <Cas text="schéma très réaliste" color={ennonce==="schéma très réaliste" ? 'text-green-600 border-green-600' : ''}/>
      </div>
      <div>
        <h3>Reponse</h3>
        <ExerciceContinu />
      </div>
      <div className="flex justify-between">
        <Button
          onClick={onSubmit}
          text="Representation precedente"
          color="bg-green-600"
          hoverColor="hover:bg-green-800"
        />
        <Button
          onClick={onSubmit}
          text="Representation suivante"
          color="bg-green-600"
          hoverColor="hover:bg-green-800"
        />
      </div>
    </>
  );
}
