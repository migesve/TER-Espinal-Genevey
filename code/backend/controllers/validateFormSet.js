const Yup = require('yup');


const formSchemaSet = Yup.object().shape({
    nom: Yup.string().required("Nom de la position requis").min(6, "Le nom de la position doit contenir au moins 6 caractères").max(60, "Le nom de la position doit contenir au plus 60 caractères"),  
    abreviation: Yup.string().required("Abréviation requise").min(1, "L'abréviation doit contenir au moins 1 caractères").max(10, "L'abréviation doit contenir au plus 10 caractères"),
    descriptif: Yup.string().max(255, "Le descriptif doit contenir au plus 500 caractères"),
    angle1: Yup.number().integer().required("angle1 requis").min(0, "l'angle doit être suppérieur ou égale à 0").max(359, "L'angle doit être inférieur ou égale à 359"),
    angle2: Yup.number().integer().required("angle2 requis").min(0, "l'angle doit être suppérieur ou égale à 0").max(359, "L'angle doit être inférieur ou égale à 359"),
});

const validateFormSet = (req, res) => {
    const formeData = req.body;
    formSchemaSet
        .validate(formeData)
        .catch(err => {
            res.status(422).send();
            console.log(err.errors);
    }).then(valid => {  
        if (valid) {
            console.log("Formulaire validé");
        }
    });
};

module.exports = validateFormSet;