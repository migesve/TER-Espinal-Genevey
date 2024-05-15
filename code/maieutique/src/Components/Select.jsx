import cn from 'classnames'
import { useFormContext } from "react-hook-form";
import { findInputError } from '../utils/findInputError'
import { isFormInvalid } from '../utils/isFormValid'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
import Select from 'react-select'

export const SelectDifficulte = () => {
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
    console.log(selectedOption)
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
