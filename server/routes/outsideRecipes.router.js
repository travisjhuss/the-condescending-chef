const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
// middleware for checking login
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// POST new recipe from url source
router.post('/', rejectUnauthenticated, (req, res) => {
  // assign recipe to newRecipe variable
  const newRecipe = req.body.newRecipe;
  const insertRecipeQuery = `
      INSERT INTO "recipes" ("user_id", "name", "photo", "marked_for_review", "url", "tags")
      VALUES ($1, $2, $3, $4, $5, $6);
      `;
  pool.query(insertRecipeQuery, [req.user.id, newRecipe.name, newRecipe.photo, newRecipe.marked_for_review, newRecipe.url, newRecipe.tags])
    .then(result => {
        res.sendStatus(201);
    })
    .catch((err) => {
      console.log('add recipe failed: ', err);
      res.sendStatus(500);
    });
});


module.exports = router;