import { Input } from './Input'
import { FormProvider, useForm } from 'react-hook-form'
import { GrLogin } from 'react-icons/gr'
import {
  email_validation,
  password_validation,
} from '../utils/inputValidations'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { useState } from 'react'

export const Login = () => {

  const methods = useForm()
  const [success, setSuccess] = useState(false)

  const onSubmit = methods.handleSubmit(data => {
    console.log(data)
    methods.reset()
    setSuccess(true)
  })

    return (
      <FormProvider {...methods}>
        
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
          className="container w-96 m-auto my-10"
        >
          <div className="grid gap-5">
            <h3 className="flex">Login</h3>
            <Input { ...email_validation } />
            <Input { ...password_validation} />
          </div>
          <div className="mt-5">
            {success && (
              <p className="font-semibold text-green-500 mb-5 flex items-center gap-1">
                <BsFillCheckSquareFill />
                Conexion Réussie
              </p>
            )}
            <button
              onClick={onSubmit}
              className="flex items-center gap-1 p-5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800"
            >
              <GrLogin />
              Login
            </button>
          </div>
        </form>
      </FormProvider>
    );
  }