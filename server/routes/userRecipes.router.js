const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
// middleware for checking login
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('/userAddedRecipe POST route');
  console.log('req.body:', req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);

  const newRecipe = req.body.newRecipe;

  const insertRecipeQuery = `
      INSERT INTO "recipes" ("user_id", "name", "description", "photo", "marked_for_review", "tags")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING "id";
      `;

  // FIRST QUERY MAKES RECIPE
  pool.query(insertRecipeQuery, [req.user.id, newRecipe.name, newRecipe.description, newRecipe.photo, newRecipe.marked_for_review, newRecipe.tags])
    .then(result => {
      // ADD TO INGREDIENTS NOW
      console.log('New Recipe Id:', result.rows[0].id); //ID IS HERE!
      // ASSIGN ID TO VARIABLE
      const createdRecipeId = result.rows[0].id;
      // get ingredients
      const ingredientsToAdd = req.body.newRecipe.ingredients;
      console.log('ingredientsToAdd:', ingredientsToAdd);


      const insertIngredientsQuery = `
            INSERT INTO "ingredients" ("recipe_id", "name", "unit", "amount")
            VALUES ($1, $2, $3, $4);
            `;

      //Iterates through all of the ingredients in the array
      ingredientsToAdd.forEach((ingredient) => {
        // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
        pool.query(insertIngredientsQuery, [createdRecipeId, ingredient.name, ingredient.unit, ingredient.amount]).then(result => {
          //If statement checks to see if we have reached the last genre id before sending back a 201
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
    // CATCH FOR FIRST QUERY
    .catch((err) => {
      console.log('add recipe failed: ', err);
      res.sendStatus(500);
    });
});

// This route *should* return the logged in users recipes
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('/userRecipes GET route');
  // HOW YOU KNOW IF SOMEONE IS LOGGED IN 
  console.log('is authenticated?', req.isAuthenticated());
  // USER INFO FROM DB, will show columns if new cols added
  console.log('user', req.user);
  
  const getUserRecipesQuery = `SELECT * FROM "recipes" WHERE "user_id" = $1`;
  pool.query(getUserRecipesQuery, [req.user.id]).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});


module.exports = router;