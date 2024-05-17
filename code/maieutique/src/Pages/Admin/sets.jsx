import { useEffect,useState } from "react";
import { FormSet } from "../../Components/FormSet";
import { DataGrid } from '@mui/x-data-grid';

export function Sets() {

  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

  return (
    <>
      <button className="items-center gap-1 p-4 m-5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800">
        Créer un set
      </button>
      <button className="items-center gap-1 p-4 m-5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800">
        Créer un exercice
      </button>
      <h1>Sets existents</h1>
      <div className="w-96 m-auto my-10 bg-sky-50">
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
}
