import { useState, useEffect, useContext } from 'react';

export function NomPosition({ display }) {
    const [error, setError] = useState(null);
    const [ennonceNom, setEnnonceNom] = useState('');
    const [reponse, setReponse] = useState('');
    const { ennonce, reponseNom, setReponseNom } = useContext(ContextReponses);

    useEffect(() => {
        setEnnonceNom(position+' '+inclinaison);
        setReponse('');
    }, [position, inclinaison, estEnnonce]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (estEnnonce === "true") {
        return (
            <section className={`${display} flex-col items-center gap-1 p-4 m-5 border border-gray-200`}>
                <h4 className="font-semibold text-xl">Nom de la position</h4>
                <div className="flex items-center">
                    <p>{ennonceNom}</p>
                </div>
            </section>
        );
    } else {
        return (
            <section className={`${display} flex-col items-center gap-1 p-4 m-5 border border-gray-200`}>
                <h4 className="font-semibold text-xl">Nom de la position</h4>
                    <div className="flex items-center">
                        <input className="mx-4" 
                            value={reponse}
                            onChange={e => {
                                setReponse(e.target.value);
                                sendToParent({ representation: "Nom", choix: e.target.value });
                                }
                            }
                            />
                    </div>
            </section>
        );
    }
};