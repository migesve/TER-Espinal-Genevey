const express = require('express');
const router = express.Router();
const Yup = require('yup');
const pool = require('../db');

router
    .route("/getAll")
    .get(async (req, res) => {

        const listeSchema3 = await pool.query(
            'SELECT * FROM schema3',
            []
        );
        console.log(listeSchema3.rows);

        if (listeSchema3.rowCount > 0) {
            res.json({ Succes: true, schemas3: listeSchema3.rows });
        } else {
            res.json({ Succes: false, status: "La liste des schema3 n'a pas pu être récupérée !" });
        }
    });

router
    .route("/getByIds")
    .get(async (req, res) => {

        const listeSchema3 = await pool.query(
            'SELECT * FROM schema3 WHERE position_id = $1 AND inclinaison_id = $2',
            [req.body.position_id, req.body.inclinaison_id]
        );
        console.log(listeSchema3.rows);

        if (listeSchema3.rowCount > 0) {
            res.json({ Succes: true, Schemas3: listeSchema3.rows });
        } else {
            res.json({ Succes: false, status: "La liste des schema3 n'a pas pu être récupérée !" });
        }
    });


router.post('/upload', async (req, res) => {
    try {
        await validateFormSchema(req, res);

        const existingSchema3 = await pool.query(
            'SELECT schema3_id FROM schema3 WHERE image_name = $1 OR image_path = $2',
            [req.body.image_name, 'src/images/schema3/' + req.body.image_name]
        );

        if (existingSchema3.rowCount == 0) {
            const newSchema3Query = await pool.query(
                'Insert INTO schema3 (image_name, image_path, position_id, inclinaison_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [req.body.image_name, 'src/images/schema3/' + req.body.image_name, position_id, inclinaison_id]
            );
            res.json({ Succes: true, schema3_id: newSchema3Query.rows[0].schema3_id, image_name: newSchema3Query.rows[0].image_name, image_path: newSchema3Query.rows[0].position_id, inclinaison_id: newSchema3Query.rows[0].inclinaison_id });
        }
        else {
            res.json({ Succes: false, status: "Le schema existe déjà !" });
        }
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;