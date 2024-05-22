const Yup = require('yup');


const formSchemaSignUp = Yup.object().shape({
    username: Yup.string().required("Nom d'utilisateur requis").min(4, "Le nom d'utilisateur doit contenir au moins 6 caractères").max(30, "Le nom d'utilisateur doit contenir au plus 30 caractères"),  
    email: Yup.string().email("Email non valide").required("Email requis"),
    password: Yup.string().required("Mot de passe requis").min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    cohorte: Yup.string().required("Cohorte requise").min(1, "La cohorte doit contenir au moins 1 caractères").max(30, "La cohorte doit contenir au plus 30 caractères"),
});

const validateFormSignUp = async (req, res) => {
  const formeData = req.body;

  try {
    await formSchemaSignUp.validate(formeData);
    console.log("Formulaire validé");
  } catch (err) {
    console.log(err.errors);
    return res.status(422).send({ error: err.errors });
  }
};

module.exports = validateFormSignUp;