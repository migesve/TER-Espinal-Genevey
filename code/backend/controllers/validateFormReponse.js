const Yup = require('yup');

const formSchemaReponse = Yup.object().shape({
    user_id: Yup.number().integer().required("user_id requis").min(0, "user_id doit être suppérieur ou égale à 0"),
    position_id: Yup.number().integer().required("position_id requis").min(0, "position_id doit être suppérieur ou égale à 0"),
    inclinaison_id: Yup.number().integer().required("inclinaison_id requis").min(0, "inclinaison_id doit être suppérieur ou égale à 0"),
    ennonce: Yup.string().required("Ennoncé requis").min(6, "L'ennoncé doit contenir au moins 6 caractères").max(60, "L'ennoncé doit contenir au plus 60 caractères"),  
    nom: Yup.string().required("Nom répondu requis").min(6, "Le nom répondu doit contenir au moins 6 caractères").max(60, "Le nom de la position doit contenir au plus 60 caractères"),  
    abreviation: Yup.string().required("Abréviation répondue requise").min(1, "L'abréviation répondue doit contenir au moins 1 caractères").max(10, "L'abréviation répondue doit contenir au plus 10 caractères"),
    schema1_angle: Yup.number().integer().required("angle du schema1 répondu requis").min(0, "l'angle du schema1 répondu doit être suppérieur ou égale à 0").max(360, "L'angle répondu du schema1 doit être inférieur ou égale à 360"),
    schema1_inclinaison: Yup.number().integer().required("inclinaison du schema1 répondu requis").min(0, "l'inclinaison du schema1 répondue doit être suppérieur ou égale à 0").max(100, "L'inclinaison du schema1 rémpondue doit être inférieur ou égale à 100"),
    schema2_angle: Yup.number().integer().required("angle du schema2 répondu requis").min(0, "l'angle du schema2 répondu doit être suppérieur ou égale à 0").max(360, "L'angle répondu du schema2 doit être inférieur ou égale à 360"),
    schema2_inclinaison: Yup.number().integer().required("inclinaison du schema2 répondu requis").min(0, "l'inclinaison du schema2 répondue doit être suppérieur ou égale à 0").max(100, "L'inclinaison du schema2 rémpondue doit être inférieur ou égale à 100"),
    schema3_id: Yup.number().integer().required("schema3_id requis").min(0, "schema3_id doit être suppérieur ou égale à 0"),
    schema4_id: Yup.number().integer().required("schema4_id requis").min(0, "schema4_id doit être suppérieur ou égale à 0"),
    corr_nom: Yup.boolean(),  
    corr_abreviation: Yup.boolean(),
    corr_schema1_angle: Yup.boolean(),
    corr_schema1_inclinaison: Yup.boolean(),
    corr_schema2_angle: Yup.boolean(),
    corr_schema2_inclinaison: Yup.boolean(),
    corr_schema3_id: Yup.boolean(),
    corr_schema4_id: Yup.boolean(),
    remarque_nom: Yup.string().max(250, "La remarque doit contenir au plus 60 caractères"),  
    remarque_abreviation: Yup.string().max(250, "La remarque doit contenir au plus 60 caractères"),
    remarque_schema1_angle: Yup.string().max(250, "La remarque doit contenir au plus 60 caractères"),
    remarque_schema1_inclinaison: Yup.string().max(250, "La remarque doit contenir au plus 60 caractères"),
    remarque_schema2_angle: Yup.string().max(250, "La remarque doit contenir au plus 60 caractères"),
    remarque_schema2_inclinaison: Yup.string().max(250, "La remarque doit contenir au plus 60 caractères"),
    remarque_schema3_id: Yup.string().max(250, "La remarque doit contenir au plus 60 caractères"),
    remarque_schema4_id: Yup.string().max(250, "La remarque doit contenir au plus 60 caractères"),
});

const validateFormReponse = async (req, res, next) => {
    const formeData = req.body;
    
    try{
        await formSchemaReponse.validate(formeData);
        console.log("Formulaire validé");
        next();
    }catch(err) {
            console.log(err.errors);
            res.status(422).send({error: err.errors});
    };
}

module.exports = validateFormReponse;