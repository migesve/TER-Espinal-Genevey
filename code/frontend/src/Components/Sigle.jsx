import { useState, useEffect, useContext } from 'react';
import { ContextReponses } from '../Pages/User/exercice';

export function Sigle({ display }) {
    const [error, setError] = useState(null);
    const [ennonceSigle, setEnnonceSigle] = useState('');
    const [reponse, setReponse] = useState('');
    const { ennonce, reponseSigle, setReponseSigle } = useContext(ContextReponses);

    useEffect(() => {
        setEnnonceSigle(ennonce.sigle+' '+ennonce.label);
        setReponse('');
    }, [ennonce]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (ennonce?.representation === "Sigle") {
        return (
            <section className={`${display} flex-col items-center gap-1 p-4 m-5 border border-gray-200`}>
                <h4 className="font-semibold text-xl">Sigle de la position</h4>
                <div className="flex items-center">
                    <p>{ennonceSigle}</p>
                </div>
            </section>
        );
    } else {
        return (
            <section className={`${display} flex-col items-center gap-1 p-4 m-5 border border-gray-200`}>
                <h4 className="font-semibold text-xl">Sigle de la position</h4>
                    <div className="flex items-center">
                        <input className="mx-4" 
                            value={reponse}
                            onChange={e => {
                                setReponse(e.target.value);
                                setReponseSigle(e.target.value);
                                }
                            }
                            />
                    </div>
            </section>
        );
    }
};