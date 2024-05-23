import { useEffect,useState } from "react";
import { Cas } from "../../Components/Cas";
import { Button } from "../../Components/Button";
import { useForm } from "react-hook-form";
import { randomNumberBetween } from "@mui/x-data-grid/internals";


export function Exercice() {

  const methods = useForm()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null);
  
  
  const listeSets=fetch('http://localhost:4000/sets/getAll', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).catch((error) => {
      console.error('Error:', error);
      return;
  }).then((response) => {
      if(!response || !response.ok || response.status >= 400) {return;}
      //console.log('Success:', response);
      return response.json();
    }).then((data) => {
      console.log('Data : ',data);
      if(!data) {
        console.log('No data');
        return;
      }
      if(data.status){
        console.log('Error:', data.status);
        setError(data.status);
      }
      if(data.Succes){
        setSuccess(true);
        console.log('Sets : ',data.sets);
        return data.sets;
        //navigate('/');
      }
    });
  console.log('ListeSets : ',listeSets);

  let tableau = [];
  for (let i = 0; i < 5; i++) {
    let rdm =Math.random(0,listeSets.values.length-1);
    if(!tableau.includes(rdm)){
      tableau[i]=rdm;
    }else{i--;}
  }

  const exercice = {
    question1: {position : listeSets.values[tableau[0]], inclinaison : {}},
    reponse1: {position : {}, inclinaison : {}},
    question2: {position : listeSets[tableau[1]], inclinaison : {}},
    reponse2: {position : {}, inclinaison : {}},
    question3: {position : listeSets[tableau[2]], inclinaison : {}},
    reponse3: {position : {}, inclinaison : {}},
    question4: {position : listeSets[tableau[3]], inclinaison : {}},
    reponse4: {position : {}, inclinaison : {}},
    question5: {position : listeSets[tableau[4]], inclinaison : {}},
    reponse5: {position : {}, inclinaison : {}},
  }
  console.log(exercice);

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
      </div>
      <Button onClick={onSubmit} text="Cas suivant" color="green" hoverColor="green" />
    </>
  );
}
