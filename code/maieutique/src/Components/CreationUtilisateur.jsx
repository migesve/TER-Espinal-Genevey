import { Input } from './Input';
import { FormProvider, useForm } from 'react-hook-form';
import { GrLogin } from 'react-icons/gr';
import {
  nomComplet_validation,
  email_validation,
  password_validation,
  num_validation,
  cohorte_validation,
  username_validation,
} from '../utils/inputValidations';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { Button } from './Button';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from './AccountContext';

export const CreationUtilisateur = () => {
  const [error, setError] = useState(null);
  const { setUser } = useContext(AccountContext);
  const navigate = useNavigate();

  const methods = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        credentials: "include", // to allow cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || errorData.status || 'An error occurred');
        return;
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      setUser({ ...responseData });
      
      if (responseData.LoggedIn) {
        setSuccess(true);
        //navigate('/');
      } else {
        setError(responseData.status);
      }
    } catch (error) {
      console.error("Error:", error);
      setError('An unexpected error occurred');
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => e.preventDefault()}
        noValidate
        autoComplete="off"
        className="container w-96 m-auto my-10"
      >
        {error && <p className='text-red-500'>{error}</p>}
        <div className="grid gap-5">
          <Input {...username_validation} />
          <Input {...email_validation} />
          <Input {...cohorte_validation} />
          <Input {...password_validation} />
        </div>
        <div className="mt-5">
          {success && (
            <p className="font-semibold text-green-500 mb-5 flex items-center gap-1">
              <BsFillCheckSquareFill />
              Creation Réussie
            </p>
          )}
          <button
            onClick={onSubmit}
            className="flex items-center gap-1 p-5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800"
          >
            <GrLogin />
            Enregister
          </button>
          <button onClick={() => navigate('/')} className="flex items-center gap-1 p-5 my-5 font-semibold ">Connection</button>
        </div>
      </form>
    </FormProvider>
  );
};
