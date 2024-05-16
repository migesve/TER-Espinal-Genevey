const Yup = require('yup');

const formSchemaLogin = Yup.object().shape({
    email: Yup.string().email("Email non valide").required("Email requis"),
    password: Yup.string().required("Mot de passe requis").min(6, "Le mot de passe doit contenir au moins 6 caractères").max(30, "Le mot de passe doit contenir au plus 50 caractères"),
});

const validateFormLogin = (req, res) => {
    const formeData = req.body;
    formSchemaLogin
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

module.exports = validateFormLogin;