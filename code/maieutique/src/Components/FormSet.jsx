import { Input } from './Input'
import { FormProvider, useForm } from 'react-hook-form'
import { GrMail } from 'react-icons/gr'
import {
  nomComplet_validation,
  abbreviation_validation,
  desc_validation,
  angle_1_validation,
  angle_2_validation,
  inclinaison_tete_validation,
  num_validation,
  password_validation,
} from '../utils/inputValidations'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { useState } from 'react'

export const FormSet = () => {

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
          <div className="grid gap-5 md:grid-cols-3">
            <Input { ...nomComplet_validation } className="md:col-span-3" />
            <Input { ...abbreviation_validation} className="md:col-span-3" />
            <Input { ...angle_1_validation} />
            <Input { ...angle_2_validation} />
            <Input { ...inclinaison_tete_validation} />
            <Input { ...desc_validation} className="md:col-span-3" />
          </div>
          <div className="mt-5">
            {success && (
              <p className="font-semibold text-green-500 mb-5 flex items-center gap-1">
                <BsFillCheckSquareFill />
                Cas Sauvegardé
              </p>
            )}
            <button
              onClick={onSubmit}
              className="flex items-center gap-1 p-5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800"
            >
              <GrMail />
              Sauvegarder Cas
            </button>
          </div>
        </form>
      </FormProvider>
    );
  }