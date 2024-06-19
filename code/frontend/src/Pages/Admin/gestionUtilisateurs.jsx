import React, { useEffect, useState, useContext } from 'react';
import { Button } from "../../Components/Button";
import { useNavigate } from 'react-router-dom';
import { AccountContext } from "../../Components/AccountContext";

export function Gestion() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/auth/getNoms', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || 'An error occurred');
          setLoading(false);
          return;
        }

        const donnees = await response.json();
        console.log('Fetched data:', donnees); // Log the fetched data for debugging

        if (donnees && Array.isArray(donnees.users)) {
          setData(donnees.users);
        } else {
          setError('Invalid data structure');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onsubmit = async (username, statut) => {
    try {
      const response = await fetch('http://localhost:4000/auth/changerStatut', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, statut }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred');
        return;
      }
  
      const result = await response.json();
      const updatedData = data.map((row) => 
        row.username === username ? { ...row, statut } : row
      );
      setData(updatedData);
  
      const element = document.querySelector(`div #${username+"P"}`);
      const btn1 = document.querySelector(`#${username+"BtnE"}`);
      const btn2 = document.querySelector(`#${username+"BtnA"}`);
      element.innerHTML = `<strong>${result.user.statut}</strong>`;
      
      if (statut === "Professeur") {
        btn1 && btn1.remove();
      }
      if (statut === "Admin") {
        btn1 && btn1.remove();
        btn2 && btn2.remove();
      }
  
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred');
    }
  };
    

  const renderDataGrid = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    return (
      <div className="w-full mx-auto my-10 p-4 border rounded-lg bg-gray-50">
        {data.map((row) => (
          <div key={row.username} id={row.username} className='flex items-center mb-4 p-2 bg-white shadow-md rounded-lg justify-between'>
            <div>
              <p className="w-fit self-center text-lg text-black">{row.username}</p>
              <p id={row.username+"P"} className="w-fit self-center text-black">{row.statut}</p>
            </div>
            <div className='flex space-x-3'>
              {(['Admin', 'Professeur'].includes(user.statut) && row.statut === "étudiant") && (
                <Button id={row.username+"BtnE"} onClick={() => onsubmit(row.username, "Professeur")} text="Passer Enseignant" />
              )}
              {(user.statut === "Admin" && ["étudiant","Professeur"].includes(row.statut) && row.statut !== "Admin") && (
                <Button id={row.username+"BtnA"} onClick={() => onsubmit(row.username, "Admin")} text="Passer Administrateur" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <h1>Liste des utilisateurs</h1>
      {renderDataGrid()}
    </>
  );
}
