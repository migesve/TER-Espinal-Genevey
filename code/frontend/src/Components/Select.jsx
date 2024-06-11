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
    console.log(selectedOption);
    setDifficulte(selectedOption.value);
  }
  
    return (
      <Select
        options={options}
        placeholder="Difficulté"
        styles = {customStyles}
        onChange={handleChange}
      />
    );
}
