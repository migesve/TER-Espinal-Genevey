const Yup = require('yup');


const formSchemaInclinaison = Yup.object().shape({
    label: Yup.string().required("label de l'inclinaison requis").min(6, "Le label doit contenir au moins 6 caractères").max(30, "Le label doit contenir au plus 80 caractères"),  
    degres_min: Yup.number().integer().required("le degres minimum d'inclinaison est requis").min(0, "l'inclinaison doit être suppérieur ou égale à 0").max(100, "l'inclinaison doit être inferieur ou égale à 100"),
    inclinaison_id: Yup.number().integer().required("le degres maximum d'inclinaison est requis").min(0, "l'inclinaison doit être suppérieur ou égale à 0").max(100, "l'inclinaison doit être inferieur ou égale à 100"),
});

const validateFormInclinaison = (req, res) => {
    const formeData = req.body;
    formSchemaInclinaison
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

module.exports = validateFormInclinaison;