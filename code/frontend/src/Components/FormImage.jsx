import { Input } from './Input';
import { FormProvider, set, useForm } from 'react-hook-form';
import { GrSave } from 'react-icons/gr';
import {
  angle_validation,
  image_validation,
} from '../utils/inputValidations';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { useState } from 'react';
import { Button } from './Button';
import { SelectPosition, SelectTypeSchema } from './Select';
import { SelectInclinaison } from './Select';
import { fetchDataSchema3ByAngle, fetchDataSchema4ByAngle,  uploadSchema3, uploadSchema4 } from '../utils/fetchData';
import { saveImage } from '../utils/outils.js';

export const FormImage = () => {

  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const [position, setPosition] = useState(0);
  const [inclinaison, setInclinaison] = useState(0);
  const [typeSchema, setTypeSchema] = useState(null);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const onSubmit = methods.handleSubmit(async data => {
    setInfo(null);
    if (!position || !inclinaison || !typeSchema) {
      setError('Veuillez choisir une position, une inclinaison et un type de schéma');
    } else {
      setError(null);
      let dir = "";
      const image_name = `P${position}I${inclinaison}A${data.angle}`;
      let image_path = "";
      let fetchDataSchemaByAngle, uploadSchema;
  
      if (typeSchema === '1') {
        dir="src/images/schema3";
        image_path = `src/images/schema3/${image_name}.png`;
        fetchDataSchemaByAngle = fetchDataSchema3ByAngle;
        uploadSchema = uploadSchema3;
      } else if (typeSchema === '2') {
        dir="src/images/schema4";
        image_path = `src/images/schema4/${image_name}.png`;
        fetchDataSchemaByAngle = fetchDataSchema4ByAngle;
        uploadSchema = uploadSchema4;
      }
  
      try {
        const existingSchema = await fetchDataSchemaByAngle(position, inclinaison, data.angle);
        if (existingSchema.length > 0) {
          setError('Ce schéma existe déjà');
        } else {
          // Save the image
          const ajoutSchema = await uploadSchema(position, inclinaison, data.angle, image_name, image_path);
          if (ajoutSchema.Succes) {
            /*try {
              await saveImage(data.image, typeSchema, position, inclinaison, data.angle);*/              
              setSuccess(true);
              setInfo('Ranger l\'image dans le dossier '+dir+' avec le nom '+image_name+'.png');
              console.log('info',info);
              methods.reset();
            /*} catch (error) {
              setError('Échec de l\'enregistrement de l\'image');
            }*/
          } else {
            setError('Échec de l\'ajout du schéma');
          }
        }
      } catch (error) {
        setError('Erreur lors de la vérification ou de l\'ajout du schéma');
      }
    }
  });

      //<Input { ...image_validation} /> supprimé car du return car innutilisé au final(le téléchargement de l'image ne fonctionne pas)
    return (
      <div>
      {error && (<p className="text-red-500 font-semibold">{error}</p>)}
      {info && (<p className="text-green-500 font-semibold">{info}</p>)}
      <SelectPosition setPosition={setPosition}></SelectPosition>
      <SelectInclinaison setInclinaison={setInclinaison}></SelectInclinaison>
      <SelectTypeSchema setTypeSchema={setTypeSchema}></SelectTypeSchema>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
          className="container w-96 m-auto my-10"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Input { ...angle_validation} />
            
          </div>
          <div className="mt-5">
            {success && (
              <p className="font-semibold text-green-500 mb-5 flex items-center gap-1">
                <BsFillCheckSquareFill />
                Cas Sauvegardé
              </p>
            )}
            <Button onClick={onSubmit} text="Sauvegarder Image" icon={GrSave} />
          </div>
        </form>
      </FormProvider>
      </div>
    );
  }