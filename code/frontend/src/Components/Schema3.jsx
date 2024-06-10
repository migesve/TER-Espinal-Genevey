import { useState, useEffect, useContext } from 'react';
import { GrUp, GrDown } from 'react-icons/gr';
import { Button } from './Button';
import { ContextReponses } from '../Pages/User/exercice';

export function Schema3({ display }) {
    const [listeSchema3Pos1, setListeSchema3Pos1] = useState([]);
    const [listeSchema3Pos2, setListeSchema3Pos2] = useState([]);
    const [error, setError] = useState(null);
    const [index, setIndex] = useState(0);
    const [listeSchema3selectionnee, setListeSchema3selectionnee] = useState([]);
    const [ennonceSchema3, setEnnonceSchema3] = useState(null);
    const { ennonce, reponseSchema3, setReponseSchema3 } = useContext(ContextReponses);

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (ennonce?.representation !== "Schéma réaliste") {
            const promises = [1, 2].map((i) =>
              fetch(`http://localhost:4000/schema3/getByIncl/${i}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              }).then((response) => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch schema3 data: ${response.statusText}`);
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
          } else {
            console.log(ennonce);
            const response = await fetch(
              `http://localhost:4000/schema3/getByIds/${ennonce.position}/${ennonce.inclinaison}`,
              {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              }
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch ennonce data: ${response.statusText}`);
            }
            const data = await response.json();
            if (data.status) {
              setError(data.status);
              return;
            }

            setEnnonceSchema3(
              data.Schemas3[Math.floor(Math.random() * data.Schemas3.length)]
            );

            
          console.log(data);
          console.log(ennonceSchema3);
          }
        } catch (err) {
          console.error("Error:", err);
          setError(err.message);
        }
      };

      fetchData();
    }, [ennonce?.position, ennonce?.inclinaison, ennonce]);

    useEffect(() => {
        setReponseSchema3(listeSchema3selectionnee[index]);
    }, [index, listeSchema3selectionnee]);

    const positionSuivante = () => {
        setIndex(prevIndex => (prevIndex + 1) % listeSchema3selectionnee.length);
    };

    const positionPrecedante = () => {
        setIndex(prevIndex => ((prevIndex - 1 + listeSchema3selectionnee.length) % listeSchema3selectionnee.length));
    };

    const inclinaisonSuivante = () => {
        setListeSchema3selectionnee(prevList => {
            const newList = (prevList === listeSchema3Pos1 ? listeSchema3Pos2 : listeSchema3Pos1);
            if (index >= newList.length || index < 0) {
                setIndex(0);
            }
            console.log(index);
            return newList;
        });
    };

    const inclinaisonPrecedante = () => {
        setListeSchema3selectionnee(prevList => {
            const newList = (prevList === listeSchema3Pos1 ? listeSchema3Pos2 : listeSchema3Pos1);
            if (index >= newList.length || index < 0) {
                setIndex(0);
            }
            console.log(index);
            return newList;
        });
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (ennonce.representation  === "Schéma réaliste") {
        return (
            <section className={`${display} flex-col items-center gap-1 p-4 m-5 border border-gray-200`}>
                <h4 className="font-semibold text-xl">Schéma réaliste</h4>
                <div className="flex items-center">
                    <img src={ennonceSchema3.image_path} alt={ennonceSchema3.image_name} className="mx-4" />
                </div>
            </section>
        );
    } else {
        return (
            <section className={`${display} flex-col items-center gap-1 p-4 m-5 border border-gray-200`}>
                <h4 className="font-semibold text-xl">Schéma réaliste</h4>
                {listeSchema3selectionnee.length > 0 && (
                    <div className="flex items-center">
                        <div className="flex flex-col items-center gap-1">
                            <Button hoverColor="hover:bg-amber-800" color="bg-amber-600" icon={GrUp} onClick={inclinaisonPrecedante} />
                            <p>Inclinaisons</p>
                            <Button hoverColor="hover:bg-amber-800" color="bg-amber-600" icon={GrDown} onClick={inclinaisonSuivante} />
                        </div>
                        <img src={listeSchema3selectionnee[index].image_path} alt={listeSchema3selectionnee[index].image_name} className="mx-4" />
                        <div className="flex flex-col items-center gap-1">
                            <Button hoverColor="hover:bg-amber-800" color="bg-amber-600" icon={GrUp} onClick={positionPrecedante} />
                            <p>Positions</p>
                            <Button hoverColor="hover:bg-amber-800" color="bg-amber-600" icon={GrDown} onClick={positionSuivante} />
                        </div>
                    </div>
                )}
            </section>
        );
    }
};
