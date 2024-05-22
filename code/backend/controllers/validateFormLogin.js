const Yup = require('yup');

const formSchemaLogin = Yup.object().shape({
    email: Yup.string().email("Email non valide").required("Email requis"),
    password: Yup.string().required("Mot de passe requis").min(6, "Le mot de passe doit contenir au moins 6 caractères").max(30, "Le mot de passe doit contenir au plus 50 caractères"),
});

const validateFormLogin = async (req, res) => {
    const formeData = req.body;
    try{
        await formSchemaLogin.validate(formeData)
        console.log("Formulaire validé");
    }catch(err){
        console.log(err.errors);
        return res.status(422).send({error: err.errors});
    };
};

module.exports = validateFormLogin;