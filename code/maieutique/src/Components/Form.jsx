import { Input } from './Input'
import { FormProvider, useForm } from 'react-hook-form'
import { GrMail } from 'react-icons/gr'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { useState } from 'react'

export const Form = () => {

  const methods = useForm()

  const onSubmit = methods.handleSubmit(data => {
    console.log(data)
  })

    return (
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          className="container"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="nomComplet"
              type="text"
              id="nomComplet"
              placeholder="Nom complet..."
            />
            <Input
              label="abbreviation"
              type="abbreviation"
              id="abbreviation"
              placeholder="Abbreviation..."
            />
          </div>
          <div className="mt-5">
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