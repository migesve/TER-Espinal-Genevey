import { useState, useEffect } from 'react';

export const Schema4 = () => {
    const [listeSchema4Pos1, setListeSchema4Pos1] = useState([]);
    const [listeSchema4Pos2, setListeSchema4Pos2] = useState([]);
    const [error, setError] = useState(null);
    const [index, setIndex] = useState(0);
    const [listeSchema4selectionnee, setListeSchema4selectionnee] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = [1, 2].map(i =>
                    fetch(`http://localhost:4000/schema4/getByIncl/${i}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch schema4 data');
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
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const positionSuivante = () => {
        setIndex(prevIndex => (prevIndex + 1) % listeSchema4selectionnee.length);
    };

    const positionPrecedante = () => {
        setIndex(prevIndex => (prevIndex - 1 + listeSchema4selectionnee.length) % listeSchema4selectionnee.length);
    };

    const inclinaisonSuivante = () => {
        setListeSchema4selectionnee(prevList => (prevList === listeSchema4Pos1 ? listeSchema4Pos2 : listeSchema4Pos1));
        //setIndex(0);
    };

    const inclinaisonPrecedante = () => {
        setListeSchema4selectionnee(prevList => (prevList === listeSchema4Pos1 ? listeSchema4Pos2 : listeSchema4Pos1));
        //setIndex(0);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="flex flex-col items-center gap-1 p-4 m-5 border border-gray-200">
            <h4 className="font-semibold text-xl">Schéma réaliste</h4>
            {listeSchema4selectionnee.length > 0 && (
                <div className="flex items-center">
                    <div className="flex flex-col items-center gap-1">
                        <img width={50} height={50} 
                            src='src/images/icons/flecheHaut.png' alt='flecheHaut'
                            className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={inclinaisonPrecedante}
                        />
                        <p>Inclinaisons</p>
                        <img width={50} height={50} 
                            src='src/images/icons/flecheBas.png' alt='flecheBas'
                            className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={inclinaisonSuivante}
                        />
                    </div>
                    <img src={listeSchema4selectionnee[index].image_path} alt={listeSchema4selectionnee[index].image_name} className="mx-4" />
                    <div className="flex flex-col items-center gap-1">
                        <img width={50} height={50} 
                            src='src/images/icons/flecheHaut.png' alt='flecheHaut'
                            className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={positionPrecedante}
                        />
                        <p>Positions</p>
                        <img width={50} height={50} 
                            src='src/images/icons/flecheBas.png' alt='flecheBas'
                            className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={positionSuivante}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};