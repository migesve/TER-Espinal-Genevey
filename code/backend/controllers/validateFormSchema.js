const Yup = require('yup');


const formSchemaSchema = Yup.object().shape({
    image_name: Yup.string().required("Nom de l'image requis").min(6, "Le nom de l'image doit contenir au moins 6 caractères").max(80, "Le nom de l'image doit contenir au plus 80 caractères"),  
    position_id: Yup.number().integer().required("position_id requis").min(0, "position_id doit être suppérieur ou égale à 0"),
    inclinaison_id: Yup.number().integer().required("inclinaison_id requis").min(0, "inclinaison_id doit être suppérieur ou égale à 0"),
});

const validateFormSchema = (req, res) => {
    const formeData = req.body;
    formSchemaSchema
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

module.exports = validateFormSchema;