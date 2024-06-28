import { useState, useEffect, useContext } from "react";
import { GrUp, GrDown } from "react-icons/gr";
import { Button } from "./Button";
import { ContextReponses } from "../Pages/User/exercice";

export function Schema4({ display, type }) {
  const [listeSchema4Pos1, setListeSchema4Pos1] = useState([]);
  const [listeSchema4Pos2, setListeSchema4Pos2] = useState([]);
  const [listeSchema4Pos3, setListeSchema4Pos3] = useState([]);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [listeSchema4selectionnee, setListeSchema4selectionnee] = useState([]);
  const [enonceSchema4, setEnonceSchema4] = useState(null);
  const [loadingEnonceSchema4, setLoadingEnonceSchema4] = useState(true);

  const context = useContext(ContextReponses);
  const enonce = context.enonce;
  const reponseSchema4 = context.reponseSchema4 || "";
  const setReponseSchema4 = context.setReponseSchema4 || (() => {});
  const setSchema4EstModifie = context.setSchema4EstModifie || (() => {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          enonce?.representation !== "Schéma en vue transversale" &&
          !enonce?.retour
        ) {
          const promises = [1, 2, 3].map((i) =>
            fetch(`http://localhost:4000/schema4/getByIncl/${i}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }).then((response) => {
              if (!response.ok) {
                throw new Error(
                  `Failed to fetch schema4 data: ${response.statusText}`
                );
              }
              return response.json();
            })
          );
          const [data1, data2, data3] = await Promise.all(promises);
          if (data1.status || data2.status || data3.status) {
            setError(data1.status || data2.status || data3.status);
            return;
          }
          setListeSchema4Pos1(data1.Schemas4);
          setListeSchema4Pos2(data2.Schemas4);
          setListeSchema4Pos3(data3.Schemas4);
          setListeSchema4selectionnee(data1.Schemas4);
        } else if (enonce?.retour && type === "reponse") {
          if (!enonce.answersValues) {
            enonce.answersValues = {};
          }
          if (!enonce.answersValues.reponseSchema4) {
            enonce.answersValues.reponseSchema4 = {
              position_id: enonce?.position || 1,
              inclinaison_id: enonce?.inclinaison || 1,
              image_name: enonce?.image_name || "",
              image_path: enonce?.image_path || "",
            };
          }
          const response = await fetch(
            `http://localhost:4000/schema4/getByIds/${enonce.answersValues.reponseSchema4.position_id}/${enonce.answersValues.reponseSchema4.inclinaison_id}`,
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
          setEnonceSchema4(
            data.Schemas4[Math.floor(Math.random() * data.Schemas4.length)]
          );
        } else {
          const response = await fetch(
            `http://localhost:4000/schema4/getByIds/${enonce.position}/${enonce.inclinaison}`,
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
          setEnonceSchema4(
            data.Schemas4[Math.floor(Math.random() * data.Schemas4.length)]
          );
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoadingEnonceSchema4(false);
      }
    };

    fetchData();
  }, [enonce?.position, enonce?.inclinaison, enonce, type]);

  useEffect(() => {
    setReponseSchema4(listeSchema4selectionnee[index]);
    setSchema4EstModifie((prev) => prev + 1);
  }, [
    index,
    listeSchema4selectionnee,
    setReponseSchema4,
    setSchema4EstModifie,
  ]);

  const positionSuivante = () => {
    setIndex((prevIndex) => (prevIndex + 1) % listeSchema4selectionnee.length);
  };

  const positionPrecedante = () => {
    setIndex(
      (prevIndex) =>
        (prevIndex - 1 + listeSchema4selectionnee.length) %
        listeSchema4selectionnee.length
    );
  };

  const inclinaisonSuivante = () => {
    setListeSchema4selectionnee((prevList) => {
      const newList =
        prevList === listeSchema4Pos1 ? listeSchema4Pos2 : (prevList === listeSchema4Pos2 ? listeSchema4Pos3 : listeSchema4Pos1);
      if (index >= newList.length || index < 0) {
        setIndex(0);
      }
      return newList;
    });
  };

  const inclinaisonPrecedante = () => {
    setListeSchema4selectionnee((prevList) => {
      const newList =
        prevList === listeSchema4Pos1 ? listeSchema4Pos3 : (prevList === listeSchema4Pos2 ? listeSchema4Pos1 : listeSchema4Pos2);
      if (index >= newList.length || index < 0) {
        setIndex(0);
      }
      return newList;
    });
  };

  if (loadingEnonceSchema4) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (
    (enonce?.representation === "Schéma en vue transversale" &&
      enonceSchema4) ||
    enonce?.retour
  ) {
    return (
      <section className={`${display} flex flex-col items-center gap-1`}>
        <h4 className="font-semibold text-xl">Schéma en vue transversale</h4>
        <div className="flex items-center justify-center">
          <div className="relative mx-auto w-52 h-52 flex justify-center items-center">
            <img
              src="src/images/schema4/bassinSchema4.PNG"
              alt="Bassin"
              className="absolute h-52 -rotate-45"
            />
            {enonceSchema4 && (
              <img
                src={enonceSchema4.image_path}
                alt={enonceSchema4.image_name}
                className="absolute h-52 -rotate-45"
              />
            )}
          </div>
        </div>
      </section>
    );
  } else if (
    enonce?.retour === true &&
    enonce?.answersValues?.reponseSchema4
  ) {
    return (
      <section className={`${display} flex flex-col items-center gap-1`}>
        <h4 className="font-semibold text-xl">Schéma en vue transversale</h4>
        <div className="flex items-center justify-center">
          <div className="relative mx-auto w-52 h-52 flex justify-center items-center">
            <img
              src="src/images/schema4/bassinSchema4.PNG"
              alt="Bassin"
              className="absolute h-52 -rotate-45"
            />
            {enonce.answersValues.reponseSchema4.image_path && (
              <img
                src={enonce.answersValues.reponseSchema4.image_path}
                alt={enonce.answersValues.reponseSchema4.image_name}
                className="absolute h-52 -rotate-45"
              />
            )}
          </div>
        </div>
      </section>
    );
  } else if (listeSchema4selectionnee.length > 0) {
    return (
      <section className={`${display} flex flex-col items-center gap-1`}>
        <h4 className="font-semibold text-xl">Schéma en vue transversale</h4>
        <div className="flex items-center justify-center">
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
          <div className="relative w-96 h-72 flex justify-center items-center">
            <img
              src="src/images/schema4/bassinSchema4.PNG"
              alt="Bassin"
              className="absolute h-72 -rotate-45"
            />
            {listeSchema4selectionnee[index]?.image_path && (
              <img
                src={listeSchema4selectionnee[index].image_path}
                alt={listeSchema4selectionnee[index].image_name}
                className="absolute h-72 -rotate-45"
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
