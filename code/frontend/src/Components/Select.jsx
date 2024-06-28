import Select from 'react-select'

export const SelectDifficulte = ({ setDifficulte }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : '#2563eb',
      backgroundColor: state.isSelected ? '#2563eb' : 'white',
      
    }),
  };
  //const input_tailwind = 'font-medium rounded-md w-full placeholder:opacity-60'
  const options = [
    { value: '1', label: 'Facile' },
    { value: '2', label: 'Difficile' },
  ]

  const handleChange = (selectedOption) => {
    setDifficulte(selectedOption.value);
  }
  
    return (
      <Select
        options={options}
        placeholder="Choisir la difficulté"
        styles = {customStyles}
        onChange={handleChange}
      />
    );
}


export const SelectPosition = ({ setPosition }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : '#2563eb',
      backgroundColor: state.isSelected ? '#2563eb' : 'white',
      
    }),
  };
  //const input_tailwind = 'font-medium rounded-md w-full placeholder:opacity-60'
  const options = [
    { value: 1, label: 'OS' },
    { value: 2, label: 'OIDP' },
    { value: 3, label: 'OIDT' },
    { value: 4, label: 'OIDA' },
    { value: 5, label: 'OP' },
    { value: 6, label: 'OIGA' },
    { value: 7, label: 'OIGT' },
    { value: 8, label: 'OIGP' },
  ]

  const handleChange = (selectedOption) => {
    setPosition(selectedOption.value);
  }
  
    return (
      <Select
        options={options}
        placeholder="Choisir la position"
        styles = {customStyles}
        onChange={handleChange}
      />
    );
}


export const SelectInclinaison = ({ setInclinaison }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : '#2563eb',
      backgroundColor: state.isSelected ? '#2563eb' : 'white',
      width: '10%',
    }),
  };
  //const input_tailwind = 'font-medium rounded-md w-full placeholder:opacity-60'
  const options = [
    { value: 1, label: 'Bien fléchie' },
    { value: 2, label: 'Peu fléchie' },
    { value: 3, label: 'Mal fléchie' },
  ]

  const handleChange = (selectedOption) => {
    setInclinaison(selectedOption.value);
  }
  
    return (
      <Select
        options={options}
        placeholder="Choisir l'inclinaison"
        styles = {customStyles}
        onChange={handleChange}
      />
    );
}


export const SelectTypeSchema = ({ setTypeSchema }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : '#2563eb',
      backgroundColor: state.isSelected ? '#2563eb' : 'white',
      width: '10%',
    }),
  };
  //const input_tailwind = 'font-medium rounded-md w-full placeholder:opacity-60'
  const options = [
    { value: '1', label: 'Schéma en vue antérieure' },
    { value: '2', label: 'Schéma en vue transversale' },
  ]

  const handleChange = (selectedOption) => {
    setTypeSchema(selectedOption.value);
  }
  
    return (
      <Select
        options={options}
        placeholder="Choisir le type de schéma"
        styles = {customStyles}
        onChange={handleChange}
      />
    );
}
