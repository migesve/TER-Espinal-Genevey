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
  const [ennonceSchema3, setEnnonceSchema3] = useState(null);
  const [loadingEnnonceSchema3, setLoadingEnnonceSchema3] = useState(true);

  const context = useContext(ContextReponses);
  const ennonce = context.ennonce;
  console.log(ennonce);
  const reponseSchema3 = context.reponseSchema3 || "";
  const setReponseSchema3 = context.setReponseSchema3 || (() => {});
  const setSchema3EstModifie = context.setSchema3EstModifie || (() => {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (ennonce?.representation !== "Schéma réaliste" && !ennonce?.retour) {
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
        } else if (ennonce?.retour && type === "reponse") {
          if (!ennonce.answersValues) {
            ennonce.answersValues = {};
          }
          if (!ennonce.answersValues.reponseSchema3) {
            ennonce.answersValues.reponseSchema3 = {
              position_id: ennonce?.position || 1,
              inclinaison_id: ennonce?.inclinaison || 1,
              image_name: ennonce?.image_name || "",
              image_path: ennonce?.image_path || "",
            };
          }
          const response = await fetch(
            `http://localhost:4000/schema3/getByIds/${ennonce.answersValues.reponseSchema3.position_id}/${ennonce.answersValues.reponseSchema3.inclinaison_id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch ennonce data: ${response.statusText}`
            );
          }
          const data = await response.json();
          if (data.status) {
            setError(data.status);
            return;
          }
          setEnnonceSchema3(
            data.Schemas3[Math.floor(Math.random() * data.Schemas3.length)]
          );
        } else {
          const response = await fetch(
            `http://localhost:4000/schema3/getByIds/${ennonce.position}/${ennonce.inclinaison}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch ennonce data: ${response.statusText}`
            );
          }
          const data = await response.json();
          if (data.status) {
            setError(data.status);
            return;
          }
          setEnnonceSchema3(
            data.Schemas3[Math.floor(Math.random() * data.Schemas3.length)]
          );
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoadingEnnonceSchema3(false);
      }
    };

    fetchData();
  }, [ennonce?.position, ennonce?.inclinaison, ennonce, type]);

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

  if (loadingEnnonceSchema3) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (ennonce?.representation === "Schéma réaliste" && ennonceSchema3) {
    return (
      <section
        className={`${display} flex-col items-center gap-1 p-4 m-5`}
      >
        <h4 className="font-semibold text-xl">Schéma réaliste</h4>
        <div className="flex items-center">
          <img
            src={ennonceSchema3.image_path}
            alt={ennonceSchema3.image_name}
            className="mx-4"
          />
        </div>
      </section>
    );
  } else if (
    ennonce?.retour === true &&
    ennonce?.answersValues?.reponseSchema3
  ) {
    return (
      <section
        className={`${display} flex-col items-center gap-1 p-4 m-5`}
      >
        <h4 className="font-semibold text-xl">Schéma réaliste</h4>
        <div className="flex items-center">
          <img
            src={ennonce.answersValues.reponseSchema3.image_path}
            alt={ennonce.answersValues.reponseSchema3.image_name}
            className="mx-4"
          />
        </div>
      </section>
    );
  } else if (listeSchema3selectionnee.length > 0) {
    return (
      <section
        className={`${display} flex-col items-center gap-1 p-4 m-5`}
      >
        <h4 className="font-semibold text-xl">Schéma réaliste</h4>
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
            <img
              src={listeSchema3selectionnee[index].image_path}
              alt={listeSchema3selectionnee[index].image_name}
              className="absolute mx-4 h-96"
            />
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
