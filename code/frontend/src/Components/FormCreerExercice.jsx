import { Input } from './Input'
import { SelectDifficulte } from './Select'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import { GrMail } from 'react-icons/gr'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { Button } from './Button'

export const FormCreerExercice = () => {

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
            <SelectDifficulte className="md:col-span-3" />
          </div>
          <div className="mt-5">
            {success && (
              <p className="font-semibold text-green-500 mb-5 flex items-center gap-1">
                <BsFillCheckSquareFill />
                Exercice Sauvegardé
              </p>
            )}
            <Button onClick={onSubmit} text="Sauvegarder Exercice" icon={GrMail} />
          </div>
        </form>
      </FormProvider>
    );
  }