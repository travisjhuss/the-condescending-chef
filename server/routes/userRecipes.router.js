const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
// middleware for checking login
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// POST new recipe from user themselves
router.post('/', rejectUnauthenticated, (req, res) => {
  // assign form data to newRecipe
  const newRecipe = req.body.newRecipe;
  const insertRecipeQuery = `
      INSERT INTO "recipes" ("user_id", "name", "description", "photo", "marked_for_review", "tags")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING "id";
      `;

  // FIRST query makes recipe
  pool.query(insertRecipeQuery, [req.user.id, newRecipe.name, newRecipe.description, newRecipe.photo, newRecipe.marked_for_review, newRecipe.tags])
    .then(result => {
      // now add the ingredients
      console.log('New Recipe Id:', result.rows[0].id);
      // assign id to variable
      const createdRecipeId = result.rows[0].id;
      // get ingredients, assign to variable
      const ingredientsToAdd = req.body.newRecipe.ingredients;
      const insertIngredientsQuery = `
            INSERT INTO "ingredients" ("recipe_id", "name", "unit", "amount")
            VALUES ($1, $2, $3, $4);
            `;
      //Iterates through all of the ingredients in the array and adds them to database
      ingredientsToAdd.forEach((ingredient) => {
        // SECOND query adds
        pool.query(insertIngredientsQuery, [createdRecipeId, ingredient.name, ingredient.unit, ingredient.amount]).then(result => {
          //If statement checks to see if we have reached the last ingredient before sending back a 201
          if (ingredient === ingredientsToAdd[ingredientsToAdd - 1]) {
            res.sendStatus(201);
          }
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
        })
      })
    })
    // catch for first query
    .catch((err) => {
      console.log('add recipe failed: ', err);
      res.sendStatus(500);
    });
});

// GET all recipes from logged in user
router.get('/', rejectUnauthenticated, (req, res) => {
  const getUserRecipesQuery = `SELECT * FROM "recipes" WHERE "user_id" = $1`;
  pool.query(getUserRecipesQuery, [req.user.id]).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});


module.exports = router;