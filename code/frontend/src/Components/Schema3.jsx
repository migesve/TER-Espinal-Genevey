import { useState, useEffect, useContext } from "react";
import { GrUp, GrDown } from "react-icons/gr";
import { Button } from "./Button";
import { ContextReponses } from "../Pages/User/exercice";

export function Schema3({ display, type }) {
  const [listeSchema3Pos1, setListeSchema3Pos1] = useState([]);
  const [listeSchema3Pos2, setListeSchema3Pos2] = useState([]);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [listeSchema3selectionnee, setListeSchema3selectionnee] = useState([]);
  const [enonceSchema3, setEnonceSchema3] = useState(null);
  const [loadingEnonceSchema3, setLoadingEnonceSchema3] = useState(true);

  const context = useContext(ContextReponses);
  const enonce = context.enonce;
  console.log(enonce);
  const reponseSchema3 = context.reponseSchema3 || "";
  const setReponseSchema3 = context.setReponseSchema3 || (() => {});
  const setSchema3EstModifie = context.setSchema3EstModifie || (() => {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          enonce?.representation !== "Schéma en vue antérieure" &&
          !enonce?.retour
        ) {
          const promises = [1, 2].map((i) =>
            fetch(`http://localhost:4000/schema3/getByIncl/${i}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }).then((response) => {
              if (!response.ok) {
                throw new Error(
                  `Failed to fetch schema3 data: ${response.statusText}`
                );
              }
              return response.json();
            })
          );
          const [data1, data2] = await Promise.all(promises);
          if (data1.status || data2.status) {
            setError(data1.status || data2.status);
            return;
          }
          setListeSchema3Pos1(data1.Schemas3);
          setListeSchema3Pos2(data2.Schemas3);
          setListeSchema3selectionnee(data1.Schemas3);
        } else if (enonce?.retour && type === "reponse") {
          if (!enonce.answersValues) {
            enonce.answersValues = {};
          }
          if (!enonce.answersValues.reponseSchema3) {
            enonce.answersValues.reponseSchema3 = {
              position_id: enonce?.position || 1,
              inclinaison_id: enonce?.inclinaison || 1,
              image_name: enonce?.image_name || "",
              image_path: enonce?.image_path || "",
            };
          }
          const response = await fetch(
            `http://localhost:4000/schema3/getByIds/${enonce.answersValues.reponseSchema3.position_id}/${enonce.answersValues.reponseSchema3.inclinaison_id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch enonce data: ${response.statusText}`
            );
          }
          const data = await response.json();
          if (data.status) {
            setError(data.status);
            return;
          }
          setEnonceSchema3(
            data.Schemas3[Math.floor(Math.random() * data.Schemas3.length)]
          );
        } else {
          const response = await fetch(
            `http://localhost:4000/schema3/getByIds/${enonce.position}/${enonce.inclinaison}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch enonce data: ${response.statusText}`
            );
          }
          const data = await response.json();
          if (data.status) {
            setError(data.status);
            return;
          }
          setEnonceSchema3(
            data.Schemas3[Math.floor(Math.random() * data.Schemas3.length)]
          );
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoadingEnonceSchema3(false);
      }
    };

    fetchData();
  }, [enonce?.position, enonce?.inclinaison, enonce, type]);

  useEffect(() => {
    setReponseSchema3(listeSchema3selectionnee[index]);
    setSchema3EstModifie((prev) => prev + 1);
  }, [
    index,
    listeSchema3selectionnee,
    setReponseSchema3,
    setSchema3EstModifie,
  ]);

  const positionSuivante = () => {
    setIndex((prevIndex) => (prevIndex + 1) % listeSchema3selectionnee.length);
  };

  const positionPrecedante = () => {
    setIndex(
      (prevIndex) =>
        (prevIndex - 1 + listeSchema3selectionnee.length) %
        listeSchema3selectionnee.length
    );
  };

  const inclinaisonSuivante = () => {
    setListeSchema3selectionnee((prevList) => {
      const newList =
        prevList === listeSchema3Pos1 ? listeSchema3Pos2 : listeSchema3Pos1;
      if (index >= newList.length || index < 0) {
        setIndex(0);
      }
      return newList;
    });
  };

  const inclinaisonPrecedante = () => {
    setListeSchema3selectionnee((prevList) => {
      const newList =
        prevList === listeSchema3Pos1 ? listeSchema3Pos2 : listeSchema3Pos1;
      if (index >= newList.length || index < 0) {
        setIndex(0);
      }
      return newList;
    });
  };

  if (loadingEnonceSchema3) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (
    (enonce?.representation === "Schéma en vue antérieure" &&
      enonceSchema3) ||
    enonce?.retour
  ) {
    return (
      <section className={`${display} flex-col items-center gap-1 p-4 m-5`}>
        <h4 className="font-semibold text-xl">Schéma en vue antérieure</h4>
        <div className="flex items-center">
          <div className="relative w-96 h-96 mx-auto ">
            <img
              src="src/images/schema3/bassinSchema3.PNG"
              alt="Bassin"
              className="absolute mx-4 h-52"
            />
            {enonceSchema3 && (
              <img
                src={enonceSchema3.image_path}
                alt={enonceSchema3.image_name}
                className="absolute mx-4 h-52"
              />
            )}
          </div>
        </div>
      </section>
    );
  } else if (
    enonce?.retour === true &&
    enonce?.answersValues?.reponseSchema3
  ) {
    return (
      <section className={`${display} flex-col items-center gap-1 p-4 m-5`}>
        <h4 className="font-semibold text-xl">Schéma en vue antérieure</h4>
        <div className="flex items-center">
          <div className="relative w-96 h-96 mx-auto ">
            <img
              src="src/images/schema3/bassinSchema3.PNG"
              alt="Bassin"
              className="absolute mx-4 h-52"
            />
            {enonce.answersValues.reponseSchema3.image_path && (
              <img
                src={enonce.answersValues.reponseSchema3.image_path}
                alt={enonce.answersValues.reponseSchema3.image_name}
                className="absolute mx-4 h-52"
              />
            )}
          </div>
        </div>
      </section>
    );
  } else if (listeSchema3selectionnee.length > 0) {
    return (
      <section className={`${display} flex-col items-center gap-1 p-4 m-5`}>
        <h4 className="font-semibold text-xl">Schéma en vue antérieure</h4>
        <div className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <Button
              hoverColor="hover:bg-amber-800"
              color="bg-amber-600"
              icon={GrUp}
              onClick={inclinaisonPrecedante}
            />
            <p>Inclinaisons</p>
            <Button
              hoverColor="hover:bg-amber-800"
              color="bg-amber-600"
              icon={GrDown}
              onClick={inclinaisonSuivante}
            />
          </div>
          <div className="relative w-96 h-96 mx-auto ">
            <img
              src="src/images/schema3/bassinSchema3.PNG"
              alt="Bassin"
              className="absolute mx-4 h-96"
            />
            {listeSchema3selectionnee[index]?.image_path && (
              <img
                src={listeSchema3selectionnee[index].image_path}
                alt={listeSchema3selectionnee[index].image_name}
                className="absolute mx-4 h-96"
              />
            )}
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button
              hoverColor="hover:bg-amber-800"
              color="bg-amber-600"
              icon={GrUp}
              onClick={positionPrecedante}
            />
            <p>Positions</p>
            <Button
              hoverColor="hover:bg-amber-800"
              color="bg-amber-600"
              icon={GrDown}
              onClick={positionSuivante}
            />
          </div>
        </div>
      </section>
    );
  } else {
    return <div>No schema available</div>;
  }
}
