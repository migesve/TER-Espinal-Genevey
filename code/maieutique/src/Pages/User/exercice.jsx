import { useEffect,useState } from "react";
import { Cas } from "../../Components/Cas";
import { Button } from "../../Components/Button";
import { useForm } from "react-hook-form";


export function Exercice() {

  const methods = useForm()
  const [success, setSuccess] = useState(false)

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
