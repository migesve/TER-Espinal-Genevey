import { useEffect,useState } from "react";

export function Maieutique() {
  const [cas, setCas] = useState([]);
  const [formValues, setFormValues] = useState({
    nomComplet: '',
    abbreviation: '',
    angle1: '',
    angle2: '',
    inclinaisonTete: '',
    description: ''
  });

  useEffect(() => {
    console.log("Cas", cas);
  }, [cas]);

  const handleChange = (event) => { // handles the change of the input fields and updates the formValues state
    const { name, value } = event.target;
    setFormValues({...formValues, [name]: value});
  };

  const handleSubmit = (event) => { // handles the form submission and adds the new case to the cas state array 
    event.preventDefault();
    // console.log("Sauvegardé");
    // console.log(formValues.nomComplet);
    const casToAddToState = {
      nomComplet: formValues.nomComplet,
      abreviation: formValues.abbreviation,
      angle1: formValues.angle1,
      angle2: formValues.angle2,
      inclinaisonTete: formValues.inclinaisonTete,
      description: formValues.description,
    };
    //const casToAdd = [...cas];
    setCas([...cas,casToAddToState]);

    // setTimeout(() => {
    //   console.log(cas);
    // }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="nomComplet"
          value={formValues.nomComplet}
          onChange={handleChange}
          placeholder="Nom complet"
        />
        <input
          name="abbreviation"
          value={formValues.abbreviation}
          onChange={handleChange}
          placeholder="Abreviation"
        />
        <input
          name="angle1"
          value={formValues.angle1}
          onChange={handleChange}
          placeholder="Angle 1"
        />
        <input
          name="angle2"
          value={formValues.angle2}
          onChange={handleChange}
          placeholder="Angle 2"
        />
        <input
          name="inclinaisonTete"
          value={formValues.inclinaisonTete}
          onChange={handleChange}
          placeholder="Inclinaison de la tête"
        />
        <input
          name="description"
          value={formValues.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button>Sauvegarder</button>
      </form>

      <div>
        <h2>Cas</h2>
        <ol>
          {cas.map((cas, index) => (
            <li key={index}>
              <div>{cas.nomComplet}</div>
              <div>{cas.abreviation}</div>
              <div>{cas.angle1}</div>
              <div>{cas.angle2}</div>
              <div>{cas.inclinaisonTete}</div>
              <div>{cas.description}</div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
