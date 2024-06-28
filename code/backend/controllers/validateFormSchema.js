const Yup = require('yup');


const formSchemaSchema = Yup.object().shape({
    image_name: Yup.string().required("Nom de l'image requis").min(6, "Le nom de l'image doit contenir au moins 6 caractères").max(80, "Le nom de l'image doit contenir au plus 80 caractères"),
    image_path: Yup.string().required("Path de l'image requis").min(6, "Le path de l'image doit contenir au moins 6 caractères").max(80, "Le path de l'image doit contenir au plus 80 caractères"),  
    angle: Yup.number().integer().required("angle requis").min(0, "angle doit être suppérieur ou égale à 0").max(360, "angle doit être inférieur ou égale à 360"),
    position: Yup.number().integer().required("position_id requis").min(1, "position_id doit être suppérieur ou égale à 1").max(8, "position_id doit être inférieur ou égale à 8"),
    inclinaison: Yup.number().integer().required("inclinaison_id requis").min(1, "inclinaison_id doit être suppérieur ou égale à 1").max(3, "inclinaison_id doit être inférieur ou égale à 3"),
});

const validateFormSchema = (req, res) => {
    const formeData = req.body;

    try{
    formSchemaSchema.validate(formeData);
    console.log("Formulaire validé");
    }catch(err){
        console.log(err.errors);
        res.status(422).send();
    };
};

module.exports = validateFormSchema;