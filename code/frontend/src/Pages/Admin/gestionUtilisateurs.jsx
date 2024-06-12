import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "../../Components/Button";
import { useNavigate } from 'react-router-dom';

export function Gestion() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/auth/getNoms', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
         }).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data => console.log(data))
          .catch(error => console.error('Error fetching data:', error));

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || 'An error occurred');
          setLoading(false);
          return;
        }

        const result = await response.json();
        console.log(result);

        if (result && Array.isArray(result)) {
          setData(result);
        } else {
          setError('Unexpected response format');
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

  const renderDataGrid = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    const columns = [
      { field: "username", headerName: "Noms d'utilisateurs", width: 30 },
    ];

    const rows = data.map((item) => ({ username: item.username, ...item }));
    return (
      <div className="w-fit m-auto my-10 bg-sky-50">
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          getRowId={(row) => row.id} // Ensure unique ID for each row
        />
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-center space-x-4">
        <Button onClick={ () => navigate('/saisieSet') } text="Créer un set" />
        <Button onClick={ () => navigate('/creerExercice') } text="Créer un exercice" />
      </div>
      <h1>Sets existents</h1>
      {renderDataGrid()}
    </>
  );
}
