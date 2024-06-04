import { useState, useEffect } from 'react';
import { GrUp, GrDown } from 'react-icons/gr';
import { Button } from './Button';

export function Schema3({ sendToParent, display, estEnnonce, position, inclinaison }) {
    const [listeSchema3Pos1, setListeSchema3Pos1] = useState([]);
    const [listeSchema3Pos2, setListeSchema3Pos2] = useState([]);
    const [error, setError] = useState(null);
    const [index, setIndex] = useState(0);
    const [listeSchema3selectionnee, setListeSchema3selectionnee] = useState([]);
    const [ennonce, setEnnonce] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                if (estEnnonce === "false") {
                    const promises = [1, 2].map(i =>
                        fetch(`http://localhost:4000/schema3/getByIncl/${i}`, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        }).then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to fetch schema3 data');
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
                    const response = await fetch(`http://localhost:4000/schema3/getByIds/${position}/${inclinaison}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch ennonce data');
                    }
                    const data = await response.json();
                    if (data.status) {
                        setError(data.status);
                        return;
                    }

                    setEnnonce(data.Schemas3[Math.floor(Math.random() * data.Schemas3.length )]);
                }
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            }
        };

        fetchData();

    }, [position, inclinaison, estEnnonce]);

    useEffect(() => {
        sendToParent({ representation: "Schéma3", choix: listeSchema3selectionnee[index] });
    }, [index, listeSchema3selectionnee]);

    const positionSuivante = () => {
        setIndex(prevIndex => (prevIndex + 1) % listeSchema3selectionnee.length);
    };

    const positionPrecedante = () => {
        setIndex(prevIndex => (prevIndex - 1 + listeSchema3selectionnee.length) % listeSchema3selectionnee.length);
    };

    const inclinaisonSuivante = () => {
        setListeSchema3selectionnee(prevList => {
            const newList = (prevList === listeSchema3Pos1 ? listeSchema3Pos2 : listeSchema3Pos1);
            if (index >= newList.length || index < 0) {
                setIndex(0);
            }
            return newList;
        });
    };

    const inclinaisonPrecedante = () => {
        setListeSchema3selectionnee(prevList => {
            const newList = (prevList === listeSchema3Pos1 ? listeSchema3Pos2 : listeSchema3Pos1);
            if (index >= newList.length || index < 0) {
                setIndex(0);
            }
            return newList;
        });
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (ennonce !== null) {
        return (
            <section className={`${display} flex-col items-center gap-1 p-4 m-5 border border-gray-200`}>
                <h4 className="font-semibold text-xl">Schéma réaliste</h4>
                <div className="flex items-center">
                    <img src={ennonce.image_path} alt={ennonce.image_name} className="mx-4" />
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