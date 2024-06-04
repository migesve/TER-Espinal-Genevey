import { useState, useEffect } from 'react';
import { Button } from './Button';

export function Sigle({ sendToParent, display, estEnnonce, position, inclinaison }) {
    const [error, setError] = useState(null);
    const [ennonce, setEnnonce] = useState('');
    const [reponse, setReponse] = useState('');

    useEffect(() => {
        setEnnonce(position+' '+inclinaison);
        setReponse('');
    }, [position, inclinaison, estEnnonce]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (estEnnonce === "true") {
        return (
            <section className={`${display} flex-col items-center gap-1 p-4 m-5 border border-gray-200`}>
                <h4 className="font-semibold text-xl">Sigle de la position</h4>
                <div className="flex items-center">
                    <p>{ennonce}</p>
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
                                sendToParent({ representation: "Sigle", choix: e.target.value });
                                }
                            }
                            />
                    </div>
            </section>
        );
    }
};