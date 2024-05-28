import { useEffect, useState } from "react";
import { Cas } from "../../Components/Cas";
import { Button } from "../../Components/Button";
import { useForm } from "react-hook-form";
import { randomNumberBetween } from "@mui/x-data-grid/internals";
import { ExerciceContinu } from "../../Components/ExerciceContinu";
import { Schema3 } from "../../Components/Schema3";
import { Schema4 } from "../../Components/Schema4";


export function Exercice() {

  const methods = useForm()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null);
  const [listeSets, setListeSets] = useState([]);
  const [listeInclinaisons, setListeInclinaisons] = useState([]);
  const [tableauIncl, setTableauIncl] = useState([]);
  const [tableauPos, setTableauPos] = useState([]);
  const [ennonce, setEnnonce] = useState(null);
  const [view, setView] = useState('');

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

  // console.log('ListeSets : ', listeSets);
  // console.log('ListeInclinaisons : ', listeInclinaisons);
  // console.log('TableauPos : ', tableauPos);
  // console.log('TableauIncl : ', tableauIncl);
  // console.log('Ennonce : ', ennonce);

  const choixEnnonce = () => {
    const rdm = Math.floor(Math.random() * 6);
    switch (rdm) {
      case 0:
        setEnnonce({representation: 'Nom'});
        setView('Nom');
        break;
      case 1:
        setEnnonce({representation:'Sigle'});
        setView('Sigle');
        break;
      case 2:
        setEnnonce({representation:'Schéma très simplifié', angle: null});
        setView('Schéma très simplifié');
        break;
      case 3:
        setEnnonce({representation:'Schéma simplifié', angle: null});
        setView('Schéma simplifié');
        break;
      case 4:
        setEnnonce({representation:'Schéma réaliste', angle: null});
        setView('Schéma réaliste');
        break;
      case 5:
        setEnnonce({representation:'Schéma très réaliste', angle: null});
        setView('Schéma très réaliste');
        break;
      default:
        setEnnonce({representation:'Nom'});
        setView('Nom');
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
        <Cas text="Nom" color={ennonce&&ennonce.representation==="Nom" ? 'text-green-600 border-green-600' : ''} onClick={()=>setView("Nom")}/>
        <Cas text="Sigle" color={ennonce&&ennonce.representation==="Sigle" ? 'text-green-600 border-green-600' : ''} onClick={()=>setView("Sigle")}/>
        <Cas text="Schéma très simplifié" color={ennonce&&ennonce.representation==="Schéma très simplifié" ? 'text-green-600 border-green-600' : ''} onClick={()=>setView("Schéma très simplifié")}/>
        <Cas text="Schéma simplifié" color={ennonce&&ennonce.representation==="Schéma simplifié" ? 'text-green-600 border-green-600' : ''} onClick={()=>setView("Schéma simplifié")}/>
        <Cas text="Schéma réaliste" color={ennonce&&ennonce.representation==="Schéma réaliste" ? 'text-green-600 border-green-600' : ''} onClick={()=>setView("Schéma réaliste")}/>
        <Cas text="Schéma très réaliste" color={ennonce&&ennonce.representation==="Schéma très réaliste" ? 'text-green-600 border-green-600' : ''} onClick={()=>setView("Schéma très réaliste")}/>
      </div>
      <div>
        <h3>Reponse</h3>
        <div className="rectangle">
          {(view === 'Nom')? <p></p>:"" }
          {(view === 'Sigle')? <p></p>:"" }
          {(view === 'Schéma très simplifié')? <ExerciceContinu />:"" }
          {(view === 'Schéma simplifié')? <ExerciceContinu/>:"" }
          {(view === 'Schéma réaliste')? <Schema3/>:"" }
          {(view === 'Schéma très réaliste')? <Schema4/>:"" }
        </div>
        
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
