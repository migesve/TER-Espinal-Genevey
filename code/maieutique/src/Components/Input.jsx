import cn from 'classnames'
import { useFormContext } from "react-hook-form";
import { findInputError } from '../utils/findInputError'
import { isFormInvalid } from '../utils/isFormValid'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'

export const Input = ({ name, label, type, id, placeholder, validation, multiline, className }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, name)
  const isInvalid = isFormInvalid(inputError)

  const input_tailwind =
    'p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60'

    return (
      <div className={cn('flex flex-col w-full gap-2',className)}>
        <div className="flex justify-between">
          <label htmlFor={id} className="font-semibold capitalize">
            {label}
          </label>
          <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputError.error.message}
              key={inputError.error.message}
            />
          )}
        </AnimatePresence>
        </div>
        {multiline ? (
          <textarea
            id={id}
            type={type}
            className={cn(input_tailwind, 'min-h-[10rem] max-h-[20rem] resize-y')}
            placeholder={placeholder}
            {...register(name, validation)}
          ></textarea>
        ) : (
          <input
            id={id}
            type={type}
            className={cn(input_tailwind)}
            placeholder={placeholder}
            {...register(name, validation)} // checks if the input 'name' is valid from dependencies useFormContext
          />
        )}
      </div>
    )
  }

  const InputError = ({ message }) => {
    return (
      <motion.p
        className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
        {...framer_error}
      >
        <MdError />
        {message}
      </motion.p>
    )
  }
  
  const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
  }