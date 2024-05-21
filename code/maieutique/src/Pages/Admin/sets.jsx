import { useEffect,useState } from "react";
import { FormSet } from "../../Components/FormSet";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "../../Components/Button";
import { useForm } from "react-hook-form";

export function Sets() {
  
  const methods = useForm()
  const [success, setSuccess] = useState(false)

  const onSubmit = methods.handleSubmit(data => {
    console.log(data)
    methods.reset()
    setSuccess(true)
  })

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
      <div className="flex justify-center space-x-4">
        <Button onClick={onSubmit} text="Créer un set" />
        <Button onClick={onSubmit} text="Créer un exercice" />
      </div>
      <h1>Sets existents</h1>
      <div className="w-96 m-auto my-10 bg-sky-50">
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
}
