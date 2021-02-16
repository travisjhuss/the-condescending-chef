const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// middleware for checking login
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// get all recipes for admin for review
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/admin GET route');

    const getAllReviewRecipesQuery = `
        SELECT * FROM "recipes" 
        WHERE "marked_for_review" = true;
        `;
    pool.query(getAllReviewRecipesQuery).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  });

// put to add feedback
router.put('/feedback/:id', rejectUnauthenticated, (req, res) => {
    console.log('/admin PUT route:', req.body);

    const feedbackSqlText = `
        UPDATE "recipes" 
        SET "chef_grade" = $1, 
        "chef_feedback" = $2,
        "marked_for_review" = false
        WHERE id = $3;   
        `;

    pool.query(feedbackSqlText, [req.body.score, req.body.feedback, req.body.recipeId])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error in admin put', error);
            res.sendStatus(500);
        })
});

module.exports = router;