import { useEffect,useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

export function FinExercice() {

  const rows = [
    { id: 1, col1: '1', col2: 'String avec reponses', col3: 'x/x'},
    { id: 2, col1: '2', col2: 'String avec reponses', col3: 'x/x' },
    { id: 3, col1: '3', col2: 'String avec reponses', col3: 'x/x' },
  ];

  const columns = [
    { field: 'col1', headerName: 'Question', width: 150 },
    { field: 'col2', headerName: 'Reponses', width: 300 },
    { field: 'col3', headerName: 'Note', width: 150 },
  ];

  return (
    <>
      <h1>Fin de l'exercice</h1>
      <div className="w-[600px] m-auto my-10 bg-sky-50">
        <DataGrid rows={rows} columns={columns} />
      </div>
      <button className="items-center gap-1 p-4 m-5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800">
        Retour au menu principal
      </button>
    </>
  );
}
