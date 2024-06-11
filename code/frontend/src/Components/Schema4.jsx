import { useState, useEffect, useContext } from "react";
import { GrUp, GrDown } from "react-icons/gr";
import { Button } from "./Button";
import { ContextReponses } from "../Pages/User/exercice";

export function Schema4({ display }) {
  const [listeSchema4Pos1, setListeSchema4Pos1] = useState([]);
  const [listeSchema4Pos2, setListeSchema4Pos2] = useState([]);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [listeSchema4selectionnee, setListeSchema4selectionnee] = useState([]);
  const [ennonceSchema4, setEnnonceSchema4] = useState(null);
  const { ennonce, reponseSchema4, setReponseSchema4 } =
    useContext(ContextReponses);
  const [loadingEnnonceSchema3, setLoadingEnnonceSchema3] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (ennonce?.representation !== "Schéma très réaliste") {
          const promises = [1, 2].map((i) =>
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
          const [data1, data2] = await Promise.all(promises);
          if (data1.status || data2.status) {
            setError(data1.status || data2.status);
            return;
          }
          setListeSchema4Pos1(data1.Schemas4);
          setListeSchema4Pos2(data2.Schemas4);
          setListeSchema4selectionnee(data1.Schemas4);
        } else {
          const response = await fetch(
            `http://localhost:4000/schema4/getByIds/${ennonce.position}/${ennonce.inclinaison}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch ennonce data");
          }
          const data = await response.json();
          if (data.status) {
            setError(data.status);
            return;
          }
          console.log(data);
          setEnnonceSchema4(
            data.Schemas4[Math.floor(Math.random() * data.Schemas4.length)]
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
  }, [ennonce?.position, ennonce?.inclinaison, ennonce]);

  useEffect(() => {
    setReponseSchema4(listeSchema4selectionnee[index]);
  }, [index, listeSchema4selectionnee]);

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
        prevList === listeSchema4Pos1 ? listeSchema4Pos2 : listeSchema4Pos1;
      if (index >= newList.length || index < 0) {
        setIndex(0);
      }
      return newList;
    });
  };

  const inclinaisonPrecedante = () => {
    setListeSchema4selectionnee((prevList) => {
      const newList =
        prevList === listeSchema4Pos1 ? listeSchema4Pos2 : listeSchema4Pos1;
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

  if (ennonce.representation === "Schéma très réaliste" && ennonceSchema4) {
    return (
      <section
        className={`${display} flex-col items-center gap-1 p-4 m-5 border border-gray-200`}
      >
        <h4 className="font-semibold text-xl">Schéma réaliste</h4>
        <div className="flex items-center">
          <img
            src={ennonceSchema4.image_path}
            alt={ennonceSchema4.image_name}
            className="mx-4"
          />
        </div>
      </section>
    );
  } else if (listeSchema4selectionnee.length > 0) {
    return (
      <section
        className={`${display} flex-col items-center gap-1 p-4 m-5 border border-gray-200`}
      >
        <h4 className="font-semibold text-xl">Schéma très réaliste</h4>
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
          <img
            src={listeSchema4selectionnee[index].image_path}
            alt={listeSchema4selectionnee[index].image_name}
            className="mx-4"
          />
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
