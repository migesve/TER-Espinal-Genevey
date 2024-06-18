import { Input } from "./Input";
import { SelectDifficulte } from "./Select";
import { FormProvider, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { GrPlay } from "react-icons/gr";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { fetchDataSchema3, fetchDataSchema4 } from "../utils/fetchData";
import { choixEnonce } from "../utils/outils";

export const FormCreerExercice = ({ listeSets, listeInclinaisons }) => {
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [difficulte, setDifficulte] = useState(null);
  const navigate = useNavigate();
  const [enonce, setEnonce] = useState();
  const [indexQuestion] = useState(0);
  const [formData, setFormData] = useState(null);

  const onSubmit = methods.handleSubmit((data) => {
    setFormData(data);
    if (listeSets.length > 0 && listeInclinaisons.length > 0) {
      generateExercice();
    }
  });

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
          const schema3Data = await fetchDataSchema3(position_id, inclinaison_id);
          if (schema3Data.Succes && schema3Data.Schemas3.length > 0) {
            const schema4Data = await fetchDataSchema4(position_id, inclinaison_id);
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

    localStorage.setItem("tableauPos", JSON.stringify(newPos));
    localStorage.setItem("tableauIncl", JSON.stringify(newIncl));

    if (
      newPos.length > 0 &&
      listeSets.length > 0 &&
      newIncl.length > 0 &&
      listeInclinaisons.length > 0
    ) {
      choixEnonce(
        listeSets,
        listeInclinaisons,
        indexQuestion,
        setEnonce,
        difficulte
      );
    }
  };

  useEffect(() => {
    if (enonce) {
      navigate("/exercice", { state: { ...formData, enonce, difficulte, indexQuestion } });
    }
  }, [enonce, navigate, formData]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
        className="container w-96 m-auto my-10"
      >
        <div className="grid gap-5">
          <SelectDifficulte
            setDifficulte={setDifficulte}
          />
        </div>
        <div className="mt-5">
          {success && (
            <p className="font-semibold text-green-500 mb-5 flex items-center gap-1">
              <BsFillCheckSquareFill />
              Exercice généré
            </p>
          )}
          <Button onClick={onSubmit} text="Lancer Exercice" icon={GrPlay} />
        </div>
      </form>
    </FormProvider>
  );
};
