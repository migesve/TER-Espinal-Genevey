const express = require('express');
const router = express.Router();
const Yup = require('yup');

const formSchema = Yup.object().shape({
    //username: Yup.string().required("Nom d'utilisateur requis").nim(6, "Le nom d'utilisateur doit contenir au moins 6 caractères").max(30, "Le nom d'utilisateur doit contenir au plus 30 caractères"),  
    email: Yup.string().email("Email non valide").required("Email requis"),
    password: Yup.string().required("Mot de passe requis").nim(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

router.post('/login', (req, res) => {
    
});

module.exports = router;