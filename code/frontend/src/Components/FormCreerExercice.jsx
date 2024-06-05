import { Input } from './Input'
import { SelectDifficulte } from './Select'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import { GrPlay } from 'react-icons/gr'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom'

export const FormCreerExercice = ({tableauPos,tableauIncl}) => {

  const methods = useForm()
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const onSubmit = methods.handleSubmit(data => {
    
    localStorage.setItem(
      "tableauPos",
      JSON.stringify(tableauPos)
    );
    localStorage.setItem(
      "tableauIncl",
      JSON.stringify(tableauIncl)
    );
    console.log(data)
    methods.reset()
    setSuccess(true)
    navigate('/exercice', { state: { ...data } })
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
              Exercice généré
            </p>
          )}
          <Button onClick={onSubmit} text="Lancer Exercice" icon={GrPlay} />
        </div>
      </form>
    </FormProvider>
  );
}
