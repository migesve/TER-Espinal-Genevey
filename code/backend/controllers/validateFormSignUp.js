const Yup = require('yup');


const formSchemaSignUp = Yup.object().shape({
    username: Yup.string().required("Nom d'utilisateur requis").min(6, "Le nom d'utilisateur doit contenir au moins 6 caractères").max(30, "Le nom d'utilisateur doit contenir au plus 30 caractères"),  
    email: Yup.string().email("Email non valide").required("Email requis"),
    password: Yup.string().required("Mot de passe requis").min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    cohorte: Yup.string().required("Cohorte requise").min(1, "La cohorte doit contenir au moins 1 caractères").max(30, "La cohorte doit contenir au plus 30 caractères"),
});

const validateFormSignUp = (req, res) => {
    const formeData = req.body;
    formSchemaSignUp
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

module.exports = validateFormSignUp;